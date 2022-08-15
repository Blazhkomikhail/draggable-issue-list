import getOwnerRepoDataFromURL from "../helpers/getOwnerRepoDataFromURL";
import {ResponseModel} from "../models/issueModel";

const BASE_URL = "https://api.github.com"


const getIssuesAPI = async (url: string): Promise<ResponseModel[]> => {
  // url e.g. "https://github.com/nodejs/diagnostics/"
  const [owner, repo] = getOwnerRepoDataFromURL(url);

  const request = await fetch(`${BASE_URL}/repos/${owner}/${repo}/issues?state=all`);
  const data = await request.json();
  return data;
};

export default getIssuesAPI;