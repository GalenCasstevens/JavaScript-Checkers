window.onload = init;

function init() {
  var board = [
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2]
              ];
  var boardSize = 8;
  var everyOther = 0;
  var gameWinner;
  var gameOver = false;
  var p1Move;
  var p2Move;
  var checkerPieces = document.getElementsByClassName("checkerPiece");

  for(var i = 0; i < checkerPieces.length; i++) {
    checkerPieces[i].onclick = selectPiece;
  }
  // var playerOnePieces = document.getElementsByClassName("playerOnePiece");
  displayBoard(board, boardSize);
  console.log(checkerPieces[1]);

  while(!gameOver) {
    if(everyOther % 2 === 0) {
      p1Move = prompt("Please enter the coordinates of the piece you wish to move Player 1 (E.g. 02 for row 1, column 3): ");
    } else {
      p2Move = prompt("Please enter the coordinates of the piece you wish to move Player 2 (E.g. 02 for row 1, column 3): ");
    }
    everyOther++;
    gameOver = true;
  }
}

function selectPiece(eventObj) {
  var piece = eventObj.target;

  piece.classList.add('selectedPiece');
  piece.style.width = "84px";
  piece.style.height = "84px";
}

function displayBoard(board, boardSize) {
  var message = "";

  for(var i = 0; i < boardSize; i++) {
    for(var j = 0; j < boardSize; j++) {
      message += board[i][j] + " ";
    }
    message += "\n";
  }

  console.log(message);
}

function validateMove(playerMove) {
  return false;
}

function determineGameOver(board, boardSize) {
  var p1Counter = 0;
  var p2Counter = 0;

  for(var i = 0; i < boardSize; i++) {
    for(var j = 0; j < boardSize; j++) {
      if(board[i][j] === 1 || board[i][j] === "1K") {
        p1Counter++;
      } else if(board[i][j] === 2 || board[i][j] === "2K") {
        p2Counter++;
      }
    }
  }

  if(p1Counter === 0 || p2Counter === 0) {
    return true;
  } else return false;
}