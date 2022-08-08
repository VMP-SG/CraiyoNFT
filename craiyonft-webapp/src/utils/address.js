export const truncateAddress = (address, startIndex, endIndex) => {
  return `${address.substring(0, startIndex)}...${address.substring(address.length-endIndex)}`
}

export const isTezosAddress = (address) => {
  return address.match(/^tz1[a-zA-Z0-9]{33}$/);
}
