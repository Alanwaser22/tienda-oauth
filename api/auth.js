export default function handler(req, res) {
  const tienda = req.query.shop;
  const clientId = "TU_CLIENT_ID_DE_TIENDANUBE";
  const redirectUri = "https://TU_USUARIO.vercel.app/api/callback";
  const scopes = ["read_orders"];

  const url = `https://${tienda}/admin/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(",")}`;

  res.redirect(url);
}