export function inverse(img: HTMLCanvasElement | HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  if (ctx == null) {
    throw new Error("2d context is null");
  }
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    data[i] ^= (1 << 8) - 1;
    data[i + 1] ^= (1 << 8) - 1;
    data[i + 2] ^= (1 << 8) - 1;
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}
