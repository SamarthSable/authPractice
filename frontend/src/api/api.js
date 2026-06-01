const BaseUrl = import.meta.env.VITE_BACKEND_URL;

async function post({ endpoint, body }) {
  const response = await fetch(`${BaseUrl}/api/auth${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
}

export default post;
