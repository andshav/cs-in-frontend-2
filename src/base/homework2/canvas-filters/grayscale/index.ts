export function grayscale(img: HTMLCanvasElement | HTMLImageElement) {
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
    // Y=0.299×R+0.587×G+0.114×B ~ 0.3R + 0.6G + 0.1B
    const value = 0.3 * data[i] + 0.6 * data[i + 1] + 0.1 * data[i + 2];
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}
