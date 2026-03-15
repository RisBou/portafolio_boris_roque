document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.getElementById("escritura-titulo");
  const txt = h1.innerText;
  h1.innerText = "";
  let i = 0;
  function type() {
    if (i < txt.length) {
      h1.innerHTML += txt.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }
  type();

  //Para el buscador
  const buscador = document.getElementById("buscador");
  const tarjetas = document.querySelectorAll(".card-proyecto");
  const btnTags = document.querySelectorAll(".btn-tag");
  function filtrar(termino) {
    tarjetas.forEach((card) => {
      const keys = card.getAttribute("data-keywords").toLowerCase();
      card.style.display = keys.includes(termino.toLowerCase())
        ? "block"
        : "none";
    });
  }

  buscador.addEventListener("input", (e) => {
    filtrar(e.target.value);
    btnTags.forEach((t) => t.classList.remove("active"));
  });

  btnTags.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");
      buscador.value = f;
      filtrar(f);
      btnTags.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  const widget = document.getElementById("widget-clima");
  async function obtenerClima() {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-16.50&longitude=-68.15&current_weather=true", //Coordenadas de la paz aproximadamente para poner un ejemplo nomas
      );
      const data = await response.json();
      const temp = Math.round(data.current_weather.temperature);
      widget.innerHTML = `📍 La Paz: ${temp}°C 🌤️`;
    } catch (error) {
      widget.innerHTML = `📍 La Paz: 13°C 🌤️`;
    }
  }
  obtenerClima();

  const btnTema = document.getElementById("boton-tema");
  btnTema.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-tema");
    const nuevoTema = current === "claro" ? "oscuro" : "claro";
    html.setAttribute("data-tema", nuevoTema);
    localStorage.setItem("tema-preferido", nuevoTema);

    btnTema.innerText = nuevoTema === "oscuro" ? "☀️" : "🌓";
  });

  if (localStorage.getItem("tema-preferido") === "oscuro") {
    document.documentElement.setAttribute("data-tema", "oscuro");
    btnTema.innerText = "☀️";
  }
});
