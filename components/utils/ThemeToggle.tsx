'use client';

import { motion } from 'framer-motion';
import { useTheme } from "@/components/utils/ThemeProvider";
import {Moon, Sun} from "lucide-react";

export const ThemeToggle = () => {

    const { isDarkMode, toggleTheme } = useTheme();

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