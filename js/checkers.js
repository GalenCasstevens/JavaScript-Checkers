var checkerPieces;
var movableTiles;
var emptyTiles;
var playerOnePieces;
var playerTwoPieces;
var playerTurn;
var counter = 0;
var potentialJumpPiece;
var jumpedCounter;
var potential;

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
  jumpedCounter = 0;
  var gameWinner;
  var gameOver = false;
  var p1Move;
  var p2Move;
  checkerPieces = document.getElementsByClassName("checkerPiece");
  movableTiles = document.getElementsByClassName("black");
  playerOnePieces = document.getElementsByClassName("playerOnePiece");
  playerTwoPieces = document.getElementsByClassName("playerTwoPiece");
  emptyTiles = document.getElementsByClassName("emptyTile");

  // $(".checkerPiece").click(function(e) {
  //   var piece = e.target;
  //   deselectPieces(piece);
  //
  //   piece.classList.add('selectedPiece');
  //
  //    e.stopPropagation();
  // });
  //
  // $(".checkerPiece").hover(function(e) {
  //   var piece = e.target;
  //
  //   piece.style.width = "84px";
  //   piece.style.height = "84px";
  //   piece.style.border = "3px solid #FFF";
  // });
  //
  // for(var i = 0; i < checkerPieces.length; i++) {
  //   checkerPieces[i].onclick = selectPiece;
  //   // checkerPieces[i].onmouseover = hoverPiece;
  // }

  // for(var i = 0; i < checkerPieces.length; i++) {
  //   checkerPieces[i].onmouseover = hoverPiece;
  // }

  for(var i = 0; i < movableTiles.length; i++) {
    movableTiles[i].children[0].onclick = selectPiece;
    // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
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


  // while(!gameOver) {
  //   if(playerTurn % 2  === 0) {
  //     for(var i = 0; i < movableTiles.length; i++) {
  //       if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
  //           movableTiles[i].children[0].onclick = selectPiece;
  //           movableTiles[i].children[0].onmouseover = hoverPiece;
  //           movableTiles[i].onmouseout = unhoverPiece;
  //           movableTiles[i].onclick = movePiece;
  //       }
  //     }
  //   } else if(playerTurn % 2  === 1) {
  //     for(var i = 0; i < movableTiles.length; i++) {
  //       if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
  //           movableTiles[i].children[0].onclick = selectPiece;
  //           movableTiles[i].children[0].onmouseover = hoverPiece;
  //           movableTiles[i].onmouseout = unhoverPiece;
  //           movableTiles[i].onclick = movePiece;
  //       }
  //     }
  //   }
  //   gameOver === true;
  // }

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
  } else if(piece.parentNode.classList.contains("checkerPiece")) {
    piece.parentNode.style.width = "84px";
    piece.parentNode.style.height = "84px";
    piece.parentNode.style.border = "3px solid #FFF";
  }
}

function unhoverPiece(eventObj) {
  var piece = eventObj.target;

  if(piece.classList.contains("checkerPiece")) {
    piece.style.width = "90px";
    piece.style.height = "90px";
    piece.style.border = "none";
  } else if(piece.parentNode.classList.contains("checkerPiece")) {
    piece.parentNode.style.width = "90px";
    piece.parentNode.style.height = "90px";
    piece.parentNode.style.border = "none";
  }
}

function selectPiece(eventObj) {
  var piece = eventObj.target;

  console.log("canJump?: " + canJump(piece));

  if(piece.parentNode.classList.contains("checkerPiece")) {
    piece.parentNode.classList.add('selectedPiece');
    deselectPieces(piece.parentNode);
  } else {
    piece.classList.add('selectedPiece');
    deselectPieces(piece);
  }

  // deselectPieces(piece);

  // piece.classList.add('selectedPiece');
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
  var tile = event.target;
  var tilePiece = eventObj.target.children[0]; // gets the div inside the clicked tile
  var selectedPiece = document.querySelector(".selectedPiece");
  potentialJumpId = ((parseInt(selectedPiece.id.charAt(0)) + parseInt(tilePiece.id.charAt(0))) / 2).toString() + ((parseInt(selectedPiece.id.charAt(1)) + parseInt(tilePiece.id.charAt(1))) / 2).toString();

  for(var i = 0; i < movableTiles.length; i++) {
    if(movableTiles[i].children[0].id == potentialJumpId) {
      potentialJumpPiece = movableTiles[i].children[0];
    }
  }
  console.log(potentialJumpPiece);
  // potentialJumpPiece = document.getElementById(potentialJumpId);
  // potentialJumpPiece = document.querySelector("[id=" + CSS.escape(potentialJumpId) + "]");

  // console.log(pote);
  // console.log(typeof selectedPiece.id);
  // console.log(typeof tilePiece.id.charAt(0));
  // console.log("id=potentialJumpPiece");
  // console.log((parseInt(selectedPiece.id.charAt(0)) + parseInt(tilePiece.id.charAt(0))) / 2);
  // console.log((parseInt(selectedPiece.id.charAt(1)) + parseInt(tilePiece.id.charAt(1))) / 2);

  // console.log(tile);

  if(selectedPiece != null && !selectedPiece.classList.contains("king") && !tilePiece.classList.contains("checkerPiece")) {
    // console.log(selectedPiece);
    // console.log("Target tile row: " + tilePiece.id.charAt(0));
    // console.log("Current tile row: " + selectedPiece.id.charAt(0));
    // console.log("Target tile column: " + tilePiece.id.charAt(1));
    // console.log("Current tile column " + selectedPiece.id.charAt(1));
    // console.log(tilePiece.id.charAt(0) - selectedPiece.id.charAt(0));
    // console.log(playerOnePieces);
    if(selectedPiece.classList.contains("playerOnePiece") && (tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 1) && ((tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 1) || (tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -1))) {
      if(tilePiece.id.charAt(0) == 7 && !selectedPiece.classList.contains("king")) {
        tilePiece.innerHTML += '<i class="fas fa-crown p1Crown"></i>';
        tilePiece.classList.add("king");
      }
      tilePiece.classList.add("playerOnePiece", "checkerPiece");
      tilePiece.parentNode.classList.remove("emptyTile");
      selectedPiece.classList.remove("checkerPiece", "playerOnePiece", "selectedPiece");
      // selectedPiece.style.cssText = null;
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      playerTurn++;
      for(var i = 0; i < movableTiles.length; i++) {
        if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
            // movableTiles[i].onclick = null;
        } else if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
          movableTiles[i].children[0].onclick = selectPiece;
          movableTiles[i].children[0].onmouseover = hoverPiece;
          movableTiles[i].onmouseout = unhoverPiece;
          // movableTiles[i].onclick = movePiece;
        }
        // movableTiles[i].children[0].onclick = selectPiece;
        // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
        // /
      }
      // emptyTiles = document.getElementsByClassName("emptyTile");
      // playerOnePieces = document.getElementsByClassName("playerOnePiece");
      // checkerPieces = document.getElementsByClassName("checkerPiece");
    } else if(selectedPiece.classList.contains("playerOnePiece") && (tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 2) && potentialJumpPiece.classList.contains("playerTwoPiece") && ((tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 2) || (tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -2))) {
      if(tilePiece.id.charAt(0) == 7 && !selectedPiece.classList.contains("king")) {
        tilePiece.innerHTML += '<i class="fas fa-crown p1Crown"></i>';
        tilePiece.classList.add("king");
      }
      tilePiece.classList.add("playerOnePiece", "checkerPiece");
      tilePiece.parentNode.classList.remove("emptyTile");
      selectedPiece.classList.remove("checkerPiece", "playerOnePiece", "selectedPiece");
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      // potentialJumpPiece.classList.remove("checkerPiece", "playerOnePiece")
      // potentialJumpPiece.classList.remove("checkerPiece", "playerOnePiece");
      // potentialJumpPiece = null;
      // potentialJumpPiece.removeAttribute("style");
      // potentialJumpPiece.parentNode.classList.add("emptyTile");
      playerTurn++;
      jumpedCounter++;

      console.log("tilePiece id: " + tilePiece.id);
      if(canJump(tilePiece)) {
        for(var i = 0; i < movableTiles.length; i++) {
          console.log("movableTiles " + i + ": " + movableTiles[i].children[0].id);
          if(movableTiles[i].children[0].id != tilePiece.id) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
          } else {
            movableTiles[i].children[0].onclick = selectPiece;
            movableTiles[i].children[0].onmouseover = hoverPiece;
            movableTiles[i].onmouseout = unhoverPiece;
          }
           if(movableTiles[i].children[0].id == potentialJumpId) {
            movableTiles[i].children[0].classList.remove("checkerPiece", "playerTwoPiece");
            movableTiles[i].children[0].removeAttribute("style");
            movableTiles[i].classList.add("emptyTile");
          }
        }
      } else {
        for(var i = 0; i < movableTiles.length; i++) {
          if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
            // movableTiles[i].onclick = null;
          } else if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
            movableTiles[i].children[0].onclick = selectPiece;
            movableTiles[i].children[0].onmouseover = hoverPiece;
            movableTiles[i].onmouseout = unhoverPiece;
            // movableTiles[i].onclick = movePiece;
          }
          if(movableTiles[i].children[0].id == potentialJumpId) {
            movableTiles[i].children[0].classList.remove("checkerPiece", "playerTwoPiece");
            movableTiles[i].children[0].removeAttribute("style");
            movableTiles[i].classList.add("emptyTile");
          }
          // movableTiles[i].children[0].onclick = selectPiece;
          // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
          // /
        }
      }
    } else if(selectedPiece.classList.contains("playerTwoPiece") && (selectedPiece.id.charAt(0) - tilePiece.id.charAt(0) == 1) && ((selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == 1) || (selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == -1))) {
      if(tilePiece.id.charAt(0) == 0 && !selectedPiece.classList.contains("king")) {
        tilePiece.innerHTML += '<i class="fas fa-crown p2Crown"></i>';
        tilePiece.classList.add("king");
      }
      tilePiece.classList.add("playerTwoPiece", "checkerPiece");
      tilePiece.parentNode.classList.remove("emptyTile");
      selectedPiece.classList.remove("checkerPiece", "playerTwoPiece", "selectedPiece");
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      playerTurn++;

      for(var i = 0; i < movableTiles.length; i++) {
        if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
          movableTiles[i].children[0].onclick = null;
          movableTiles[i].children[0].onmouseover = null;
          movableTiles[i].onmouseout = null;
          // movableTiles[i].onclick = null;
        } else if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
          movableTiles[i].children[0].onclick = selectPiece;
          movableTiles[i].children[0].onmouseover = hoverPiece;
          movableTiles[i].onmouseout = unhoverPiece;
          // movableTiles[i].onclick = movePiece;
        }
        // movableTiles[i].children[0].onclick = selectPiece;
        // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
        // /
      }
      // emptyTiles = document.getElementsByClassName("emptyTile");
    } else if(selectedPiece.classList.contains("playerTwoPiece") && (selectedPiece.id.charAt(0) - tilePiece.id.charAt(0) == 2) && potentialJumpPiece.classList.contains("playerOnePiece") && ((selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == 2) || (selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == -2))) {
      if(tilePiece.id.charAt(0) == 0 && !selectedPiece.classList.contains("king")) {
        tilePiece.innerHTML += '<i class="fas fa-crown p2Crown"></i>';
        tilePiece.classList.add("king");
      }
      tilePiece.classList.add("playerTwoPiece", "checkerPiece");
      tilePiece.parentNode.classList.remove("emptyTile");
      selectedPiece.classList.remove("checkerPiece", "playerTwoPiece", "selectedPiece");
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      // potentialJumpPiece.classList.remove("checkerPiece", "playerOnePiece")
      // potentialJumpPiece.classList.remove("checkerPiece", "playerOnePiece");
      // potentialJumpPiece = null;
      // potentialJumpPiece.removeAttribute("style");
      // potentialJumpPiece.parentNode.classList.add("emptyTile");
      playerTurn++;
      jumpedCounter++;

      if(canJump(tilePiece)) {
        for(var i = 0; i < movableTiles.length; i++) {
          if(movableTiles[i].children[0].id != tilePiece.id) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
          } else {
            movableTiles[i].children[0].onclick = selectPiece;
            movableTiles[i].children[0].onmouseover = hoverPiece;
            movableTiles[i].onmouseout = unhoverPiece;
          }
          if(movableTiles[i].children[0].id == potentialJumpId) {
            movableTiles[i].children[0].classList.remove("checkerPiece", "playerOnePiece");
            movableTiles[i].children[0].removeAttribute("style");
            movableTiles[i].classList.add("emptyTile");
          }
        }
      } else {
        for(var i = 0; i < movableTiles.length; i++) {
          if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
            // movableTiles[i].onclick = null;
          } else if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
            movableTiles[i].children[0].onclick = selectPiece;
            movableTiles[i].children[0].onmouseover = hoverPiece;
            movableTiles[i].onmouseout = unhoverPiece;
            // movableTiles[i].onclick = movePiece;
          }
          if(movableTiles[i].children[0].id == potentialJumpId) {
            movableTiles[i].children[0].classList.remove("checkerPiece", "playerOnePiece");
            movableTiles[i].children[0].removeAttribute("style");
            movableTiles[i].classList.add("emptyTile");
          }
          // movableTiles[i].children[0].onclick = selectPiece;
          // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
          // /
        }
      }
    }
  } else if(selectedPiece != null && selectedPiece.classList.contains("king") && !tilePiece.classList.contains("checkerPiece")) {
    if(selectedPiece.classList.contains("playerOnePiece") && (tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 1 || tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == -1) && ((tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 1) || (tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -1))) {
      tilePiece.classList.add("playerOnePiece", "checkerPiece", "king");
      tilePiece.parentNode.classList.remove("emptyTile");
      tilePiece.innerHTML = selectedPiece.innerHTML;
      selectedPiece.classList.remove("checkerPiece", "playerOnePiece", "selectedPiece", "king");
      // selectedPiece.style.cssText = null;
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      selectedPiece.innerHTML = null;
      playerTurn++;
      for(var i = 0; i < movableTiles.length; i++) {
        if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
            // movableTiles[i].onclick = null;
        } else if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
          movableTiles[i].children[0].onclick = selectPiece;
          movableTiles[i].children[0].onmouseover = hoverPiece;
          movableTiles[i].onmouseout = unhoverPiece;
          // movableTiles[i].onclick = movePiece;
        }
        // movableTiles[i].children[0].onclick = selectPiece;
        // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
        // /
      }
    } else if(selectedPiece.classList.contains("playerTwoPiece") && (tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 1 || tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == -1) && ((tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 1) || (tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -1))) {
      tilePiece.classList.add("playerTwoPiece", "checkerPiece", "king");
      tilePiece.parentNode.classList.remove("emptyTile");
      tilePiece.innerHTML = selectedPiece.innerHTML;
      selectedPiece.classList.remove("checkerPiece", "playerTwoPiece", "selectedPiece", "king");
      // selectedPiece.style.cssText = null;
      selectedPiece.removeAttribute("style");
      selectedPiece.parentNode.classList.add("emptyTile");
      selectedPiece.innerHTML = null;
      playerTurn++;
      for(var i = 0; i < movableTiles.length; i++) {
        if(movableTiles[i].children[0].classList.contains("playerTwoPiece")) {
            movableTiles[i].children[0].onclick = null;
            movableTiles[i].children[0].onmouseover = null;
            movableTiles[i].onmouseout = null;
            // movableTiles[i].onclick = null;
        } else if(movableTiles[i].children[0].classList.contains("playerOnePiece")) {
          movableTiles[i].children[0].onclick = selectPiece;
          movableTiles[i].children[0].onmouseover = hoverPiece;
          movableTiles[i].onmouseout = unhoverPiece;
          // movableTiles[i].onclick = movePiece;
        }
        // movableTiles[i].children[0].onclick = selectPiece;
        // console.log(movableTiles[i].children[0].classList.contains("playerOnePiece"));
        // /
      }
    }
  }
  console.log("movePiece iterated");
}

function canJump(piece) {
    var canJump = false;

    if(piece.classList.contains("king") && piece.classList.contains("playerOnePiece")) {

    } else if(piece.classList.contains("playerOnePiece")) {
      for(var i = 0; i < movableTiles.length; i++) {
        if(movableTiles[i].children[0].id == piece.id && movableTiles[i].children[0].id % 2 == 1 && i <= 23) {
          if(movableTiles[i].children[0].id.charAt(1) == 7 && movableTiles[i + 4].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 7].classList.contains("emptyTile")) {
            canJump = true;
            console.log("p1 working");
          } else if(movableTiles[i].children[0].id.charAt(1) == 1 && movableTiles[i + 5].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 9].classList.contains("emptyTile")) {
            canJump = true;
            console.log("p2 working");
          } else if(movableTiles[i].children[0].id.charAt(1) != 7 && movableTiles[i].children[0].id.charAt(1) != 1 && ((movableTiles[i + 4].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 7].classList.contains("emptyTile")) || (movableTiles[i + 5].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 9].classList.contains("emptyTile")))) {
            console.log("p3 working");
            canJump = true;
          }
        } else if(movableTiles[i].children[0].id == piece.id && movableTiles[i].children[0].id % 2 == 0 && i <= 23) {
          if(movableTiles[i].children[0].id.charAt(1) == 0 && movableTiles[i + 4].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 7].classList.contains("emptyTile")) {
            canJump = true;
            console.log("p4 working");
          } else if(movableTiles[i].children[0].id.charAt(1) == 6 && movableTiles[i + 3].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 7].classList.contains("emptyTile")) {
            canJump = true;
            console.log("p5 working");
          } else if(movableTiles[i].children[0].id.charAt(1) != 0 && movableTiles[i].children[0].id.charAt(1) != 6 && ((movableTiles[i + 4].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 9].classList.contains("emptyTile")) || (movableTiles[i + 3].children[0].classList.contains("playerTwoPiece") && movableTiles[i + 7].classList.contains("emptyTile")))) {
            canJump = true;
            console.log("p6 working");
          }
        }
      }
    } else if(piece.classList.contains("playerTwoPiece")) {
      for(var i = 0; i < movableTiles.length; i++) {
        if(movableTiles[i].children[0].id == piece.id && movableTiles[i].children[0].id % 2 == 0 && i >= 8) {
          if(movableTiles[i].children[0].id.charAt(1) == 0 && movableTiles[i - 4].children[0].classList.contains("playerOnePiece") && movableTiles[i - 7].classList.contains("emptyTile")) {
            canJump = true;
          } else if(movableTiles[i].children[0].id.charAt(1) == 6 && movableTiles[i - 5].children[0].classList.contains("playerOnePiece") && movableTiles[i - 9].classList.contains("emptyTile")) {
            canJump = true;
          } else if(movableTiles[i].children[0].id.charAt(1) != 0 && movableTiles[i].children[0].id.charAt(1) != 6 && ((movableTiles[i - 4].children[0].classList.contains("playerOnePiece") && movableTiles[i - 7].classList.contains("emptyTile")) || (movableTiles[i - 5].children[0].classList.contains("playerOnePiece") && movableTiles[i - 9].classList.contains("emptyTile")))) {
            canJump = true;
          }
        } else if(movableTiles[i].children[0].id == piece.id && movableTiles[i].children[0].id % 2 == 1 && i >= 8) {
          if(movableTiles[i].children[0].id.charAt(1) == 1 && movableTiles[i - 3].children[0].classList.contains("playerOnePiece") && movableTiles[i - 7].classList.contains("emptyTile")) {
            canJump = true;
          } else if(movableTiles[i].children[0].id.charAt(1) == 7 && movableTiles[i - 4].children[0].classList.contains("playerOnePiece") && movableTiles[i - 9].classList.contains("emptyTile")) {
            canJump = true;
          } else if(movableTiles[i].children[0].id.charAt(1) != 1 && movableTiles[i].children[0].id.charAt(1) != 7 && ((movableTiles[i - 3].children[0].classList.contains("playerOnePiece") && movableTiles[i - 7].classList.contains("emptyTile")) || (movableTiles[i - 4].children[0].classList.contains("playerOnePiece") && movableTiles[i - 9].classList.contains("emptyTile")))) {
            canJump = true;
          }
        }
      }
    }

    return canJump;
}

// function displayBoard(board, boardSize) {
//   var message = "";
//
//   for(var i = 0; i < boardSize; i++) {
//     for(var j = 0; j < boardSize; j++) {
//       message += board[i][j] + " ";
//     }
//     message += "\n";
//   }
//
//   console.log(message);
// }

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
