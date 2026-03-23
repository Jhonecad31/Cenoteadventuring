import { IconFlagMEX, IconFlagUSA } from "../icons/allIcons";

export const languages: Record<string, { code: string; name: string;}> = {
    en: {
        code: 'en',
        name: 'English',
    },
    es: {
        code: 'es',
        name: 'Español',
    }
};

export const defaultLang = 'en';
export const showDefaultLang = false;

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.mayanReef': 'Mayan Reef',
        'nav.puertoMorelos': 'Puerto Morelos',
        'nav.contact': 'Contact',
        'footer.regularSnorkel': 'Snorkeling Adventure',
        'footer.privateSnorkel': 'Private Snorkeling',
        'footer.design': 'Design by Grupo Extreme',
    },
    es: {
        'nav.home': 'Inicio',
        'nav.mayanReef': 'Arrecife Maya',
        'nav.puertoMorelos': 'Puerto Morelos',
        'nav.contact': 'Contacto',
        'footer.regularSnorkel': 'Snorkeling Adventure',
        'footer.privateSnorkel': 'Snorkel Privado',
        'footer.design': 'Diseñado por Grupo Extreme',
    }
} as const;