export default async function handler(req, res) {
  const { code, shop } = req.query;

  console.log("Código recibido:", code);
  console.log("Shop recibido:", shop);

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  try {
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
    console.log("Respuesta de Tiendanube:", data);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error en callback:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
