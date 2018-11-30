$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
  $("#spinner").show();
  $.get("http://localhost:3000/frases",trocaFraseAleatoria).fail(function() {

    $("#erro").show();

    setTimeout(function() {
      $("#erro").hide();
    }, 2500);

  }).always(function() {
    $("#spinner").hide();
  });
};
function trocaFraseAleatoria(data) {
  var frase = $(".frase");
  var tempo = $("#tempo-digitacao");
  var numeroAleatorio= Math.floor(Math.random() * data.length);
  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);

};
