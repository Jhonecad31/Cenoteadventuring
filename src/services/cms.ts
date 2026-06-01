if (typeof process !== "undefined") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export interface PageTranslation {
  id: string;
  pageId: string;
  language: string;
  title: string;
  blocksJson: string;
}

export interface PageContent {
  id: string;
  siteId: string;
  slug: string;
  isPublished: boolean;
  translations: PageTranslation[];
}

const API_URL = import.meta.env.PUBLIC_CMS_PAGES_URL || "http://localhost:5075";

/**
 * Parsea el campo blocksJson que guarda el editor.
 * Si es un string en formato JSON (como '"<p>texto</p>"'), lo parsea.
 * Si falla, retorna el string original.
 */
export function parseBlocksJson(blocksJson: string): string {
  if (!blocksJson || blocksJson === "[]" || blocksJson === '""' || blocksJson.trim() === "") return "";
  try {
    const parsed = JSON.parse(blocksJson);
    if (typeof parsed === "string") return parsed;
    return blocksJson;
  } catch (e) {
    return blocksJson;
  }
}

/**
 * Obtiene una página pública del CMS filtrada por el dominio del sitio y el slug de la página.
 */
export async function getPublicPage(domain: string, slug: string): Promise<PageContent | null> {
  try {
    const url = `${API_URL}/api/page/public?domain=${encodeURIComponent(domain)}&slug=${encodeURIComponent(slug)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Página no encontrada en el CMS: /${slug} para el dominio ${domain}`);
        return null;
      }
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as PageContent;
  } catch (error) {
    console.error("Error al obtener la página desde el CMS:", error);
    return null;
  }
}

/**
 * Obtiene la lista de todas las páginas públicas del CMS para un dominio.
 */
export async function getPublicPages(domain: string): Promise<PageContent[]> {
  try {
    const url = `${API_URL}/api/page/public/list?domain=${encodeURIComponent(domain)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as PageContent[];
  } catch (error) {
    console.error("Error al obtener la lista de páginas desde el CMS:", error);
    return [];
  }
}
