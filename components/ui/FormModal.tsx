'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  type ButtonProps,
} from '@chakra-ui/react';
import { cloneElement, useRef, useState, type FormEvent, type ReactElement } from 'react';

export type FieldType = 'text' | 'email' | 'password' | 'date' | 'number' | 'currency' | 'textarea' | 'select' | 'switch';
type Option = string | { label: string; value: string };

export interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  helper?: string;
  options?: readonly Option[];
  required?: boolean;
  defaultValue?: string | boolean;
  /** Span both columns on wider screens. */
  fullWidth?: boolean;
  currencySymbol?: string;
}

export type FormValues = Record<string, string | boolean>;

interface FormModalProps {
  title: string;
  description?: string;
  fields: readonly FieldConfig[];
  submitLabel: string;
  successTitle: string;
  successDescription?: string | ((values: FormValues) => string);
  onSubmit?: (values: FormValues) => void;
  /** Custom trigger element; receives an onClick that opens the modal. */
  trigger?: ReactElement<{ onClick?: () => void }>;
  triggerLabel?: string;
  triggerIcon?: ReactElement;
  triggerVariant?: ButtonProps['variant'];
  /** Controlled mode — used when the modal is opened from elsewhere. */
  isOpen?: boolean;
  onClose?: () => void;
  size?: 'md' | 'lg';
}

const optionValue = (option: Option) => (typeof option === 'string' ? option : option.value);
const optionLabel = (option: Option) => (typeof option === 'string' ? option : option.label);

function initialValues(fields: readonly FieldConfig[]): FormValues {
  return Object.fromEntries(
    fields.map((field) => {
      if (field.defaultValue !== undefined) return [field.name, field.defaultValue];
      if (field.type === 'switch') return [field.name, false];
      if (field.type === 'select' && field.options?.length) return [field.name, optionValue(field.options[0])];
      return [field.name, ''];
    }),
  );
}

function validate(fields: readonly FieldConfig[], values: FormValues) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const value = values[field.name];
    if (field.required && (value === '' || value === undefined)) {
      errors[field.name] = `Enter ${field.label.toLowerCase()}`;
    } else if ((field.type === 'currency' || field.type === 'number') && value !== '' && !(Number(value) > 0)) {
      errors[field.name] = 'Enter an amount greater than zero';
    }
  }
  return errors;
}

/**
 * Data-driven form in a modal. Every "Add …" flow in the app is a FormModal
 * with a different field list, so validation, layout and feedback stay identical.
 */
export function FormModal({
  title,
  description,
  fields,
  submitLabel,
  successTitle,
  successDescription,
  onSubmit,
  trigger,
  triggerLabel,
  triggerIcon,
  triggerVariant = 'primary',
  isOpen: controlledOpen,
  onClose: controlledClose,
  size = 'md',
}: FormModalProps) {
  const disclosure = useDisclosure();
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : disclosure.isOpen;
  const toast = useToast();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormValues>(() => initialValues(fields));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const close = () => {
    setValues(initialValues(fields));
    setErrors({});
    if (isControlled) controlledClose?.();
    else disclosure.onClose();
  };

  const setValue = (name: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(fields, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit?.(values);
    toast({
      status: 'success',
      title: successTitle,
      description: typeof successDescription === 'function' ? successDescription(values) : successDescription,
    });
    close();
  };

  const renderControl = (field: FieldConfig, index: number) => {
    const value = values[field.name];
    const common = {
      id: `field-${field.name}`,
      name: field.name,
      placeholder: field.placeholder,
      ref: index === 0 ? firstFieldRef : undefined,
    };
    switch (field.type) {
      case 'textarea':
        return <Textarea {...common} ref={undefined} rows={3} value={String(value)} onChange={(e) => setValue(field.name, e.target.value)} />;
      case 'select':
        return (
          <Select {...common} ref={undefined} value={String(value)} onChange={(e) => setValue(field.name, e.target.value)}>
            {field.options?.map((option) => (
              <option key={optionValue(option)} value={optionValue(option)}>
                {optionLabel(option)}
              </option>
            ))}
          </Select>
        );
      case 'switch':
        return <Switch id={common.id} isChecked={Boolean(value)} onChange={(e) => setValue(field.name, e.target.checked)} />;
      case 'currency':
        return (
          <InputGroup>
            <InputLeftAddon>{field.currencySymbol ?? '£'}</InputLeftAddon>
            <Input {...common} type="number" inputMode="decimal" step="0.01" min="0" value={String(value)} onChange={(e) => setValue(field.name, e.target.value)} />
          </InputGroup>
        );
      default:
        return (
          <Input
            {...common}
            type={field.type ?? 'text'}
            inputMode={field.type === 'number' ? 'decimal' : undefined}
            value={String(value)}
            onChange={(e) => setValue(field.name, e.target.value)}
          />
        );
    }
  };

  const triggerNode = isControlled
    ? null
    : trigger
      ? cloneElement(trigger, { onClick: disclosure.onOpen })
      : (
          <Button leftIcon={triggerIcon} variant={triggerVariant} onClick={disclosure.onOpen}>
            {triggerLabel ?? title}
          </Button>
        );

  return (
    <>
      {triggerNode}
      <Modal isOpen={isOpen} onClose={close} size={size} initialFocusRef={firstFieldRef} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit} noValidate>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {description && (
              <Text color="text.secondary" mb={5} mt={-1}>
                {description}
              </Text>
            )}
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={4} spacingY={4}>
              {fields.map((field, index) => (
                <FormControl
                  key={field.name}
                  isRequired={field.required}
                  isInvalid={Boolean(errors[field.name])}
                  gridColumn={field.fullWidth || field.type === 'textarea' ? '1 / -1' : undefined}
                  display={field.type === 'switch' ? 'flex' : undefined}
                  alignItems={field.type === 'switch' ? 'center' : undefined}
                  justifyContent={field.type === 'switch' ? 'space-between' : undefined}
                >
                  <FormLabel htmlFor={`field-${field.name}`} mb={field.type === 'switch' ? 0 : undefined}>
                    {field.label}
                  </FormLabel>
                  {renderControl(field, index)}
                  {errors[field.name] ? (
                    <FormErrorMessage>{errors[field.name]}</FormErrorMessage>
                  ) : (
                    field.helper && <FormHelperText>{field.helper}</FormHelperText>
                  )}
                </FormControl>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
