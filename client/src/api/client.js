export const apiBase = import.meta.env.VITE_API_URL || "";

export async function getJson(url, options) {
  const response = await fetch(`${apiBase}${url}`, options);

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch {
      // Keep the status-based fallback when the response has no JSON body.
    }

    throw new Error(message);
  }

  return response.json();
}
