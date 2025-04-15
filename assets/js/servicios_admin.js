const defaultServicios = [
    { id: 1, nombre: "Maquillaje profesional", imagen: "assets/img/maquillajeprofesional.png" },
    { id: 2, nombre: "Asesoría de imagen", imagen: "assets/img/asesoria.png" },
    { id: 3, nombre: "Clases de automaquillaje", imagen: "assets/img/automaquillaje.png" },
    { id: 4, nombre: "Eventos especiales", imagen: "assets/img/eventoespecial.png" },
  ];
  
  // Utilidades
  function getServicios() {
    return JSON.parse(sessionStorage.getItem("servicios")) || defaultServicios;
  }
  
  function saveServicios(servicios) {
    sessionStorage.setItem("servicios", JSON.stringify(servicios));
  }
  
  function renderServicios() {
    const servicios = getServicios();
    const grid = document.querySelector("section:last-of-type .card-grid");
    grid.innerHTML = "";
  
    servicios.forEach((servicio, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${servicio.imagen}" alt="${servicio.nombre}">
        <p><strong>${servicio.nombre}</strong></p>
        <div class="iconos">
          <button class="editar" data-index="${index}">✏️</button>
          <button class="eliminar" data-index="${index}">🗑️</button>
        </div>
      `;
      grid.appendChild(card);
    });
  
    document.querySelectorAll(".editar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        openEditModalServicio(index);
      });
    });
  
    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        deleteServicio(index);
      });
    });
  }
  
  // Agregar un servicio
  function setupAgregarServicio() {
    const btnAgregar = document.querySelectorAll(".add")[1];
    const modal = document.getElementById("modalAgregarServicio");
    const close = modal.querySelector(".close");
    const form = modal.querySelector("form");
  
    btnAgregar.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  
    close.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const imagen = form.imagen.value.trim();
      if (!nombre || !imagen) return;
  
      const servicios = getServicios();
      servicios.push({ nombre, imagen });
      saveServicios(servicios);
      renderServicios();
      modal.style.display = "none";
      form.reset();
    });
  }
  
  // Editar un servicio con el modal
  function openEditModalServicio(index) {
    const servicios = getServicios();
    const servicio = servicios[index];
  
    const modal = document.getElementById("modalEditarServicio");
    const form = modal.querySelector("form");
    const close = modal.querySelector(".close");
  
    form.nombre.value = servicio.nombre;
    form.imagen.value = servicio.imagen;
    modal.style.display = "flex";
  
    const handleSubmit = (e) => {
      e.preventDefault();
      servicio.nombre = form.nombre.value.trim();
      servicio.imagen = form.imagen.value.trim();
      saveServicios(servicios);
      renderServicios();
      modal.style.display = "none";
      form.removeEventListener("submit", handleSubmit);
    };
  
    form.addEventListener("submit", handleSubmit);
    close.addEventListener("click", () => modal.style.display = "none");
  }
  
  // Eliminar un servicio
  function deleteServicio(index) {
    let servicios = getServicios();
    servicios.splice(index, 1);
    saveServicios(servicios);
    renderServicios();
  }
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    renderServicios();
    setupAgregarServicio();
  });
  