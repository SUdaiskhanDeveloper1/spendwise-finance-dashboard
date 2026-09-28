'use client';

import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const label = colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <Tooltip label={label} openDelay={400}>
      <IconButton variant="ghost" aria-label={label} onClick={toggleColorMode} icon={colorMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />} />
    </Tooltip>
  );
}
