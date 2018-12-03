$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

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
function buscaFrase() {
  $("#spinner").show();
  var fraseId = $("#frase-id").val();
  console.log("Id da minha frase:" + fraseId);
  var dados = { id: fraseId};
  $.get("http://localhost:3000/frases",dados,trocaFrase).fail(function () {
    $("#erro").show();

    setTimeout(function() {
      $("#erro").hide();
    }, 2500);
  }).always(function () {
    $("#spinner").hide();
  });
};
function trocaFrase(data) {
  var frase = $(".frase");
  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
};