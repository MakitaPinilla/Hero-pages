//Se crea la funcion para cargar grafico.
function cargarGrafico(datos = [], name) {
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: `Estadísticas de poder para ${name}`,
      fontFamily: "Permanent Marker"
    },
    data: [{
      type: "pie",
      startAngle: 240,
      yValueFormatString: "##0.\"%\"",
      indexLabel: "{label} {y}",
      dataPoints: datos
    }]
  });
  chart.render();
};

//Se crea la funcion para cargar obtener el Data desde la API (en let dato label es el texto e yen valor).
function obtenerData(id) {
  let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

  $.ajax(url)
    .done(function (datos) {
      let { powerstats } = datos;
      let dataPoints = [];
      for (const [key, value] of Object.entries(powerstats)) {
        
        let dato = {
          label: key,
          y: value
        }

        dataPoints.push(dato);
      }
      cargarGrafico(dataPoints, datos.name);
      cargarCard(datos);
    })
    .fail(function () {
      alert("error");
    })

}

//Se condiciona al evento submit las condiciones para ingresar un numero valido.
$("form").on("submit", function (event) {

  event.preventDefault();
  const id = $("#formSuperhero").val()
  if (isNaN(id) || id < 1 || id > 732) {
    alert("Ingresar un número entre 1 y 732")
  }
  else {
    obtenerData(id);
  }
  //Este es la misma validación pero en solo un if:
  /*   event.preventDefault();
    const id = $("#formSuperhero").val()
    if(isNaN(id)){
      alert("No es un número")
    }
    else if(id>732 || id<1){
      alert("Numero inválido, valor ingresado debe ser mayor a 0 y menor a 732")
    }
    else{
    obtenerData(id);  
    } */

});

//Se crea la funcion cargarCard
function cargarCard(superhero) {
  $("#cardContainer").html(
    `<div class="card mb-3 overflow-scroll" style="height: 370px; width: 100%;">
        <div class="row g-0">
          <div class="col-md-6 p-1">
            <img src="${superhero.image.url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title py-2">${superhero.name}</h5>
              <h6 class="card-subtitle">${superhero.biography["full-name"]}</h6>
              <p class="card-text">Alias: ${superhero.biography["aliases"]} </p>
              <p class="card-text">Primera aparición: ${superhero.biography["first-appearance"]} </p>
              <p class="card-text">Publicado por: ${superhero.biography["publisher"]} </p>
              <p class="card-text">Ocupación: ${superhero.work["occupation"]} </p>
              <p class="card-text">Conexiones: ${superhero.connections["group-affiliation"]} </p>
            </div>
          </div>
        </div>
      </div>`
  )
}
