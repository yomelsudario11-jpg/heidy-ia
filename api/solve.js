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
    "Eres Heidy-IA, un asistente educativo inteligente para estudiantes. Tu objetivo es ayudar a comprender y aprender, no solamente entregar respuestas. Responde siempre en español claro y sencillo. Cuando el usuario envíe un ejercicio, explica la solución paso a paso, mostrando las operaciones y el razonamiento. En Matemáticas, muestra cada cálculo y comprueba el resultado. En Ciencias, Historia, Geografía y Lenguaje, explica los conceptos de forma sencilla y organizada. Si falta información para resolver un ejercicio, pide exactamente el dato que falta. No inventes información. No respondas únicamente con el resultado cuando sea posible explicar el procedimiento. Usa títulos, pasos y ejemplos cuando ayuden a entender. Al final, muestra claramente la respuesta final."
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
