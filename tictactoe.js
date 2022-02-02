const gameboard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];
    const tickSpot = (symbol, index) => {
        const spot = gameboard[index]; // retrieve spot to check if empty
        if (spot === '' && index < gameboard.length) gameboard.splice(index, 1, symbol);
        // console.log(gameboard);
    };
    const isCompleteRow = () => { // Check for complete row/column/diagonal
        const completeRows = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [3, 4, 5], [6, 7, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6]];
        let isCompleteRow = false;
        for (const row of completeRows) {
            if (row.every(value => (gameboard[value] == gameboard[row[0]]) && gameboard[value] != '')) {
                isCompleteRow = true;
                break;
            }
        }
        return isCompleteRow;
    };
    const isFilled = () => {
        for (const spot of gameboard) {
            if (spot == '')
                return false;
        }
        return true;
    };
    const clearBoard = () => {
        for (let i = 0; i < gameboard.length; i++)
            gameboard[i] = '';
        logGameboard();
    };
    const logGameboard = () => console.log(gameboard);
    return { tickSpot, clearBoard, isCompleteRow, isFilled }
})();

const displayController = (() => {
    const main_menu_div = document.getElementById('main_menu');
    const game_interface_div = document.getElementById('game_interface');
    const gameboard_div = document.getElementById('gameboard');
    const headerTitle = document.getElementById('status_text');

    const hideElement = (element) => {
        element.style.display = 'none';
    };
    const showElement = (element, displayType) => {
        element.style.display = displayType;
    };
    const setHeaderText = text => {
        headerTitle.textContent = text;
    };
    const updateScores = (player1, player2) => {
        const playerScoreHeaders = Array.from(document.getElementsByClassName('score'));
        playerScoreHeaders[0].textContent = 'player1' + '🚩'.repeat(player1.getScore());
        playerScoreHeaders[1].textContent = 'player2' + '🚩'.repeat(player2.getScore());
    };
    const initRound = () => { // Code to clear board for new round
        gameboard.clearBoard();
        const spots = Array.from(gameboard_div.getElementsByTagName('div'));
        spots.forEach(spot => spot.textContent = null);
    };
    const initInterface = () => {
        hideElement(main_menu_div);
        showElement(game_interface_div, 'block');
        const spots = Array.from(gameboard_div.getElementsByTagName('div'));
        spots.forEach((spot, index) => {
            if ([0, 3, 6].includes(index)) spot.style['border-left'] = 'none';
            if ([0, 1, 2].includes(index)) spot.style['border-top'] = 'none';
            if ([2, 5, 8].includes(index)) spot.style['border-right'] = 'none';
            if ([6, 7, 8].includes(index)) spot.style['border-bottom'] = 'none';

            spot.addEventListener('click', () => {
                if (game.isRoundOver() === false) {
                    let currentPlayer = game.getCurrentPlayer();
                    if (currentPlayer.getIsHuman() && spot.textContent.length === 0) {
                        spot.textContent = currentPlayer.getSymbol(); // Get respective Player Symbol
                        gameboard.tickSpot(currentPlayer.getSymbol(), index);
                        if (game.isRoundOver()) {
                            game.endRound();
                        } else {
                            game.switchTurn();
                        }
                    }
                }

            });
        });
    };
    const addEventListenersToButtons = () => {
        const buttons = Array.from(main_menu_div.getElementsByTagName('button'));
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                game.start(button.id);
            });
        });
    };
    return { initInterface, addEventListenersToButtons, setHeaderText, initRound, updateScores };
})();

const Player = (name, symbol, isHuman, score) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsHuman = () => isHuman;
    const getScore = () => score;
    const incrementScore = () => score++;
    return { toString, getName, getSymbol, getIsHuman, getScore, incrementScore };
};

const game = (() => {
    let player1 = Player('Player 1', 'O', true, 0);
    let player2, gamemode, currentPlayer, winner, roundNum;
    let winningScore = 3; // First to this score wins the game
    const setGamemode = (mode) => {
        gamemode = mode;
    };
    const getCurrentPlayer = () => currentPlayer;
    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    };
    const switchTurn = () => {
        if (currentPlayer == player1) currentPlayer = player2;
        else currentPlayer = player1;
    };
    const isGameOver = () => {
        if (player1.getScore() === winningScore || player2.getScore() === winningScore)
            return true;      
    };
    const isRoundOver = () => {
        return gameboard.isCompleteRow() || gameboard.isFilled();
    };
    const endGame = () => {
        displayController.setHeaderText(`Game Over! ${winner} wins!`);
    };
    const startRound = () => {
        displayController.initRound();

    };
    const endRound = () => {
        roundNum++;
        if (gameboard.isCompleteRow()) {
            winner = currentPlayer.getName();
            displayController.setHeaderText(`${winner} wins this round!`);
            if (winner === player1.getName()) player1.incrementScore();
            if (winner === player2.getName()) player2.incrementScore();
            displayController.updateScores(player1, player2);
        } else {
            displayController.setHeaderText(`Tie!`);
        }
        setTimeout(() => {
            if (isGameOver()) {
                endGame();
            } else {
                displayController.setHeaderText(`Round ${roundNum}`)
                startRound();
            }

        }, 1000);
    };

    const start = (mode) => {
        displayController.initInterface(); // initializes interface for game
        setGamemode(mode) // human players or human vs AI
        roundNum = 1;
        displayController.setHeaderText(`Round ${roundNum}`);
        if (gamemode === 'playerVSplayer') {
            player2 = Player('Player 2', 'X', true, 0);
        } else {
            player2 = Player('AI Player', 'X', false, 0);
        }
        setCurrentPlayer(player1);
    };
    return { start, endRound, getCurrentPlayer, switchTurn, isRoundOver };

})();

displayController.addEventListenersToButtons();
