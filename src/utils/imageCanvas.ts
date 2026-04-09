export const EXPORT_W = 1280;
export const EXPORT_H = 720;

const RATIO_TOLERANCE = 0.05;

export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const needsCenteringModal = (img: HTMLImageElement): boolean => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const targetRatio = EXPORT_W / EXPORT_H;
  return Math.abs(imgRatio - targetRatio) / targetRatio > RATIO_TOLERANCE;
};

export const autoFitToCanvas = (img: HTMLImageElement): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  canvas.width = EXPORT_W;
  canvas.height = EXPORT_H;
  const ctx = canvas.getContext('2d')!;

  const fitScale = Math.max(
    EXPORT_W / img.naturalWidth,
    EXPORT_H / img.naturalHeight
  );
  const drawW = img.naturalWidth * fitScale;
  const drawH = img.naturalHeight * fitScale;

  ctx.drawImage(
    img,
    (EXPORT_W - drawW) / 2,
    (EXPORT_H - drawH) / 2,
    drawW,
    drawH
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
      'image/jpeg',
      0.85
    );
  });
};
