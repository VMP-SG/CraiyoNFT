export const truncateAddress = (address) => {
  return `${address.substring(0, 5)}...${address.substring(address.length-2)}`
}

export const isTezosAddress = (address) => {
  return address.match(/^tz1[a-zA-Z0-9]{33}$/);
}
