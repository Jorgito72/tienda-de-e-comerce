

var cosas=[];
const csvUrl = 'https://docs.google.com/spreadsheets/d/1P-sja3CZBo51rs5-s-yRtsUKd5MNabCHR_FxEloEh-E/gviz/tq?tqx=out:json&gid=0';
console.log(csvUrl);
const contenedorProductos = document.getElementById("contenedor_productos");

function csvToJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
  
      result.push(obj);
    }
  
    return JSON.stringify(result);
  }

  
  function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
  const div = document.createElement("divi");
  console.log(producto.imagen)

  div.classList.add("col-6");
  div.classList.add("col-md-3");
  // div.classList.add("col-sm-6");
  div.innerHTML = `<div class="card contenedor_indiv" >
  <img src="${producto.imagen}" class="card-img-top imagen_card " id= "img-prod" alt="${producto.titulo}">
  
 
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
  
try {
    //fetch(csvUrl)
    fetch('https://docs.google.com/spreadsheets/d/1P-sja3CZBo51rs5-s-yRtsUKd5MNabCHR_FxEloEh-E/gviz/tq?tqx=out:csv&gid=0')
    .then(res => res.text())
    .then(data =>{
        const jsonData =csvToJSON(data);
          console.log(data);
          console.log("Ahora dataJs");
          console.log(jsonData);
          
          cosas=jsonData;
        console.log("Ahora productos");
        console.log(cosas);
        
         cargarProductos(cosas);
     })
} catch (error) {
    
}

//https://docs.google.com/spreadsheets/d/1P-sja3CZBo51rs5-s-yRtsUKd5MNabCHR_FxEloEh-E/gviz/tq?tqx=out:csv&gid=0