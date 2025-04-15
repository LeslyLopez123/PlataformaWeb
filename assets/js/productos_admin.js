const defaultProducts = [
    { id: 1, nombre: "labiales", imagen: "assets/img/labiales.png" },
    { id: 2, nombre: "Polvos", imagen: "assets/img/polvos.png" },
    { id: 3, nombre: "Rubores", imagen: "assets/img/rubores.png" },
    { id: 4, nombre: "Bases", imagen: "assets/img/bases.png" },
    { id: 5, nombre: "Pestañinas", imagen: "assets/img/pestaninas.png" },
    { id: 6, nombre: "skincare", imagen: "assets/img/skincare.png" },
  ];
  
  // Cargar productos
  function getProducts() {
    return JSON.parse(sessionStorage.getItem("productos")) || defaultProducts;
  }
  
  // Guardar productos
  function saveProducts(products) {
    sessionStorage.setItem("productos", JSON.stringify(products));
  }
  
  // Mostrar productos
  function recargarDOM() {
    const productos = getProducts();
    const grid1 = document.querySelectorAll(".card-grid")[0];
    const grid2 = document.querySelectorAll(".card-grid")[1];
    grid1.innerHTML = "";
    grid2.innerHTML = "";
    let toggleGrid = true;
  
    productos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p><strong>${producto.nombre}</strong></p>
        <div class="card-actions">
            <button onclick="editarProducto(${producto.id})">✏️</button>
            <button onclick="eliminarProducto(${producto.id})">🗑️</button>
        </div>
        `;
      toggleGrid ? grid1.appendChild(card) : grid2.appendChild(card);
      toggleGrid = !toggleGrid;
    });
  }
  
  // Agregar producto
  function agregarProductoAlDOM(producto) {
    const grid1 = document.querySelectorAll(".card-grid")[0];
    const grid2 = document.querySelectorAll(".card-grid")[1];
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p><strong>${producto.nombre}</strong></p>
        <div class="card-actions">
            <button onclick="editarProducto(${producto.id})">✏️</button>
            <button onclick="eliminarProducto(${producto.id})">🗑️</button>
        </div>
        `;

    if (!agregarProductoAlDOM.toggleGrid) agregarProductoAlDOM.toggleGrid = true;
    agregarProductoAlDOM.toggleGrid ? grid1.appendChild(card) : grid2.appendChild(card);
    agregarProductoAlDOM.toggleGrid = !agregarProductoAlDOM.toggleGrid;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    recargarDOM();
  
    const btnAgregar = document.querySelectorAll(".add")[0];
    const modalAgregar = document.getElementById("modalAgregarProducto");
    const closeAgregar = document.querySelector(".close");
    const formAgregar = document.getElementById("formAgregarProducto");
  
    btnAgregar.addEventListener("click", () => {
      modalAgregar.style.display = "flex";
    });
  
    closeAgregar.addEventListener("click", () => {
      modalAgregar.style.display = "none";
    });
  
    formAgregar.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const imagen = document.getElementById("imagen").value.trim();
  
      if (!nombre || !imagen) return;
  
      const productos = getProducts();
      const nuevoProducto = {
        id: Date.now(),
        nombre,
        imagen
      };
      productos.push(nuevoProducto);
      saveProducts(productos);
      agregarProductoAlDOM(nuevoProducto);
      modalAgregar.style.display = "none";
      formAgregar.reset();
    });
  
    // EDITAR
    const modalEditar = document.getElementById("modalEditarProducto");
    const formEditar = document.getElementById("formEditarProducto");
    const cerrarEditar = document.getElementById("cerrarEditar");
  
    cerrarEditar.addEventListener("click", () => {
      modalEditar.style.display = "none";
    });
  
    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = parseInt(document.getElementById("editarId").value);
      const nombre = document.getElementById("editarNombre").value.trim();
      const imagen = document.getElementById("editarImagen").value.trim();
  
      const productos = getProducts();
      const index = productos.findIndex(p => p.id === id);
      if (index !== -1) {
        productos[index].nombre = nombre;
        productos[index].imagen = imagen;
        saveProducts(productos);
        recargarDOM();
        modalEditar.style.display = "none";
      }
    });
  
    // Vista previa al editar
    document.getElementById("editarImagen").addEventListener("input", (e) => {
      document.getElementById("vistaPrevia").src = e.target.value;
    });
  });
  
  // Función global para editar
  function editarProducto(id) {
    const productos = getProducts();
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
  
    document.getElementById("editarId").value = producto.id;
    document.getElementById("editarNombre").value = producto.nombre;
    document.getElementById("editarImagen").value = producto.imagen;
    document.getElementById("vistaPrevia").src = producto.imagen;
  
    document.getElementById("modalEditarProducto").style.display = "flex";
  }
  
  // Función global para eliminar
  function eliminarProducto(id) {
    let productos = getProducts();
    productos = productos.filter(p => p.id !== id);
    saveProducts(productos);
    recargarDOM();
  }
  