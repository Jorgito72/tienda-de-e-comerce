// PRODUCTOS
const productos = [
    // Asadores
    {
        id: "asador-01",
        titulo: "Asador chico",
        imagen: "./imagenes/asador_chico.jpg",
        categoria: {
            nombre: "Parrillas",
            id: "parrillas"
        },
        precio: 3500
    },
    {
        id: "asador-02",
        titulo: "Chulengo",
        imagen: "./imagenes/chulengo.jpg",
        categoria: {
            nombre: "Parrillas",
            id: "parrillas"
        },
        precio: 3500
    },
    {
        id: "asador-03",
        titulo: "Parrilla Boca Jr",
        imagen: "./imagenes/parrilla_boca_jrs.jpg",
        categoria: {
            nombre: "Parrillas",
            id: "parrillas"
        },
        precio: 1000
    },
    {
        id: "asador-04",
        titulo: "Parrila River Plate",
        imagen: "./imagenes/parrilla_river.jpg",
        categoria: {
            nombre: "Parrillas",
            id: "parrillas"
        },
        precio: 3500
    },
    {
        id: "asador-05",
        titulo: "Parrilla portatil",
        imagen: "./imagenes/parrilla_portatil_1.jpg",
        categoria: {
            nombre: "Parrillas",
            id: "parrillas"
        },
        precio: 3500
    },
    {
        id: "asador-06",
        titulo: "Parrilla clasica",
        imagen: "./imagenes/prrilla_clasica.jpg",
        categoria: {
            nombre: "Parrillas",
            id: "parrillas"
        },
        precio: 3500
    },
    // Discos
    {
        id: "discos-01",
        titulo: "Disco con tapa",
        imagen: "./imagenes/disco _con _tapa.jpg",
        categoria: {
            nombre: "Discos",
            id: "discos"
        },
        precio: 2500
    },
    {
        id: "discos-02",
        titulo: "Disco parrilla",
        imagen: "./imagenes/disco_con_parrilla.jpg",
        categoria: {
            nombre: "Discos",
            id: "discos"
        },
        precio: 2500
    },
    {
        id: "discos-03",
        titulo: "Disco con patas",
        imagen: "./imagenes/disco con patas.jpg",
        categoria: {
            nombre: "Discos",
            id: "discos"
        },
        precio: 2500
    },
    //Accesorios
    {
        id: "accesorios-1",
        titulo: "Brasero decorado",
        imagen: "./imagenes/brasero_decorado.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 1500
    },
    {
        id: "accesorios-2",
        titulo: "Brasero de mesa",
        imagen: "./imagenes/brasero_mesa.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 1500
    },
    {
        id: "accesorios-3",
        titulo: "Jaula parrilla",
        imagen: "./imagenes/jaula_parrrilla.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 1500
    },
    {
        id: "accesorios-4",
        titulo: "Kit asador",
        imagen: "./imagenes/kit_asador.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 150
    },
    {
        id: "accesorios-5",
        titulo: "Set cubiertos",
        imagen: "./imagenes/set_cubiertos _asado.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 150
    },
];

const contenedorProductos = document.querySelector("#contenedor_productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo_principal");
let botonesAgregar = document.querySelectorAll(".producto_agregar");
const numerito = document.getElementById("numerito");
let anchoVentana = screen.width;



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("clas-sm-6")
        div.classList.add("col-md-3");
        
        div.innerHTML=`<img class="producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
                 
        <div class="producto_detalles">
            <h3 class="producto_titulo">${producto.titulo}</h3>
             <p class="producto_precio"><span>$</span>${producto.precio}</p>
            <button class="producto_agregar" id="${producto.id}">Agregar</button>
        </div>`; 
        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();

};

cargarProductos(productos);


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

let productosEnCacrrito = [];

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
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCacrrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
botonesAgregarCantidad.forEach(boton => {
boton.addEventListener("click", agregarCantidad);
})

