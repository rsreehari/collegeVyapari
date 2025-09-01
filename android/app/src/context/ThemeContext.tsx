import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    theme: Theme;
}

interface Theme {
    backgroundColor: string;
    textColor: string;
    cardBackground: string;
    primaryColor: string;
    secondaryColor: string;
}

const lightTheme: Theme = {
    backgroundColor: '#f8f9fa',
    textColor: '#1a1a1a',
    cardBackground: '#ffffff',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
};

const darkTheme: Theme = {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    cardBackground: '#2d2d2d',
    primaryColor: '#60a5fa',
    secondaryColor: '#34d399',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
