import {House, Pencil, ScrollText, User, ChartLine, Users} from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: any;
  roles?: string[];
};

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: House, roles: ["user", "evaluator", "admin"] },
  { href: '/translate', label: 'Translate', icon: Pencil, roles: ["user"] },
  { href: '/review', label: 'Review', icon: Pencil, roles: ["evaluator"] },
  { href: '/mytranslations', label: 'My Translations', icon: ScrollText, roles: ["user"] },
  { href: '/myreviews', label: 'My Reviews', icon: ScrollText, roles: ["evaluator"] },
  { href: '/overview', label: 'Overview', icon: ChartLine, roles: ["admin"] },
  { href: '/users', label: 'Users', icon: Users, roles: ["admin"] },
  { href: '/sentences', label: 'Sentences', icon: ScrollText, roles: ["admin"] },
  { href: '/profile', label: 'Profile', icon: User, roles: ["user", "evaluator", "admin"] },
];
