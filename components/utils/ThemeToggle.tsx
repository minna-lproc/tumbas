'use client';

import { motion } from 'framer-motion';
import { useThemeToggle } from "@/hooks/useThemeToggle";
import {Moon, Sun} from "lucide-react";
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
                    <div className="flex items-center gap-2 ">
                    <Sun className="icon text-gray"/>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 ">
                    <Moon className="icon text-gray"/>
                    </div>
                )
            
            }
            </motion.button>
    )
}