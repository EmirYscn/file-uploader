export function formatString(str: string, allowedChar: number = 12) {
  let newString = str.slice(0, allowedChar);
  newString += "...";
  return str.length > 10 ? newString : str;
}
