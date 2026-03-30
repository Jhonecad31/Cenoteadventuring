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
        'nav.activities': 'Activities',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        'nav.about': 'About us'

    },
    es: {
        'nav.home': 'Inicio',
        'nav.activities': 'Actividades',
        'nav.contacto': 'Contacto',
        'nav.blog': 'Blog',
        'nav.nosotros': 'Nosotros'
    }
} as const;