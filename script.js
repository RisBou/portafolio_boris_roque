document.addEventListener("DOMContentLoaded", () => {
  const botonTema = document.querySelector("#boton-tema");
  botonTema.addEventListener("click", () => {
    const raiz = document.documentElement;
    const temaActual = raiz.getAttribute("data-tema");
    raiz.setAttribute(
      "data-tema",
      temaActual === "oscuro" ? "claro" : "oscuro",
    );
  });

  const foto = document.querySelector("#foto-interactiva");
  foto.addEventListener("mouseenter", () => {
    foto.style.transform = "scale(1.05) rotate(2deg)";
  });
  foto.addEventListener("mouseleave", () => {
    foto.style.transform = "scale(1) rotate(0deg)";
  });

  const opciones = { threshold: 0.5 };
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const barras = entrada.target.querySelectorAll(".progreso");
        barras.forEach((barra) => {
          barra.style.width = barra.getAttribute("data-nivel");
        });
      }
    });
  }, opciones);

  document.querySelectorAll(".tarjeta-cristal").forEach((tarjeta) => {
    observador.observe(tarjeta);
  });

  const botonesFiltro = document.querySelectorAll(".btn-filtro");
  const proyectos = document.querySelectorAll(".tarjeta-proyecto");

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      document.querySelector(".btn-filtro.activo").classList.remove("activo");
      boton.classList.add("activo");

      const categoria = boton.getAttribute("data-categoria");
      proyectos.forEach((p) => {
        const tipo = p.getAttribute("data-tipo");
        if (categoria === "todos" || tipo === categoria) {
          p.classList.remove("ocultar");
        } else {
          p.classList.add("ocultar");
        }
      });
    });
  });

  const btnContact = document.querySelector("#btn-contacto");
  const msgGracias = document.querySelector("#mensaje-agradecimiento");
  if (btnContact) {
    btnContact.addEventListener("click", () => {
      msgGracias.classList.remove("oculto");
      btnContact.classList.add("oculto");
    });
  }
});
