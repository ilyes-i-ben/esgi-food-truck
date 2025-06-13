
export async function fetchMenuData() {
  const endpoint = 'https://keligmartin.github.io/api/menu.json';
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
