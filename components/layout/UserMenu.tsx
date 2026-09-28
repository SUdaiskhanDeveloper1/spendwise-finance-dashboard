'use client';

import { Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, chakra } from '@chakra-ui/react';
import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import NextLink from 'next/link';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface UserMenuProps {
  name: string;
  email: string;
  avatar: string;
}

export function UserMenu({ name, email, avatar }: UserMenuProps) {
  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        as={chakra.button}
        aria-label="Account menu"
        borderRadius="full"
        _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
        ml={1}
      >
        <UserAvatar src={avatar} name={name} size={34} />
      </MenuButton>
      <MenuList>
        <Box px={2.5} py={2}>
          <Text fontSize="sm" fontWeight={600}>
            {name}
          </Text>
          <Text fontSize="xs" color="text.muted" noOfLines={1}>
            {email}
          </Text>
        </Box>
        <MenuDivider />
        <MenuItem as={NextLink} href="/profile" icon={<User size={16} />}>
          Profile
        </MenuItem>
        <MenuItem as={NextLink} href="/settings" icon={<Settings size={16} />}>
          Settings
        </MenuItem>
        <MenuItem as={NextLink} href="/pricing" icon={<CreditCard size={16} />}>
          Plan and billing
        </MenuItem>
        <MenuDivider />
        <MenuItem as={NextLink} href="/" icon={<LogOut size={16} />}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
