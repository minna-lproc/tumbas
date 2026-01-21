'use client';

import { motion } from 'framer-motion';
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { div } from 'framer-motion/client';

export const ThemeToggle = () => {

    const { isDarkMode, toggleTheme } = useThemeToggle();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}>

            {
                isDarkMode ? (
                    <div className="flex items-center gap-2 text-white">
                    <svg className="h-6 w-6 text-gray" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.354a1 1 0 0 1 1 1V7a1 1 0 0 1-2 0V5.354a1 1 0 0 1 1-1zm0 11.292a4.938 4.938 0 0 0 0-9.876 4.938 4.938 0 0 0 0 9.876zm6.364-7.778a1 1 0 0 1 1.414 1.414l-1.414-1.414zm-12.728 0L4.222 9.282a1 1 0 0 1 1.414-1.414zm12.728 12.728a1 1 0 0 1-1.414-1.414l1.414 1.414zm-12.728 0L4.222 20.01a1 1 0 0 1 1.414 1.414zM19 11a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1zm-14 0a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h1zm11.95 6.364a1 1 0 0 1-1.414 1.414l1.414-1.414zm-9.9 0L7.536 18.778a1 1 0 0 1-1.414-1.414l1.414 1.414z" /> 
                    </svg>
                    Light Mode
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-white">
                    <svg className="h-6 w-6 text-gray" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.752 15.002A9.718 9.718 0 0 1 12.75 22C7.373 22 3 17.627 3 12.25c0-4.243 2.635-7.874 6.354-9.213a.75.75 0 0 1 .993.832 8.218 8.218 0 0 0-.406 2.993c0 4.556 3.694 8.25 8.25 8.25 1.03 0 2.02-.19 2.938-.537a.75.75 0 0 1 .617 1.36z" />
                    </svg>
                    Dark Mode
                    </div>
                )
            
            }
            </motion.button>
    )
}