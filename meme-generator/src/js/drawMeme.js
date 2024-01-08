export default function drawMeme(canvas, ctx, image, elements) {
  ctx.clearRect(0, 0, image.width, image.height);

  const maxWidth = 453;
  const maxHeight = 453;
  let width = image.width;
  let height = image.height;
  const ratio = width / height;
  if (width > maxWidth || height > maxHeight) {
    if (ratio > 1) {
        width = maxWidth;
        height = maxWidth / ratio;
    } else {
        height = maxHeight;
        width = maxHeight * ratio;
    }
  }
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);

  for (let element of elements) {
    ctx.strokeStyle = element.strokeColor;
    ctx.lineWidth = element.strokeWidth;
    ctx.fillStyle = element.fontColor;
    ctx.lineJoin = 'round';
    ctx.font = `${element.fontSize}px sans-serif`;

    ctx.textBaseline = 'top';
    ctx.strokeText(element.text, element.x, element.y);
    ctx.fillText(element.text, element.x, element.y);
  }
}