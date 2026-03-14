// app/components/Nav.tsx
'use client';

import Link from 'next/link';
import { navItems } from '@/lib/types/nav';
import { useAuth } from '@/hooks/useAuth';
import { useActiveNav } from '@/hooks/useNavbar';

export default function Nav(device?: { mobile?: boolean }) {
    const { userProfile } = useAuth();
    const userRole = userProfile?.role || 'user';

    const filteredNavItems = navItems.filter(item => 
        !item.roles || item.roles.includes(userRole)
    );
    const activeNavItems = useActiveNav(filteredNavItems);

    if (device?.mobile) {
        return (
        <div className='flex justify-around items-center h-16'>
            {activeNavItems.map(({ href, label, icon: Icon, isActive}) => (
                <Link
                    key={href}
                    href={href}
                    className={`transition-colors flex flex-row gap-2 font-medium items-center
                       ${isActive
                            ? "text-btn-active"
                            : "text-text-grey hover:text-btn-hover"
                        }`}
                >
                    <Icon className="w-6 h-6" />
                </Link>
            ))}
        </div>
    );
    }
    return (
        <div className='flex flex-row items-center justify-center gap-6'>
            {activeNavItems.map(({ href, label, icon: Icon, isActive}) => (
                <Link
                    key={href}
                    href={href}
                    className={`transition-colors flex flex-row gap-2 font-medium items-center text-xs
                       ${isActive
                            ? "text-btn-active"
                            : "text-text-grey hover:text-btn-hover"
                        }`}
                >
                    <Icon className="icon" />
                    {label}
                </Link>
            ))}
        </div>
    );
}
