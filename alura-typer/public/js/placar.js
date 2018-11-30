$("#botao-placar").click(function() {
  $(".placar").stop().slideToggle();
});
function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Kaio"
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
