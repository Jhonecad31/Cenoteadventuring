import { IconFlagMEX, IconFlagUSA } from "../icons/allIcons";

export const languages: Record<string, { code: string; name: string; flag: typeof IconFlagUSA }> = {
    en: {
        code: 'en',
        name: 'English',
        flag: IconFlagUSA
    },
    es: {
        code: 'es',
        name: 'Español',
        flag: IconFlagMEX
    }
};


export const defaultLang = 'en';
export const showDefaultLang = false;

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.cenoteTrail': 'Cenote Trail',
        'nav.activities': 'Activities',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
    },
    es: {
        'nav.home': 'Inicio',
        'nav.rutaDeLosCenotes': 'Ruta de los cenotes',
        'nav.activities': 'Actividades',
        'nav.contacto': 'Contacto',
        'nav.blog': 'Blog',
    }
} as const;