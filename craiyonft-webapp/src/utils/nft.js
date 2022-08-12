export const getMostCommonCategories = (nftData) => {
  const wordCountMap = {}
  for (const nft of nftData) {
    const words = nft.prompt.split(" ");
    for (const word of words) {
      if (word in wordCountMap) {
        wordCountMap[word] += 1;
      } else {
        wordCountMap[word] = 1;
      }
    }
  }
  const countArray = Array.from(Object.entries(wordCountMap));
  countArray.sort((a, b) => b[1] - a[1]);
  const categoryArray = []
  for (let i = 0; i < 5; i++) {
    categoryArray.push(countArray[i][0]);
  }
  return categoryArray;
}

export const getCategoryNFTs = (nftData, category) => {
  return nftData.filter((nft) => nft.prompt.split(" ").includes(category));
}
