export default function handler(req, res) {
  const tienda = req.query.shop;
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  const scopes = ["read_orders"];

  const url = `https://${tienda}/admin/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(",")}`;

  res.redirect(url);
}
