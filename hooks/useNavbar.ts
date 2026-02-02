'use client';

import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/types/nav';

export const useActiveNav = (navItems: NavItem[]) => {
  const pathname = usePathname();

  return navItems.map((item) => ({
    ...item,
    isActive: pathname === item.href,
  }));
};
