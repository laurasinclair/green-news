const BASE_URL = 'http://localhost:5005' || import.meta.env.VITE_MONGODB_BASE_URL;
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY;

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users/johndoe01`, {
    headers: {
      'api-key': API_KEY,
    },
  });

  const data = await response.json();
  return data;
};

export const fetchArticles = async (page) => {
  const response = await fetch(`${BASE_URL}/api/articles?page=${page | 0}`);

  const data = await response.json();
  return data;
};
