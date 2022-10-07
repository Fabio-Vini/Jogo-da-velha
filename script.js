const { checkPrime } = require("crypto");

const currentPlayer = document.querySelector(".currentPlayer");

/*Variáveis*/
let selected;
let player = "X";

/*Variável que vai armazenar as possibilidades de combinações para vencer*/
let positions = [
  [1, 2, 3]
  [4, 5, 6]
  [7, 8, 9]
  [1, 4, 7]
  [2, 5, 8]
  [3, 6, 9]
  [1, 5, 9]
  [3, 5, 7]
];

function init() {
  selected = [];

  currentPlayer.innerHTML = 'JOGADOR DA VEZ: ${player}'; /*O currentPlayer vai armazenar a variável Player*/

  

  document.querySelectorAll(".game button").forEach((item) => { /*.forEach serve para que cada botão iniciar sem nada preenchido*/
    item.innerHTML = "";
    item.addEventListener("click", newMove); /*newMove serve para indicar um novo movimento à cada botão*/
  });
}

init ();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove); /*removeEventListener uma função que vai remover a ação de clicar no botão, impedindo que seja clicado e selecionar o mesmo mais de 1 vez*/
  selected[index] = player; /*Vai armazenar os itens que já foram selecionados*/

  setTimeout(() => {
    checkPrime();
  }, [100]);

  player = player === "X" ? "O" : "X"; /*Aqui ocorrá a troca de vez dos jogadores, se o X já selecionou troca para o O*/
  currentPlayer.innerHTML = 'JOGADOR DA VEZ: ${player}'; /*A cada movimento mostrará X se for X, e O se for O*/
}

  function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
    .map ((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

    for (pos of positions) {
      if (pos.every((item) => items.includes(item))) {
        alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
        init();
        return;
      }
    }

    if (selected.filter((item) => item).length === 9) { /*Verifica se os nove itens foram selecionados sem nenhuma combinação e assim avisar que deu empate*/
      alert("DEU EMPATE!");
      init();
      return;
    }
}