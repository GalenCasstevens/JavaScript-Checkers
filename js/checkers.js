var checkerPieces;
var movableTiles;
var emptyTiles;
var playerOnePieces;
var playerTwoPieces;
var playerTurn;

window.onload = init;

function init() {
  var board = [
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2]
              ];
  var boardSize = 8;
  playerTurn = 0;
  var gameWinner;
  var gameOver = false;
  var p1Move;
  var p2Move;
  checkerPieces = document.getElementsByClassName("checkerPiece");
  movableTiles = document.getElementsByClassName("black");
  playerOnePieces = document.getElementsByClassName("playerOnePiece");
  playerTwoPieces = document.getElementsByClassName("playerTwoPiece");
  emptyTiles = document.getElementsByClassName("emptyTile");

  $(".checkerPiece").click(function(e) {
    var piece = e.target;
    deselectPieces(piece);

    piece.classList.add('selectedPiece');

     e.stopPropagation();
  });

  // $(".checkerPiece").hover(function(e) {
  //   var piece = e.target;
  //
  //   piece.style.width = "84px";
  //   piece.style.height = "84px";
  //   piece.style.border = "3px solid #FFF";
  // });

  // for(var i = 0; i < checkerPieces.length; i++) {
  //   checkerPieces[i].onclick = selectPiece;
  //   // checkerPieces[i].onmouseover = hoverPiece;
  // }

  // for(var i = 0; i < checkerPieces.length; i++) {
  //   checkerPieces[i].onmouseover = hoverPiece;
  // }

  for(var i = 0; i < movableTiles.length; i++) {
    movableTiles[i].children[0].onclick = selectPiece;
  }

  for(var i = 0; i < movableTiles.length; i++) {
    movableTiles[i].children[0].onmouseover = hoverPiece;
  }

  for(var i = 0; i < movableTiles.length; i++) {
    movableTiles[i].onmouseout = unhoverPiece;
  }

  for(var i = 0; i < movableTiles.length; i++) {
    // movePiece is called whenever a black tile is clicked
    movableTiles[i].onclick = movePiece;
  }

  // displayBoard(board, boardSize);
  // console.log(checkerPieces[1]);

  // for(var i = 0; i < 10; i++) {
  //   emptyTiles = document.getElementsByClassName("emptyTile");
  //   console.log(emptyTiles.length);
  //   if(playerTurn % 2 === 0) {
  //     clickPiece();
  //     mouseOverPiece();
  //     mouseExitPiece();
  //     clickEmptyTile();
  //   } else {
  //
  //   }
  // }

  // while(!gameOver) {
  //   if(playerTurn % 2 === 0) {
  //
  //   } else {
  //
  //   }
  // }

  // while(!gameOver) {
  //   if(everyOther % 2 === 0) {
  //     p1Move = prompt("Please enter the coordinates of the piece you wish to move Player 1 (E.g. 02 for row 1, column 3): ");
  //   } else {
  //     p2Move = prompt("Please enter the coordinates of the piece you wish to move Player 2 (E.g. 02 for row 1, column 3): ");
  //   }
  //   everyOther++;
  //   gameOver = true;
  // }
}

// function clickPiece() {
//   for(var j = 0; j < playerOnePieces.length; j++) {
//     playerOnePieces[j].onclick = selectPiece;
//   }
// }
//
// function mouseOverPiece() {
//   for(var k = 0; k < playerOnePieces.length; k++) {
//     playerOnePieces[k].onmouseover = hoverPiece;
//   }
// }
//
// function mouseExitPiece() {
//   for(var m = 0; m < playerOnePieces.length; m++) {
//     playerOnePieces[m].onmouseout = unhoverPiece;
//   }
// }
//
// function clickEmptyTile() {
//   for(var n = 0; n < emptyTiles.length; n++) {
//     emptyTiles[n].onclick = movePiece;
//   }
// }

function hoverPiece(eventObj) {
  var piece = eventObj.target;

  if(piece.classList.contains("checkerPiece")) {
    piece.style.width = "84px";
    piece.style.height = "84px";
    piece.style.border = "3px solid #FFF";
  }
}

function unhoverPiece(eventObj) {
  var piece = eventObj.target;

  if(piece.classList.contains("checkerPiece")) {
    piece.style.width = "90px";
    piece.style.height = "90px";
    piece.style.border = "none";
  }
}

function selectPiece(eventObj) {
  var piece = eventObj.target;
  deselectPieces(piece);

  piece.classList.add('selectedPiece');
  // piece.style.width = "84px";
  // piece.style.height = "84px";

  // console.log(piece.classList.contains('selectedPiece'));
}

function deselectPieces(piece) {
  for(var i = 0; i < checkerPieces.length; i++) {
    if(checkerPieces[i].id != piece.id) {
      checkerPieces[i].classList.remove('selectedPiece');
      // checkerPieces[i].style.width = "90px";
      // checkerPieces[i].style.height = "90px";
    }
  }
}

function movePiece(eventObj) {
  var tile = eventObj.target.children[0]; // gets the div inside the clicked tile
  var selectedPiece = document.querySelector(".selectedPiece");

  // console.log(tile);

  if(selectedPiece != null && !tile.classList.contains("checkerPiece")) {
    // console.log(selectedPiece);
    if(selectedPiece.classList.contains("playerOnePiece")) {
      tile.classList.add("playerOnePiece", "checkerPiece");
      tile.parentNode.classList.remove("emptyTile");
      selectedPiece.classList.remove("checkerPiece", "playerOnePiece", "selectedPiece");
      // selectedPiece.style.cssText = null;
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      // emptyTiles = document.getElementsByClassName("emptyTile");
      // playerOnePieces = document.getElementsByClassName("playerOnePiece");
      // checkerPieces = document.getElementsByClassName("checkerPiece");
    } else if(selectedPiece.classList.contains("playerTwoPiece")) {
      tile.classList.add("playerTwoPiece", "checkerPiece");
      tile.parentNode.classList.remove("emptyTile");
      selectedPiece.classList.remove("checkerPiece", "playerTwoPiece", "selectedPiece");
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      // emptyTiles = document.getElementsByClassName("emptyTile");
    }
  }
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
