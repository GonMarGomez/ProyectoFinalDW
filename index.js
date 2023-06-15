const arrayProductos =[]
const traerProductos = async () =>{
  try{
    const response = await fetch('/productos.json');
     const data = await response.json();
    listaDeProuctos(data)
    agregarElemento(data)

  }
  catch(error){
  alert('error')
  }
}
traerProductos()


let carrito = [];

const contenedor = document.getElementById("productos__presentacion");
const contenedorCarrito = document.getElementById("carrito__presentacion");
const botonCarrito = document.getElementById("carrito");
let botonVolverProductos = document.getElementById("volverAProductos");
let notificacionEliminar = document.getElementById("notificacionEliminar");
let notificacionEliminarSel = document.getElementById(
  "notificacionEliminarSel"
);
let botonEliminarCartel = document.getElementById("cerrarElimSel");
let precioTotal = document.getElementById("totalProductos");
const botonEliminarTodo = document.getElementById("eliminarTodo");
let notificacionAgregar = document.getElementById("notificacionAgregar");
const botonAgregar = document.getElementById("cerrarAgregar");

listaDeProuctos(arrayProductos);
function listaDeProuctos(lista) {
  contenedor.innerHTML = "";
  for (let i of lista) {
    let articulo = document.createElement("article");
    articulo.className = "productos__presentacion--item";
    articulo.innerHTML = ` 
<div class="productos__presentacion--${i.color}">
<img class="productos__img" src="${i.imagen}"
    alt=""/>
</div>
<h3 class="productos__descrip">Nombre: ${i.nombre}</h3>
<h4 class="productos__precio">$${i.precio}</h4>
<div class="botonAgregarBox">
<input id="BotonAgregar${i.id}" class="boton"  type="submit" value="Agregar"/>
</div>
`;
    contenedor.appendChild(articulo);
  }
}
function agregarElemento(lista){
  contenedor.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "INPUT") {
      let elemento = lista.find(
        (element) => element.id === parseInt(e.target.id[12])
      );
      carrito.push(elemento);
      localStorage.setItem("carritoNuevo", JSON.stringify(carrito));
      notificacionAgregar.style.display = "flex";
      botonAgregar.addEventListener("click", () => {
        notificacionAgregar.style.display = "none";
      });
    }
  });
}
  
function actualizarProductos() {
  let traerCarrito = JSON.parse(localStorage.getItem("carritoNuevo"));
  if (carrito) {
    traerCarrito.forEach((item) => {
      console.log(typeof traerCarrito);
      let articulo = document.createElement("article");
      articulo.className = "carrito__presentacion";
      articulo.setAttribute("id", `productoN${item.id}`);
      articulo.innerHTML = ` 
            <div class="productos__presentacion--${item.color}">
            <img class="productos__img" src="${item.imagen}"
                alt=""/>
            </div>
            <h3 class="productos__descrip">Nombre: ${item.nombre}</h3>
            <h4 class="productos__precio">$${item.precio}</h4>
            <div class="botonBorrarBox">
            <input id="eliminarProductoSelec${item.id}" class="boton"  type="submit" value="Eliminar"/>
            </div>
            `;
      contenedorCarrito.appendChild(articulo);
      let elementoAEliminar = document.getElementById(`productoN${item.id}`);
      let botonEliminarSelec = document.getElementById(
        `eliminarProductoSelec${item.id}`
      );
      botonEliminarCartel.addEventListener("click", () => {
        notificacionEliminarSel.style.display = "none";
        calcularTotal();
        location.reload();
      });
      botonEliminarSelec.addEventListener("click", (e) => {
        let carritoActualizado = traerCarrito.filter(
          (i) => i.id != parseInt(e.target.id[21])
        );
        localStorage.setItem(
          "carritoNuevo",
          JSON.stringify(carritoActualizado)
        );
        elementoAEliminar.style.display = "none";
        notificacionEliminarSel.style.display = "flex";
        calcularTotal();
        console.log(localStorage);
      });
    });
  } else {
    console.log("no hay productos nuevos");
  }
}

let cerrarNotificacion = document.getElementById("cerrarNotificacion");
cerrarNotificacion.addEventListener("click", () => {
  notificacionEliminar.style.display = "none";
  location.reload();
});

botonCarrito.addEventListener("click", (e) => {
  contenedor.style.display = "none";
  if (e.target && e.target.tagName === "I") {
    actualizarProductos();
    precioTotal.style.display = "flex";
    botonEliminarTodo.style.display = "flex";
    botonVolverProductos.style.display = "flex";
    botonCarrito.style.display = "none";
    calcularTotal();
  }
});
botonEliminarTodo.addEventListener("click", () => {
  localStorage.clear();
  notificacionEliminar.style.display = "flex";
  precioTotal.style.display = "none";
});
botonVolverProductos.addEventListener("click", (e) => {
  location.reload();
  actualizarProductos();
});
function calcularTotal() {
  let actualizarCarrito = JSON.parse(localStorage.getItem("carritoNuevo"));
  let resultado = 0;
  actualizarCarrito.forEach((item) => {
    resultado += item.precio;
    return resultado;
  });
  precioTotal.innerHTML = `
  <h3 class="totalProductosText">PRECIO TOTAL: ${resultado}</h3>
    `;
}
