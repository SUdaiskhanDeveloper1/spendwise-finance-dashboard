'use client';

import { Input, InputGroup, InputLeftElement, InputRightElement, Kbd } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SEARCH_EVENT } from '@/lib/transactions';

/** Global search: Enter opens Transactions filtered by the query. Ctrl/⌘ + K focuses it. */
export function HeaderSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/transactions?q=${encodeURIComponent(q)}` : '/transactions');
    window.dispatchEvent(new CustomEvent(SEARCH_EVENT, { detail: q }));
    inputRef.current?.blur();
  };

  return (
    <form role="search" onSubmit={onSubmit} style={{ width: '100%' }}>
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none" color="text.muted">
          <Search size={16} aria-hidden />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transactions, merchants…"
          aria-label="Search transactions"
          bg="bg.surface"
          boxShadow="none"
          pr={14}
        />
        <InputRightElement pointerEvents="none" w={14} display={{ base: 'none', lg: 'flex' }}>
          <Kbd>Ctrl K</Kbd>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}
