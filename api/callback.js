export default async function handler(req, res) {
  const { code, shop } = req.query;

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  console.log("🧪 Datos recibidos en callback:");
  console.log({ code, shop, clientId, clientSecret, redirectUri });

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
    console.log("📥 Respuesta de Tiendanube:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Error desde Tiendanube',
        detalle: data,
      });
    }

    return res.status(200).json({ success: true, token: data.access_token });
  } catch (error) {
    console.error("🔥 Error inesperado:", error);
    return res.status(500).json({ error: 'Error en el servidor', detalle: error.message });
  }
}
