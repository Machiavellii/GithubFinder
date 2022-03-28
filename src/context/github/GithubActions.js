import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authrization: `token${GITHUB_TOKEN}` },
});

export const searchUsers = async (text) => {
  // setLoading();
  const params = new URLSearchParams({
    q: text,
  });

  const {
    data: { items },
  } = await github.get(`/search/users?${params}`);

  return items;
};

// Get user & repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`${GITHUB_URL}/users/${login}`),
    github.get(`${GITHUB_URL}/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
