const BASE_URL = import.meta.env.VITE_MONGODB_BASE_URL;
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY;

export const fetchItems = async () => {
  const response = await fetch(`${BASE_URL}/users/johndoe01`, {
    headers: {
      'api-key': API_KEY,
      // 'Access-Control-Allow-Origin': '*'
    },
  });


  const data = await response.json();
  return data;
};
