// Assignment ==========================================

let choose = document.getElementById('choose');
let player = null;
let opponent = null;
let xBtn = document.getElementById('x-btn');
let oBtn = document.getElementById('o-btn');
let board = document.getElementById('board');
let squares = board.children;


// JavaScript =====================================

function chooseSide() {
  choose.style.display = 'block';
}

xBtn.onclick = () => {
  choose.style.display = 'none';
  player = 'x';
  opponent = 'o';
}

oBtn.onclick = () => {
  choose.style.display = 'none';
  player = 'o';
  opponent = 'x';
}

for (let i = 0; i < squares.length; i++) {

  console.log(squares.length);

  var clicked = [];

  squares[i].addEventListener('click', mark);

  function mark() {

    console.log(clicked);
    console.log(squares.length);

    if (squares[i].innerHTML === '') {

      if (player === 'x') {
        squares[i].innerHTML = '<p class="mark">X</p>';
        clicked.push(i);
      } else {
        squares[i].innerHTML = '<p class="mark">O</p>';
        clicked.push(i);
      }

      if (opponent === 'x') {
        setTimeout(() => {
          if (squares[i].innerHTML = '<p class="mark">X</p>' || '<p class="mark">O</p>') {
            squares[Math.floor(Math.random() * Math.floor(i))].innerHTML = '<p class="mark">X</p>';
          }
        }, 1000);
        clicked.push(i);
      } else {
        setTimeout(() => {
          if (squares[i].innerHTML = '<p class="mark">X</p>' || '<p class="mark">O</p>') {
            squares[Math.floor(Math.random() * Math.floor(i))].innerHTML = '<p class="mark">O</p>';
          }
        }, 1000);
        clicked.push(i);
      }

    }


  }

}
