

import ImageKit from "imagekit-javascript";

export const ik = new ImageKit({
  publicKey: import.meta.env.PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export const getIKUrl = (path: string, width = 1200, quality = 80) => {
  return ik.url({
    path: path,
    transformation: [
      {
        width: width.toString(),
        quality: quality.toString(),
        format: "webp", 
        focus: "auto"   
      }
    ]
  });
};