// Heidy-IA - conexión con el asistente
// Este archivo prepara las preguntas y recibe las respuestas de la IA.

async function preguntarHeidy(pregunta, imagen = null) {
  try {
    const respuesta = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pregunta: pregunta,
        imagen: imagen
      })
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo conectar con Heidy-IA");
    }

    const datos = await respuesta.json();

    return {
      ok: true,
      respuesta: datos.respuesta || "No recibí una respuesta."
    };

  } catch (error) {
    console.error("Error Heidy-IA:", error);

    return {
      ok: false,
      respuesta: "Heidy-IA no pudo conectarse en este momento. Intenta nuevamente."
    };
  }
}

// Permite usar la función desde index.html
window.preguntarHeidy = preguntarHeidy;
