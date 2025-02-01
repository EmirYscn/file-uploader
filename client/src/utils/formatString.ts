export function formatString(str: string) {
  let newString = str.slice(0, 12);
  newString += "...";
  return str.length > 10 ? newString : str;
}
