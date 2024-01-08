export default function addElement(text, fontSize, strokeWidth, fontColor, strokeColor, array) {
  const elem = {
    x: 50,
    y: 50,
    text,
    fontSize,
    strokeWidth,
    fontColor,
    strokeColor,
  };

  array.push(elem);
}