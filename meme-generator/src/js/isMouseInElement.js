export default function isMouseInElement(x, y, element, ctx) {
  let textWidth = ctx.measureText(element.text).width;
  let textHeight = ctx.measureText(element.text).actualBoundingBoxAscent + ctx.measureText(element.text).actualBoundingBoxDescent + +element.strokeWidth;

  let elementLeft = element.x;
  let elementRight = element.x + textWidth;
  let elementTop = element.y;
  let elementBottom = element.y + textHeight;

  if (x > elementLeft && x < elementRight && y > elementTop && y < elementBottom) {
    return true;
  }

  return false;
}