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
        'nav.cenoteTrail': 'The cenote route',
        'nav.about': 'About us',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        'aria.openMenu': 'Open main menu',
        'aria.closeMenu': 'Close main menu',
    },
    es: {
        'nav.home': 'Inicio',
        'nav.cenoteTrail': 'Ruta de los Cenotes',
        'nav.about': 'Sobre nosotros',
        'nav.contact': 'Contacto',
        'nav.blog': 'Blog',
        'aria.openMenu': 'Abrir menú principal',
        'aria.closeMenu': 'Cerrar menú principal',
    }
} as const;