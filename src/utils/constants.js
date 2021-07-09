export const serverUrl = 'http://localhost:3030';

export function formatDate(date) {
  const d = new Date(date);
  return ('0' + (d.getDate())).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}
