// 🔗 URL del backend en Render
const API = "https://plagio-backend-ia.onrender.com";

/* =========================
   ANALIZAR DOCUMENTO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const formAnalizar = document.getElementById("form-analizar");
  const loader = document.getElementById("loader");

  if (!formAnalizar) return;

  formAnalizar.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita recarga del formulario

    // Mostrar loader
    if (loader) loader.style.display = "flex";

    const archivoInput = document.getElementById("archivo");
    const archivo = archivoInput?.files[0];

    if (!archivo) {
      alert("Debes seleccionar un archivo");
      if (loader) loader.style.display = "none";
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      const res = await fetch(`${API}/analizar`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }

      const data = await res.json();

      // Guardar resultado para la página resultado.html
      localStorage.setItem("resultado", JSON.stringify(data));

      // Redirigir a resultados
      window.location.href = "resultado.html";

    } catch (error) {
      console.error("Error al analizar:", error);
      alert("❌ Error al analizar el documento. Intenta nuevamente.");
      if (loader) loader.style.display = "none";
    }
  });
});
