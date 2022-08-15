const getOwnerRepoDataFromURL = (url: string): string[] => {
  const splitedUrl = url.split('/');
  return splitedUrl.at(-1) ? splitedUrl.slice(-2): splitedUrl.slice(-3);
};

export default getOwnerRepoDataFromURL;