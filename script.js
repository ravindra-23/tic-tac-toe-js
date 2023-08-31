// SELECTORS
const gameBoard = document.getElementById('game-board');
const infoDisplay = document.getElementById('info');
const resetButton = document.getElementById('reset-game');

// DECLARATIONS

const startCells = ['', '', '', '', '', '', '', '', '',]
let go = 'circle'
infoDisplay.textContent = 'Circle Goes First...'

// FUNCTIONS

function createGameBoard() {
	startCells.forEach((cell, index) => {
		const cellElement = document.createElement('div');
		cellElement.setAttribute('id', index)
		cellElement.classList.add('square');
		gameBoard.append(cellElement);

		cellElement.addEventListener('click', addGo)
	})
}

createGameBoard()

function addGo(e) {
	const goDisplay = document.createElement('div');
	goDisplay.classList.add(go)
	e.target.append(goDisplay);
	go = go === 'circle' ? 'cross' : 'circle'
	infoDisplay.textContent = `It's now ${go}'s Turn`
	e.target.removeEventListener('click', addGo)
	checkScore();
}

function checkScore() {
	const allSquares = document.querySelectorAll('.square')
	console.log(allSquares)
	console.log(typeof allSquares)
	const winningCombos = [
		[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
	]

	winningCombos.forEach(arr => {
		const circleWins = arr.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))
		
		if(circleWins) {
			infoDisplay.textContent = 'Circle Wins!!'
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
			return
		}
	})

	winningCombos.forEach(arr => {
		const crossWins = arr.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))
		
		if(crossWins) {
			infoDisplay.textContent = 'Cross Wins!!'
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
			return
		}
	})
}

function resetGame() {
	console.log('clicked')
    const allSquares = document.querySelectorAll('.square');
    
    allSquares.forEach(square => {
        square.innerHTML = '';
        square.addEventListener('click', addGo);
    });
    
    go = 'circle';
    infoDisplay.textContent = 'Circle Goes First';
}

// EVENT LISTENERS

resetButton.addEventListener('click', resetGame);
