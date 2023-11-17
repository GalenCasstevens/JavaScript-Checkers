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
	playerTurn = 0;
	jumpedCounter = 0;
	checkerPieces = document.getElementsByClassName('checkerPiece');
	movableTiles = document.getElementsByClassName('black');
	playerOnePieces = document.getElementsByClassName('playerOnePiece');
	playerTwoPieces = document.getElementsByClassName('playerTwoPiece');
	emptyTiles = document.getElementsByClassName('emptyTile');

	for (var i = 0; i < movableTiles.length; i++) {
		movableTiles[i].children[0].onclick = selectPiece;
	}
	for (var i = 0; i < movableTiles.length; i++) {
		movableTiles[i].children[0].onmouseover = hoverPiece;
	}

	for (var i = 0; i < movableTiles.length; i++) {
		movableTiles[i].onmouseout = unhoverPiece;
	}

	for (var i = 0; i < movableTiles.length; i++) {
		movableTiles[i].onclick = movePiece;
	}

	function hoverPiece(eventObj) {
		var piece = eventObj.target;

		if (piece.classList.contains('checkerPiece')) {
			piece.style.width = '84px';
			piece.style.height = '84px';
			piece.style.border = '3px solid #FFF';
		} else if (piece.parentNode.classList.contains('checkerPiece')) {
			piece.parentNode.style.width = '84px';
			piece.parentNode.style.height = '84px';
			piece.parentNode.style.border = '3px solid #FFF';
		}
	}

	function unhoverPiece(eventObj) {
		var piece = eventObj.target;

		if (piece.classList.contains('checkerPiece')) {
			piece.style.width = '90px';
			piece.style.height = '90px';
			piece.style.border = 'none';
		} else if (piece.parentNode.classList.contains('checkerPiece')) {
			piece.parentNode.style.width = '90px';
			piece.parentNode.style.height = '90px';
			piece.parentNode.style.border = 'none';
		}
	}

	function selectPiece(eventObj) {
		var piece = eventObj.target;

		if (piece.parentNode.classList.contains('checkerPiece')) {
			piece.parentNode.classList.add('selectedPiece');
			deselectPieces(piece.parentNode);
		} else {
			piece.classList.add('selectedPiece');
			deselectPieces(piece);
		}
	}

	function deselectPieces(piece) {
		for (var i = 0; i < checkerPieces.length; i++) {
			if (checkerPieces[i].id != piece.id) {
				checkerPieces[i].classList.remove('selectedPiece');
			}
		}
	}

	function movePiece(eventObj) {
		var tile = event.target;
		var tilePiece = eventObj.target.children[0];
		var selectedPiece = document.querySelector('.selectedPiece');
		potentialJumpId =
			(
				(parseInt(selectedPiece.id.charAt(0)) +
					parseInt(tilePiece.id.charAt(0))) /
				2
			).toString() +
			(
				(parseInt(selectedPiece.id.charAt(1)) +
					parseInt(tilePiece.id.charAt(1))) /
				2
			).toString();

		for (var i = 0; i < movableTiles.length; i++) {
			if (movableTiles[i].children[0].id == potentialJumpId) {
				potentialJumpPiece = movableTiles[i].children[0];
			}
		}
		if (
			selectedPiece != null &&
			!selectedPiece.classList.contains('king') &&
			!tilePiece.classList.contains('checkerPiece')
		) {
			if (
				selectedPiece.classList.contains('playerOnePiece') &&
				tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 1 &&
				(tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 1 ||
					tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -1)
			) {
				if (canJump(selectedPiece)) {
				} else {
					if (
						tilePiece.id.charAt(0) == 7 &&
						!selectedPiece.classList.contains('king')
					) {
						tilePiece.innerHTML += '<i class="fas fa-crown p1Crown"></i>';
						tilePiece.classList.add('king');
					}
					tilePiece.classList.add('playerOnePiece', 'checkerPiece');
					tilePiece.parentNode.classList.remove('emptyTile');
					selectedPiece.classList.remove(
						'checkerPiece',
						'playerOnePiece',
						'selectedPiece'
					);
					// selectedPiece.style.cssText = null;
					selectedPiece.removeAttribute('style');
					selectedPiece.parentNode.classList.add('emptyTile');
					playerTurn++;
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			} else if (
				selectedPiece.classList.contains('playerOnePiece') &&
				tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 2 &&
				potentialJumpPiece.classList.contains('playerTwoPiece') &&
				(tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 2 ||
					tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -2)
			) {
				if (
					tilePiece.id.charAt(0) == 7 &&
					!selectedPiece.classList.contains('king')
				) {
					tilePiece.innerHTML += '<i class="fas fa-crown p1Crown"></i>';
					tilePiece.classList.add('king');
				}
				tilePiece.classList.add('playerOnePiece', 'checkerPiece');
				tilePiece.parentNode.classList.remove('emptyTile');
				selectedPiece.classList.remove(
					'checkerPiece',
					'playerOnePiece',
					'selectedPiece'
				);
				selectedPiece.removeAttribute('style');
				selectedPiece.parentNode.classList.add('emptyTile');
				playerTurn++;
				jumpedCounter++;
				for (var i = 0; i < movableTiles.length; i++) {
					if (movableTiles[i].children[0].id == potentialJumpId) {
						movableTiles[i].children[0].classList.remove(
							'checkerPiece',
							'playerTwoPiece',
							'king'
						);
						movableTiles[i].children[0].removeAttribute('style');
						movableTiles[i].children[0].innerHTML = null;
						movableTiles[i].classList.add('emptyTile');
					}
				}
				console.log('tilePiece id: ' + tilePiece.id);
				if (canJump(tilePiece)) {
					for (var i = 0; i < movableTiles.length; i++) {
						// console.log("movableTiles " + i + ": " + movableTiles[i].children[0].id);
						if (movableTiles[i].children[0].id != tilePiece.id) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				} else {
					console.log('not iterating');
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			} else if (
				selectedPiece.classList.contains('playerTwoPiece') &&
				selectedPiece.id.charAt(0) - tilePiece.id.charAt(0) == 1 &&
				(selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == 1 ||
					selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == -1)
			) {
				if (canJump(selectedPiece)) {
				} else {
					if (
						tilePiece.id.charAt(0) == 0 &&
						!selectedPiece.classList.contains('king')
					) {
						tilePiece.innerHTML += '<i class="fas fa-crown p2Crown"></i>';
						tilePiece.classList.add('king');
					}
					tilePiece.classList.add('playerTwoPiece', 'checkerPiece');
					tilePiece.parentNode.classList.remove('emptyTile');
					selectedPiece.classList.remove(
						'checkerPiece',
						'playerTwoPiece',
						'selectedPiece'
					);
					selectedPiece.removeAttribute('style');
					selectedPiece.parentNode.classList.add('emptyTile');
					playerTurn++;

					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			} else if (
				selectedPiece.classList.contains('playerTwoPiece') &&
				selectedPiece.id.charAt(0) - tilePiece.id.charAt(0) == 2 &&
				potentialJumpPiece.classList.contains('playerOnePiece') &&
				(selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == 2 ||
					selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == -2)
			) {
				if (
					tilePiece.id.charAt(0) == 0 &&
					!selectedPiece.classList.contains('king')
				) {
					tilePiece.innerHTML += '<i class="fas fa-crown p2Crown"></i>';
					tilePiece.classList.add('king');
				}
				tilePiece.classList.add('playerTwoPiece', 'checkerPiece');
				tilePiece.parentNode.classList.remove('emptyTile');
				selectedPiece.classList.remove(
					'checkerPiece',
					'playerTwoPiece',
					'selectedPiece'
				);
				selectedPiece.removeAttribute('style');
				selectedPiece.parentNode.classList.add('emptyTile');
				playerTurn++;
				jumpedCounter++;
				for (var i = 0; i < movableTiles.length; i++) {
					if (movableTiles[i].children[0].id == potentialJumpId) {
						movableTiles[i].children[0].classList.remove(
							'checkerPiece',
							'playerOnePiece',
							'king'
						);
						movableTiles[i].children[0].removeAttribute('style');
						movableTiles[i].children[0].innerHTML = null;
						movableTiles[i].classList.add('emptyTile');
					}
				}
				if (canJump(tilePiece)) {
					for (var i = 0; i < movableTiles.length; i++) {
						if (movableTiles[i].children[0].id != tilePiece.id) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				} else {
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
							// movableTiles[i].onclick = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			}
		} else if (
			selectedPiece != null &&
			selectedPiece.classList.contains('king') &&
			!tilePiece.classList.contains('checkerPiece')
		) {
			if (
				selectedPiece.classList.contains('playerOnePiece') &&
				(tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 1 ||
					tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == -1) &&
				(tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 1 ||
					tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -1)
			) {
				if (canJump(selectedPiece)) {
				} else {
					tilePiece.classList.add('playerOnePiece', 'checkerPiece', 'king');
					tilePiece.parentNode.classList.remove('emptyTile');
					tilePiece.innerHTML = selectedPiece.innerHTML;
					selectedPiece.classList.remove(
						'checkerPiece',
						'playerOnePiece',
						'selectedPiece',
						'king'
					);
					selectedPiece.removeAttribute('style');
					selectedPiece.parentNode.classList.add('emptyTile');
					selectedPiece.innerHTML = null;
					playerTurn++;
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			} else if (
				selectedPiece.classList.contains('playerOnePiece') &&
				(tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 2 ||
					tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == -2) &&
				potentialJumpPiece.classList.contains('playerTwoPiece') &&
				(tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 2 ||
					tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -2)
			) {
				tilePiece.classList.add('playerOnePiece', 'checkerPiece', 'king');
				tilePiece.parentNode.classList.remove('emptyTile');
				tilePiece.innerHTML = selectedPiece.innerHTML;
				selectedPiece.classList.remove(
					'checkerPiece',
					'playerOnePiece',
					'selectedPiece',
					'king'
				);
				selectedPiece.removeAttribute('style');
				selectedPiece.parentNode.classList.add('emptyTile');
				selectedPiece.innerHTML = null;
				playerTurn++;
				jumpedCounter++;
				console.log('tilePiece: ' + tilePiece);
				console.log('what i wanna see canjumptilepiece: ' + canJump(tilePiece));
				for (var i = 0; i < movableTiles.length; i++) {
					if (movableTiles[i].children[0].id == potentialJumpId) {
						movableTiles[i].children[0].classList.remove(
							'checkerPiece',
							'playerTwoPiece',
							'king'
						);
						movableTiles[i].children[0].removeAttribute('style');
						movableTiles[i].children[0].innerHTML = null;
						movableTiles[i].classList.add('emptyTile');
					}
				}
				if (canJump(tilePiece)) {
					for (var i = 0; i < movableTiles.length; i++) {
						if (movableTiles[i].children[0].id != tilePiece.id) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				} else {
					console.log('king not iterating');
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			} else if (
				selectedPiece.classList.contains('playerTwoPiece') &&
				(tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == 1 ||
					tilePiece.id.charAt(0) - selectedPiece.id.charAt(0) == -1) &&
				(tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == 1 ||
					tilePiece.id.charAt(1) - selectedPiece.id.charAt(1) == -1)
			) {
				if (canJump(selectedPiece)) {
				} else {
					tilePiece.classList.add('playerTwoPiece', 'checkerPiece', 'king');
					tilePiece.parentNode.classList.remove('emptyTile');
					tilePiece.innerHTML = selectedPiece.innerHTML;
					selectedPiece.classList.remove(
						'checkerPiece',
						'playerTwoPiece',
						'selectedPiece',
						'king'
					);
					selectedPiece.removeAttribute('style');
					selectedPiece.parentNode.classList.add('emptyTile');
					selectedPiece.innerHTML = null;
					playerTurn++;
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			} else if (
				selectedPiece.classList.contains('playerTwoPiece') &&
				(selectedPiece.id.charAt(0) - tilePiece.id.charAt(0) == 2 ||
					selectedPiece.id.charAt(0) - tilePiece.id.charAt(0) == -2) &&
				potentialJumpPiece.classList.contains('playerOnePiece') &&
				(selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == 2 ||
					selectedPiece.id.charAt(1) - tilePiece.id.charAt(1) == -2)
			) {
				tilePiece.classList.add('playerTwoPiece', 'checkerPiece', 'king');
				tilePiece.parentNode.classList.remove('emptyTile');
				tilePiece.innerHTML = selectedPiece.innerHTML;
				selectedPiece.classList.remove(
					'checkerPiece',
					'playerTwoPiece',
					'selectedPiece',
					'king'
				);
				selectedPiece.removeAttribute('style');
				selectedPiece.parentNode.classList.add('emptyTile');
				selectedPiece.innerHTML = null;
				playerTurn++;
				jumpedCounter++;
				for (var i = 0; i < movableTiles.length; i++) {
					if (movableTiles[i].children[0].id == potentialJumpId) {
						movableTiles[i].children[0].classList.remove(
							'checkerPiece',
							'playerOnePiece',
							'king'
						);
						movableTiles[i].children[0].removeAttribute('style');
						movableTiles[i].children[0].innerHTML = null;
						movableTiles[i].classList.add('emptyTile');
					}
				}
				if (canJump(tilePiece)) {
					for (var i = 0; i < movableTiles.length; i++) {
						console.log(
							'movableTiles ' + i + ': ' + movableTiles[i].children[0].id
						);
						if (movableTiles[i].children[0].id != tilePiece.id) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				} else {
					for (var i = 0; i < movableTiles.length; i++) {
						if (
							movableTiles[i].children[0].classList.contains('playerTwoPiece')
						) {
							movableTiles[i].children[0].onclick = null;
							movableTiles[i].children[0].onmouseover = null;
							movableTiles[i].onmouseout = null;
						} else if (
							movableTiles[i].children[0].classList.contains('playerOnePiece')
						) {
							movableTiles[i].children[0].onclick = selectPiece;
							movableTiles[i].children[0].onmouseover = hoverPiece;
							movableTiles[i].onmouseout = unhoverPiece;
						}
					}
				}
			}
		}
	}

	function canJump(piece) {
		var canJump = false;

		if (
			piece.classList.contains('king') &&
			piece.classList.contains('playerOnePiece')
		) {
			for (var i = 0; i < movableTiles.length; i++) {
				if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i > 23
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						movableTiles[i - 3].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i - 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i - 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i - 3].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i - 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i - 9].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i > 23
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i - 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						movableTiles[i - 5].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i - 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i - 5].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i - 9].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i <= 23 &&
					i >= 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						((movableTiles[i - 3].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 5].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i - 3].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 5].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i <= 23 &&
					i >= 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						((movableTiles[i - 5].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i - 5].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i - 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i < 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						movableTiles[i + 5].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i + 5].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i < 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						movableTiles[i + 3].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				}
			}
		} else if (
			piece.classList.contains('king') &&
			piece.classList.contains('playerTwoPiece')
		) {
			for (var i = 0; i < movableTiles.length; i++) {
				if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i > 23
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						movableTiles[i - 3].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i - 3].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i - 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i - 9].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i > 23
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						movableTiles[i - 5].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i - 5].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i - 9].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i <= 23 &&
					i >= 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						((movableTiles[i - 3].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 5].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i - 3].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 5].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i <= 23 &&
					i >= 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						((movableTiles[i - 5].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i - 5].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 9].classList.contains('emptyTile')) ||
							(movableTiles[i - 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i < 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						movableTiles[i + 5].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i + 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						movableTiles[i + 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i + 5].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i < 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						movableTiles[i + 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i + 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						movableTiles[i + 3].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i + 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				}
			}
		} else if (piece.classList.contains('playerOnePiece')) {
			for (var i = 0; i < movableTiles.length; i++) {
				if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i <= 23
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p1 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						movableTiles[i + 5].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 9].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p2 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						((movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i + 7].classList.contains('emptyTile')) ||
							(movableTiles[i + 5].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 9].classList.contains('emptyTile')))
					) {
						console.log('p3 working');
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i <= 23
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p4 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						movableTiles[i + 3].children[0].classList.contains(
							'playerTwoPiece'
						) &&
						movableTiles[i + 7].classList.contains('emptyTile')
					) {
						canJump = true;
						console.log('p5 working');
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i + 4].children[0].classList.contains(
							'playerTwoPiece'
						) &&
							movableTiles[i + 9].classList.contains('emptyTile')) ||
							(movableTiles[i + 3].children[0].classList.contains(
								'playerTwoPiece'
							) &&
								movableTiles[i + 7].classList.contains('emptyTile')))
					) {
						canJump = true;
						console.log('p6 working');
					}
				}
			}
		} else if (piece.classList.contains('playerTwoPiece')) {
			for (var i = 0; i < movableTiles.length; i++) {
				if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 0 &&
					i >= 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 0 &&
						movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 7].classList.contains('emptyTile')
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 6 &&
						movableTiles[i - 5].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 9].classList.contains('emptyTile')
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 0 &&
						movableTiles[i].children[0].id.charAt(1) != 6 &&
						((movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i - 5].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i - 9].classList.contains('emptyTile')))
					) {
						canJump = true;
					}
				} else if (
					movableTiles[i].children[0].id == piece.id &&
					movableTiles[i].children[0].id % 2 == 1 &&
					i >= 8
				) {
					if (
						movableTiles[i].children[0].id.charAt(1) == 1 &&
						movableTiles[i - 3].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 7].classList.contains('emptyTile')
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) == 7 &&
						movableTiles[i - 4].children[0].classList.contains(
							'playerOnePiece'
						) &&
						movableTiles[i - 9].classList.contains('emptyTile')
					) {
						canJump = true;
					} else if (
						movableTiles[i].children[0].id.charAt(1) != 1 &&
						movableTiles[i].children[0].id.charAt(1) != 7 &&
						((movableTiles[i - 3].children[0].classList.contains(
							'playerOnePiece'
						) &&
							movableTiles[i - 7].classList.contains('emptyTile')) ||
							(movableTiles[i - 4].children[0].classList.contains(
								'playerOnePiece'
							) &&
								movableTiles[i - 9].classList.contains('emptyTile')))
					) {
						canJump = true;
					}
				}
			}
		}

		return canJump;
	}
}
