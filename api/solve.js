export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      respuesta: "Método no permitido."
    });
  }

  try {
    const { pregunta } = req.body || {};

    if (!pregunta) {
      return res.status(400).json({
        respuesta: "Escribe una pregunta o tarea."
      });
    }

    const respuesta = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        instructions:
          "Eres Heidy-IA, un asistente educativo. Ayuda a estudiantes a comprender sus tareas. Explica de forma clara, sencilla y paso a paso. No te limites a dar el resultado: enseña cómo llegar a él.",
        input: pregunta
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      console.error("OpenAI:", datos);

      return res.status(500).json({
        respuesta: "No pude conectarme con la inteligencia artificial."
      });
    }

    return res.status(200).json({
      respuesta: datos.output_text || "No recibí una respuesta."
    });

  } catch (error) {
    console.error("Error Heidy-IA:", error);

    return res.status(500).json({
      respuesta: "Ocurrió un error al conectar con Heidy-IA."
    });
  }
}
