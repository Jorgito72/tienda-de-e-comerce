// const productos = [
//     // Asadores
//     {
//         id: "asador-01",
//         titulo: "Asador chico",
//         imagen: "./imagenes/asador_chico.jpg",
//         categoria: {
//             nombre: "Parrillas",
//             id: "parrillas"
//         },
//         precio: 3500
//     },
//     {
//         id: "asador-02",
//         titulo: "Chulengo",
//         imagen: "./imagenes/chulengo.jpg",
//         categoria: {
//             nombre: "Parrillas",
//             id: "parrillas"
//         },
//         precio: 3500
//     },
//     {
//         id: "asador-03",
//         titulo: "Parrilla Boca Jr",
//         imagen: "./imagenes/parrilla_boca_jrs.jpg",
//         categoria: {
//             nombre: "Parrillas",
//             id: "parrillas"
//         },
//         precio: 1000
//     },
//     {
//         id: "asador-04",
//         titulo: "Parrila River Plate",
//         imagen: "./imagenes/parrilla_river.jpg",
//         categoria: {
//             nombre: "Parrillas",
//             id: "parrillas"
//         },
//         precio: 3500
//     },
//     {
//         id: "asador-05",
//         titulo: "Parrilla portatil",
//         imagen: "./imagenes/parrilla_portatil_1.jpg",
//         categoria: {
//             nombre: "Parrillas",
//             id: "parrillas"
//         },
//         precio: 3500
//     },
//     {
//         id: "asador-06",
//         titulo: "Parrilla clasica",
//         imagen: "./imagenes/prrilla_clasica.jpg",
//         categoria: {
//             nombre: "Parrillas",
//             id: "parrillas"
//         },
//         precio: 3500
//     },
//     // Discos
//     {
//         id: "discos-01",
//         titulo: "Disco con tapa",
//         imagen: "./imagenes/disco _con _tapa.jpg",
//         categoria: {
//             nombre: "Discos",
//             id: "discos"
//         },
//         precio: 2500
//     },
//     {
//         id: "discos-02",
//         titulo: "Disco parrilla",
//         imagen: "./imagenes/disco_con_parrilla.jpg",
//         categoria: {
//             nombre: "Discos",
//             id: "discos"
//         },
//         precio: 2500
//     },
//     {
//         id: "discos-03",
//         titulo: "Disco con patas",
//         imagen: "./imagenes/disco con patas.jpg",
//         categoria: {
//             nombre: "Discos",
//             id: "discos"
//         },
//         precio: 2500
//     },
//     //Accesorios
//     {
//         id: "accesorios-1",
//         titulo: "Brasero decorad",
//         imagen: "./imagenes/brasero_decorado.jpg",
//         categoria: {
//             nombre: "Accesorios",
//             id: "accesorios"
//         },
//         precio: 1500
//     },
//     {
//         id: "accesorios-2",
//         titulo: "Brasero de mesa",
//         imagen: "./imagenes/brasero_mesa.jpg",
//         categoria: {
//             nombre: "Accesorios",
//             id: "accesorios"
//         },
//         precio: 1500
//     },
//     {
//         id: "accesorios-3",
//         titulo: "Jaula parrilla",
//         imagen: "./imagenes/jaula_parrrilla.jpg",
//         categoria: {
//             nombre: "Accesorios",
//             id: "accesorios"
//         },
//         precio: 1500
//     },
//     {
//         id: "accesorios-4",
//         titulo: "Kit asador",
//         imagen: "./imagenes/kit_asador.jpg",
//         categoria: {
//             nombre: "Accesorios",
//             id: "accesorios"
//         },
//         precio: 150
//     },
//     {
//         id: "accesorios-5",
//         titulo: "Set cubiertos",
//         imagen: "./imagenes/set_cubiertos _asado.jpg",
//         categoria: {
//             nombre: "Accesorios",
//             id: "accesorios"
//         },
//         precio: 150
//     },
// ];

var productos = [];

fetch("./JSON/productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        // console.log(data);
        cargarProductos(productos);
    })

// area de constantes globales//

const tituloPrincipal = document.querySelector("#titulo_principal");
const contenedorProductos = document.getElementById("contenedor_productos");
const contenedorDescripcion = document.getElementById("contenedor_descripcion");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto_agregar");
let botonesDescripcion = document.querySelectorAll(".descripcion");
let botonVolver = document.getElementById("btnVolver");
const numerito = document.getElementById("numerito");
let productosEnCacrrito = [];

//

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");

        div.classList.add("col-6");
        div.classList.add("col-md-3");
        // div.classList.add("col-sm-6");
        div.innerHTML = `<div class="card contenedor_indiv" >
        <img src="${producto.imagen}" class="card-img-top imagen_card " alt="${producto.titulo}">
        <div class="card-body card-body-chico">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text text-center"><span>$</span>${producto.precio}</p>
          
          <a id="${producto.id}" class="btn btn-light producto_agregar">Agregar </a>
          <a id="${producto.id}" class="btn btn-light descripcion">Descripcion </a>
        </div>
      </div>`;


        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    actualizarbotonesDescripcion();
    

};




botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
            tituloPrincipal.innerText = "Todos los productos";
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto_agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCacrrito);
    });

};

function actualizarbotonesDescripcion() {
    botonesDescripcion = document.querySelectorAll(".descripcion");

    botonesDescripcion.forEach(boton => {
        boton.addEventListener("click", mostrarDescripcion);
    });

};

function actualizarbotonVolver() {
    botonVolver = document.getElementById("btnVolver");

    botonVolver.addEventListener("click", salirDescripcion);

};

const productosEnCacrritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (productosEnCacrritoLS) {
    productosEnCacrrito = productosEnCacrritoLS;
    actualizarNumerito();
} else {
    productosEnCacrrito = [];
}

function agregarAlCacrrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCacrrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCacrrito.findIndex(producto => producto.id === idBoton);
        productosEnCacrrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCacrrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCacrrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCacrrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

function mostrarDescripcion(e) {
// contenedorDescripcion.innerHTML="";

    const idBotonDescr = e.currentTarget.id;
    const productoDescripto = productos.find(producto => producto.id === idBotonDescr);

    // console.log(productoDescripto);
    contenedorProductos.classList.add("contenedor_productos");
    contenedorDescripcion.classList.remove("contenedor-descripcion");
    const div = document.createElement("div");

    div.classList.add("col");

    div.innerHTML = `<div class="card contenedor_indiv" >
                    <img src="${productoDescripto.imagen}" class="card-img-top imagen_card" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${productoDescripto.titulo}</h5>
                      <p class="card-text">${productoDescripto.descripcion}Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">${productoDescripto.categoria.nombre}</li>
                      <li class="list-group-item">${productoDescripto.precio}</li>
                      <li class="list-group-item">A third item</li>
                    </ul>
                    <div class="card-body">
                      <a href="" class="card-link boton_description" id="btnVolver">volver</a>
                      <a href="" class="card-link boton_description" id="${productoDescripto.id}">comprar</a>
                    </div>
                  </div> `;

        contenedorDescripcion.append(div);
        actualizarbotonVolver();

};



function salirDescripcion() {
    // console.log("Saliendo")
contenedorDescripcion.innerHTML="";
    
     contenedorProductos.classList.remove("contenedor_productos");
};

// botonVolver.addEventListener("click",salirDescripcion);