export const capitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getImageString = (string) => {
  return string.startsWith("/9j/") ? `data:image/jpeg;base64,${string}` : string;
}

export const padThousands = (number) => {
  return ("000" + number.toString()).slice(-4);
}
