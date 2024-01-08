export default function saveMeme(canvas, button) {
  button.download = "image.png";
  button.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  button.click();
}