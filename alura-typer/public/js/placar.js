$("#botao-placar").click(function() {
  $(".placar").stop().slideToggle();
});
$("#botao-sync").click(sincronizaPlacar);
function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
  var linha = $(this).parent().parent();
  linha.fadeOut();
  setTimeout(function () {
  linha.remove();
},400);
}
function mostraPlacar() {
  var placar = $(".placar");
  placar.slideDown();
}
function sincronizaPlacar() {
  var placar = [];
  var linhas = $("tbody>tr");
  linhas.each(function () {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    
    var score= {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score);
  });
  var dados = {
    placar: placar
  };
  $.post("http://localhost:3000/placar",dados,function () {
    console.log("Placar sincronizado com sucesso");
    $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar!");
  }).fail(function (){
          $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar!");
  }).always(function(){
      setTimeout(function () {
          $(".tooltip").tooltipster("close");
      },1200);
  });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar",function(data) {

    $(data).each(function(){
      var linha= novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    })

  });

}