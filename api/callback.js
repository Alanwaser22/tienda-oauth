export default async function handler(req, res) {
  const { code, shop } = req.query;

  const clientId = "TU_CLIENT_ID_DE_TIENDANUBE";
  const clientSecret = "TU_CLIENT_SECRET_DE_TIENDANUBE";
  const redirectUri = "https://TU_USUARIO.vercel.app/api/callback";

  const response = await fetch(`https://${shop}/admin/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  console.log("Token de acceso:", data);

  res.status(200).json({ success: true, token: data.access_token });
}