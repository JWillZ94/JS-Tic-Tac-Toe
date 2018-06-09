var grid = document.querySelector('.grid');
var row = document.getElementsByClassName('row');
var cells = document.getElementsByClassName('cell');
var playerSelect = document.querySelector('.welcome');
var scoreboard = document.querySelector('.scoreboard');
var reset = document.getElementById('reset');
var winnerMsg = document.getElementById('winner-msg');
var playerWins = document.getElementById('player-wins');
var computerWins = document.getElementById('computer-wins');
var draws = document.getElementById('draws');

var player = "";
var computer = "";
var playerWinsNum = 0;
var computerWinsNum = 0;
var drawsNum = 0;
var gameOn = false;
var moves = 0;
var validMoves;
var playerMovesCopy;
var computerMovesCopy;
var nextMoveIdx;

var computerMovesNext;
var playerMovesNext;
var nextMove;
var compWin;
var compBlock;

var board = [

  0, 1, 2,
  3, 4, 5,
  6, 7, 8

];

var wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

playerWins.innerHTML = playerWinsNum++;
computerWins.innerHTML = computerWinsNum++;
draws.innerHTML = drawsNum++;

function chooseSide() {
  playerSelect.style.display = 'block';
}

// choose player
playerSelect.addEventListener('click', choosePlayer, false);

function choosePlayer(e) {
  if (e.target !== e.currentTarget && gameOn === false) {

    gameOn = true;

    if (e.target.innerHTML === "X") {
      player = playerChar.innerHTML = "X";
      computer = computerChar.innerHTML = computer = "O";
    }
    if (e.target.innerHTML === "O") {
      player = playerChar.innerHTML = player = "O";
      computer = computerChar.innerHTML = "X";
    }

    playerSelect.style.display = "none";
  }
}

// game board functionality
grid.addEventListener('click', updateBoard, false);

function updateBoard(e) {
  if (e.target.className === "cell" && gameOn === true) {
    if (e.target.innerHTML !== player && e.target.innerHTML !== computer) {

      e.target.innerHTML = player;

      syncBoard();

      moves++;

      playerMoves();

      validMoves();

      computerChoose();

      computerPlay();

      computerMoves();

      validMoves();

      declareWinner();

    }

  }
}

// sync board array with input placed inside DOM cells
function syncBoard() {
  for (var i = 0; i < board.length; i++) {
    if (cells[i].innerHTML !== "") {
      board[i] = cells[i].innerHTML;
    }
  }
}

// log indexes current of player moves
function playerMoves() {
  var idx = [];
  var i = -1;
  while ((i = board.indexOf(player, i + 1)) != -1) {
    idx.push(i);
  }
  return idx;
}

// return list of empty board spots
function validMoves() {
  return board.filter(function(spot) {
    return spot != "O" && spot != "X";
  });
}

function computerChoose() {

  for (var i = 0; i < validMoves().length; i++) {

    computerMovesNext = computerMoves().slice();
    playerMovesNext = playerMoves().slice();
    nextMove = validMoves()[i];
    computerMovesNext.push(nextMove);
    // console.log("computer nxt", computerMovesNext);
    playerMovesNext.push(nextMove);
    // console.log("player nxt", playerMovesNext);

    for (var j = 0; j < wins.length; j++) {
      if (wins[j].every(e => computerMovesNext.indexOf(e) > -1)) {
        compWin = nextMove;
      }
      if (wins[j].every(e => playerMovesNext.indexOf(e) > -1)) {
        compBlock = nextMove;
      }
    }

  }
}

// generate a computer move
function computerPlay() {

  moves++;

  var len = validMoves().length;
  var rand = validMoves()[Math.floor(Math.random() * len)];
  // console.log("random move", rand);

  // for (var i = 0; i < len; i++) {


  if (board[4] === 4) { // com starts middle
    setTimeout(() => {
      board[4] = cells[4].innerHTML = computer;
    }, 1000);
  }
  else if (board[4] === player && board[0] !== computer) { // if player chose middle, com starts top left
    setTimeout(() => {
      board[0] = cells[0].innerHTML = computer;
    }, 1000);
  }
  else if (board[compBlock] !== player && board[compBlock] !== computer && board[compBlock] !== undefined) { // chooses open spot
    setTimeout(() => {
      board[compBlock] = cells[compBlock].innerHTML = computer;
    }, 1000);
  }
  else if (board[rand] !== undefined) { // chooses random spot
    setTimeout(() => {
      board[rand] = cells[rand].innerHTML = computer;
    }, 1000);
  }

  // Minimax algorithm

  // function score(n, depth) {
  //   if (n == 1) {
  //     return 100 - depth;
  //   } else if (n == 0) {
  //     return -100 + depth;
  //   } else if (n == 2) {
  //     return 0;
  //   }
  // }
  //
  // function minimax(validMoves(), depth) {
  //   var bestMove = validMoves()[0];
  //   var bestScore = -1000;
  //   validMoves().forEach(move => {
  //     // makeMove()
  //     let score = min(validMoves(), depth++);
  //     if (score > bestScore) {
  //       bestMove = move;
  //       bestScore = score;
  //     }
  //   });
  //   return bestMove;
  // }
  //
  // function max(validMoves(), depth) {
  //   let bestScore = -1000;
  //   let bestMove;
  //   validMoves().forEach(move => {
  //     // makeMove()
  //     let score = min(validMoves(), depth++);
  //     if (score > bestScore) {
  //       bestScore = score;
  //       bestMove = move;
  //     }
  //   });
  //   return bestScore;
  // }
  //
  // function min(validMoves(), depth) {
  //   let bestScore = 1000;
  //   let bestMove;
  //   validMoves().forEach(move => {
  //     // makeMove()
  //     let score = max(validMoves(), depth++);
  //     if (score < bestScore) {
  //       bestScore = score;
  //       bestMove = move;
  //     }
  //   });
  //   return bestScore;
  // }

  // }
}

// log indexes current of computer moves
function computerMoves() {
  var idx = [];
  var i = -1;
  while ((i = board.indexOf(computer, i + 1)) != -1) {
    idx.push(i);
  }
  return idx;
}

// analyze the board to determine a winner
function winner(gameBoard, move) {

  if (
    (gameBoard[0] == move && gameBoard[1] == move && gameBoard[2] == move) ||
    (gameBoard[3] == move && gameBoard[4] == move && gameBoard[5] == move) ||
    (gameBoard[6] == move && gameBoard[7] == move && gameBoard[8] == move) ||
    (gameBoard[0] == move && gameBoard[3] == move && gameBoard[6] == move) ||
    (gameBoard[1] == move && gameBoard[4] == move && gameBoard[7] == move) ||
    (gameBoard[2] == move && gameBoard[5] == move && gameBoard[8] == move) ||
    (gameBoard[0] == move && gameBoard[4] == move && gameBoard[8] == move) ||
    (gameBoard[2] == move && gameBoard[4] == move && gameBoard[6] == move)
  ) {
    return true;
  } else {
    return false;
  }

}

// logic to decide who wins or if it's a draw
function declareWinner() {

  if (gameOn === true) {
    if (winner(board, player)) {
      winnerMsg.innerHTML = "Player wins!";
      gameOn = false;
      playerWins.innerHTML = playerWinsNum++;
    } else if (winner(board, computer)) {
      winnerMsg.innerHTML = "Computer wins!";
      gameOn = false;
      computerWins.innerHTML = computerWinsNum++;
    } else if (validMoves().length === 0) {
      winnerMsg.innerHTML = "It's a draw!";
      gameOn = false;
      draws.innerHTML = drawsNum++;
    }
  }
}

// reset game
reset.addEventListener('click', function() {

  console.clear();

  board = [

    0, 1, 2,
    3, 4, 5,
    6, 7, 8

  ];

  for (let cell of cells) {
    cell.innerHTML = "";
  }

  winnerMsg.innerHTML = "";

  gameOn = false;

  chooseSide();

}, false);
