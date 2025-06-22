export default async function handler(req, res) {
  const { code, shop } = req.query;

  const clientId = "18797";
  const clientSecret = "4d614ebc8b353457c3b10b382b3d8e7c774674b1c526e740";
  const redirectUri = "https://tienda-oauth.vercel.app/api/callback";

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
