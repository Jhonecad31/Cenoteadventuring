// se agrega la conf de image kit para almacenar las imagenes del proyecto
// src/lib/imagekit.ts
import ImageKit from "imagekit-javascript";

export const ik = new ImageKit({
  publicKey: import.meta.env.PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

/**
 * Generador de URLs optimizadas para el diseño editorial
 */
export const getIKUrl = (path: string, width = 1200, quality = 80) => {
  return ik.url({
    path: path,
    transformation: [
      {
        width: width.toString(),
        quality: quality.toString(),
        format: "webp", // Formato ideal para SEO en sitios de turismo
        focus: "auto"   // Smart crop para destacar lo importante del tour
      }
    ]
  });
};