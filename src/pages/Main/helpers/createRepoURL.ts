const createRepoURL = (url: string) => {
  const splited = "https://github.com/nodejs/diagnostics/".split('/')
  return splited.slice(0, !splited.at(-1) ? -2 : -1).join('/');
};

export default createRepoURL;