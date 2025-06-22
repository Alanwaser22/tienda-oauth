export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { access_token, store_id } = req.query;

  if (!access_token || !store_id) {
    return res.status(400).json({ error: 'Faltan parámetros: access_token o store_id' });
  }

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${store_id}/orders`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'DreamfulApp (alan@dreamful.com.ar)'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener ventas', detalle: error.message });
  }
}
