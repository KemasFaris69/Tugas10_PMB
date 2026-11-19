const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
async function request(path = '', options = {}) {
  let response;
  try { response = await fetch(`${BASE}/pendaftar${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } }); }
  catch { throw new Error('Backend tidak dapat dihubungi. Jalankan server NestJS pada port 3000.'); }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(Array.isArray(data?.message) ? data.message.join(', ') : data?.message || `HTTP ${response.status}`);
  return data;
}
export const apiPendaftar = {
  semua: () => request(),
  satu: (id) => request(`/${id}`),
  tambah: (data) => request('', { method: 'POST', body: JSON.stringify(data) }),
  ubah: (id, data) => request(`/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  hapus: (id) => request(`/${id}`, { method: 'DELETE' }),
};
