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

      syncBoard();  // If a cell isnt blank, update it on the board

      moves++;  // Add to total amount of moves

      playerMoves(); // keeps track of the player's latest move

      validMoves(); // returns arr of the board w/ empty spots

      computerChoose(); // determines what the comp can choose next?

      computerPlay(); // computer makes a move depending on situation

      computerMoves(); // keeps track of the computer's latest move

      validMoves(); // returns arr of the board w/ empty spots

      declareWinner(); // declares a winner based on the winner function

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

  if (board[4] === 4) { // com starts middle
    setTimeout(() => {
      board[4] = cells[4].innerHTML = computer;
    }, 1000);
  }
  else if (board[4] === player && board[0] !== computer) { // if player chose middle, com starts top left
    setTimeout(() => {
      board[0] = cells[0].innerHTML = computer;
    }, 1000);
  } else if (board[rand] !== undefined) { // chooses random spot
    setTimeout(() => {
      // board[rand] = cells[rand].innerHTML = computer;
      minimax(validMoves(), computer).index.innerHTML = computer;
    }, 1000);
  }

  // Minimax algorithm

  function minimax(board, player) {
    var moves = [];
    for (var i = 0; i < board.length; i++) {
      var move = {};
      move.index = board[i];
      board[i] = player;
      if (player == computer) {
        var result = minimax(validMoves(), player);
        move.score = result.score;
      } else {
        var result = minimax(validMoves(), computer);
        move.score = result.score;
      }
      board[i] = move.index;
      moves.push(move);
    }

    var bestMove;
    if (player === computer) {
      var bestScore = -1000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 1000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

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
      return { score: -10 };
    } else if (winner(board, computer)) {
      winnerMsg.innerHTML = "Computer wins!";
      gameOn = false;
      computerWins.innerHTML = computerWinsNum++;
      return { score: 10 };
    } else if (validMoves().length === 0) {
      winnerMsg.innerHTML = "It's a draw!";
      gameOn = false;
      draws.innerHTML = drawsNum++;
      return { score: 0 };
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
