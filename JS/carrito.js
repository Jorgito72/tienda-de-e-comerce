
const productosEnCacrrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const carritoVacio = document.getElementById("carrito_vacio");
const contenedorCarritoProductos = document.getElementById("contenedor_carrito_productos");
const carritoAcciones = document.getElementById("carrito_acciones");
const carritoGracias = document.getElementById("carrito_gracias");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciarCarrito=document.getElementById("boton_vaciar_carrito");
const totalCompraCarrito= document.getElementById("total_compra_carrito");
const botonTerminarCompra=document.getElementById("terminar_compra")

console.log(productosEnCacrrito);


function cargarProductosEnCarrito(){
    if (productosEnCacrrito && productosEnCacrrito.length>0){
        carritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoGracias.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCacrrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito_producto");
            div.innerHTML = `<img class="carrito_producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
<div class="carrito_producto_titulo">
    <small>Titulo</small>
    <h3>${producto.titulo}</h3>
</div>
<div class="carrito_producto_precio">
    <small>Precio</small>
    <h3>${producto.precio}</h3>
</div>
<div class="carrito_producto_cantidad">
    <small>Cantidad</small>
    <h3>${producto.cantidad}</h3>
</div>
<div class="carrito_producto_subtotal">
    <small>Subtotal</small>
    <h3>${producto.precio * producto.cantidad}</h3>
</div>
<button class="carrito_producto_eliminar" id="${producto.id}"><i class="bi bi-x-circle-fill"></i></button>`

            contenedorCarritoProductos.append(div);

        })

actualizarBotoneseliminar();
    actualizarTotalCompra();
    console.log(productosEnCacrrito.length);

    } else {
        carritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoGracias.classList.add("disabled");
    };
    

}

cargarProductosEnCarrito();

function actualizarBotoneseliminar() {
    botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCacrrito);
    });
};

function eliminarDelCacrrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCacrrito.findIndex(producto => producto.id === idBoton);

    productosEnCacrrito.splice(index, 1);
    
    cargarProductosEnCarrito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCacrrito));
}


botonVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    productosEnCacrrito.length=0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCacrrito));

    cargarProductosEnCarrito();

}function actualizarTotalCompra(){
    const totalCalculado=productosEnCacrrito.reduce((acc, producto)=> acc + (producto.precio * producto.cantidad),0);
    totalCompraCarrito.innerHTML=`$${totalCalculado}`;
}

botonTerminarCompra.addEventListener("click", terminarCompra);
function terminarCompra(){
    //  textoDeCompra=compraATexto(productosEnCacrrito);
    let productosParaWsp = productosEnCacrrito.map(producto => `- ${producto.cantidad} ${producto.titulo}, ${producto.precio}`); // Le añadimos un guión delante del nombre y también el monto
    const productosConFormatoAmigable = productosParaWsp.join('\n'); // Unimos todos los elementos del array en una cadena usando como separador el salto de línea
    console.log(productosConFormatoAmigable); // Como la variable ya es una cadena, no necesitamos usar JSON.strignify()
     //window.location.href = 'https://api.whatsapp.com/send?phone=333333333&text=Me%20interesan%20los%20siguientes%20productos' + ' ' + productosConFormatoAmigable // Comento esta línea para no redirigir realmente en este ejemplo



      
    productosEnCacrrito.length=0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCacrrito));
    

     
    carritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoGracias.classList.remove("disabled");

}
 function compraATexto(productosEnCacrrito) {
        return JSON.stringify(productosEnCacrrito);
      }