import { createTheme } from '@mantine/core';

// Paleta de colores Urbany
const urbanyColors = {
    primary: [
        '#f0fdf4', // 0
        '#dcfce7', // 1
        '#bbf7d0', // 2
        '#86efac', // 3
        '#4ade80', // 4
        '#38E47A', // 5 - Color principal
        '#2ECC71', // 6 - Hover
        '#059669', // 7 - Dark
        '#047857', // 8 - Darker
        '#064e3b', // 9 - Darkest
    ],
    gray: [
        '#f9fafb', // 0
        '#f3f4f6', // 1
        '#e5e7eb', // 2
        '#d1d5db', // 3
        '#9ca3af', // 4
        '#6b7280', // 5
        '#4b5563', // 6
        '#374151', // 7
        '#1f2937', // 8
        '#111827', // 9
    ],
    success: [
        '#f0fdf4',
        '#dcfce7',
        '#bbf7d0',
        '#86efac',
        '#4ade80',
        '#10B981',
        '#059669',
        '#047857',
        '#064e3b',
        '#022c22',
    ],
    warning: [
        '#fffbeb',
        '#fef3c7',
        '#fde68a',
        '#fcd34d',
        '#fbbf24',
        '#F59E0B',
        '#d97706',
        '#b45309',
        '#92400e',
        '#78350f',
    ],
    danger: [
        '#fef2f2',
        '#fee2e2',
        '#fecaca',
        '#fca5a5',
        '#f87171',
        '#EF4444',
        '#dc2626',
        '#b91c1c',
        '#991b1b',
        '#7f1d1d',
    ],
};

// Tema personalizado Urbany
export const urbanyMantineTheme = createTheme({
    colors: urbanyColors,

    // Configuración de fuentes
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMonospace: 'Fira Code, Monaco, "Cascadia Code", monospace',

    // Configuración de colores
    primaryColor: 'primary',
    primaryShade: 5,

    // Configuración de componentes
    components: {
        Button: {
            defaultProps: {
                radius: 'md',
                size: 'md',
            },
            styles: {
                root: {
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                },
            },
        },
        Input: {
            defaultProps: {
                radius: 'md',
                size: 'md',
            },
            styles: {
                input: {
                    borderColor: '#E5E7EB',
                    '&:focus': {
                        borderColor: '#38E47A',
                        boxShadow: '0 0 0 3px rgba(56, 228, 122, 0.1)',
                    },
                },
            },
        },
        Card: {
            defaultProps: {
                radius: 'md',
                shadow: 'sm',
            },
            styles: {
                root: {
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    },
                },
            },
        },
        Modal: {
            defaultProps: {
                radius: 'md',
                size: 'md',
            },
            styles: {
                content: {
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
            },
        },
        Notification: {
            defaultProps: {
                radius: 'md',
            },
            styles: {
                root: {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
            },
        },
        Table: {
            defaultProps: {
                radius: 'md',
            },
            styles: {
                root: {
                    'thead tr th': {
                        backgroundColor: '#F9FAFB',
                        fontWeight: 600,
                        color: '#1F2937',
                    },
                    'tbody tr:hover': {
                        backgroundColor: '#F9FAFB',
                    },
                },
            },
        },
        Badge: {
            defaultProps: {
                radius: 'md',
            },
        },
        Alert: {
            defaultProps: {
                radius: 'md',
            },
        },
        Progress: {
            defaultProps: {
                radius: 'md',
            },
        },
        Switch: {
            defaultProps: {
                radius: 'md',
            },
        },
        Checkbox: {
            defaultProps: {
                radius: 'sm',
            },
        },
        Radio: {
            defaultProps: {
                radius: 'sm',
            },
        },
        Select: {
            defaultProps: {
                radius: 'md',
            },
        },
        Textarea: {
            defaultProps: {
                radius: 'md',
            },
        },
        NumberInput: {
            defaultProps: {
                radius: 'md',
            },
        },
        DatePicker: {
            defaultProps: {
                radius: 'md',
            },
        },
        TimeInput: {
            defaultProps: {
                radius: 'md',
            },
        },
        Slider: {
            defaultProps: {
                radius: 'md',
            },
        },
        Rating: {
            defaultProps: {
                size: 'md',
            },
        },
        Tabs: {
            defaultProps: {
                radius: 'md',
            },
        },
        Accordion: {
            defaultProps: {
                radius: 'md',
            },
        },
        Menu: {
            defaultProps: {
                radius: 'md',
            },
        },
        Dropdown: {
            defaultProps: {
                radius: 'md',
            },
        },
        Popover: {
            defaultProps: {
                radius: 'md',
            },
        },
        Tooltip: {
            defaultProps: {
                radius: 'md',
            },
        },
        Drawer: {
            defaultProps: {
                radius: 'md',
            },
        },
        Stepper: {
            defaultProps: {
                radius: 'md',
            },
        },
        Timeline: {
            defaultProps: {
                radius: 'md',
            },
        },
        Breadcrumbs: {
            defaultProps: {
                radius: 'md',
            },
        },
        Pagination: {
            defaultProps: {
                radius: 'md',
            },
        },
        Avatar: {
            defaultProps: {
                radius: 'md',
            },
        },
        Group: {
            defaultProps: {
                gap: 'md',
            },
        },
        Stack: {
            defaultProps: {
                gap: 'md',
            },
        },
        Grid: {
            defaultProps: {
                gutter: 'md',
            },
        },
        Container: {
            defaultProps: {
                size: 'xl',
            },
        },
        Paper: {
            defaultProps: {
                radius: 'md',
                shadow: 'sm',
            },
        },
        Text: {
            defaultProps: {
                size: 'md',
            },
        },
        Title: {
            defaultProps: {
                size: 'h3',
            },
        },
        Anchor: {
            defaultProps: {
                size: 'md',
            },
        },
        List: {
            defaultProps: {
                size: 'md',
            },
        },
        ThemeIcon: {
            defaultProps: {
                radius: 'md',
            },
        },
        ActionIcon: {
            defaultProps: {
                radius: 'md',
            },
        },
        CloseButton: {
            defaultProps: {
                radius: 'md',
            },
        },
        CopyButton: {
            defaultProps: {
                radius: 'md',
            },
        },
        FileButton: {
            defaultProps: {
                radius: 'md',
            },
        },
        ColorInput: {
            defaultProps: {
                radius: 'md',
            },
        },
        ColorPicker: {
            defaultProps: {
                radius: 'md',
            },
        },
        ColorSwatch: {
            defaultProps: {
                radius: 'md',
            },
        },
        Highlight: {
            defaultProps: {
                size: 'md',
            },
        },
        Mark: {
            defaultProps: {
                size: 'md',
            },
        },
        Spoiler: {
            defaultProps: {
                radius: 'md',
            },
        },
        Code: {
            defaultProps: {
                radius: 'md',
            },
        },
        Kbd: {
            defaultProps: {
                radius: 'md',
            },
        },
        Blockquote: {
            defaultProps: {
                radius: 'md',
            },
        },
        Divider: {
            defaultProps: {
                size: 'md',
            },
        },
        Space: {
            defaultProps: {
                h: 'md',
                w: 'md',
            },
        },
        ScrollArea: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaAutosize: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbar: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaThumb: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaCorner: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaViewport: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaRoot: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarX: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarY: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarHover: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarThumb: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarThumbHover: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarThumbActive: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarThumbActiveHover: {
            defaultProps: {
                radius: 'md',
            },
        },
        ScrollAreaScrollbarThumbActiveHoverHover: {
            defaultProps: {
                radius: 'md',
            },
        },
    },

    // Configuración global
    defaultRadius: 'md',
    cursorType: 'pointer',
    focusRing: 'auto',

    // Configuración de breakpoints
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },

    // Configuración de espaciado
    spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },

    // Configuración de sombras
    shadows: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },

    // Configuración de transiciones
    transitions: {
        duration: 200,
        timingFunction: 'ease',
    },
});

