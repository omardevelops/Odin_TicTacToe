const gameboard = (() => {
    const gameboard = ['', 'x', 'o', '', 'x', 'o', 'x', 'o', 'x'];
    const tickSpot = (symbol, index) => {
        const spot = gameboard[index]; // retrieve spot to check if empty
        if (spot === '' && index < gameboard.length) gameboard.splice(index, 1, symbol);
    };
    const logGameboard = () => console.log(gameboard);
    return {tickSpot, logGameboard}
})();

const displayController = (() => {
    const main_menu_div = document.getElementById('main_menu');
    const game_interface_div = document.getElementById('game_interface');
    const gameboard = document.getElementById('gameboard');

    const hideElement = (element) => {
        element.style.display = 'none';
    };
    const showElement = (element, displayType) => {
        element.style.display = displayType;
    };
    const initInterface = () => {
        hideElement(main_menu_div);
        showElement(game_interface_div, 'block');
        const spots = Array.from(gameboard.getElementsByTagName('div'));
        spots.forEach((spot, index) => {
            if ([0, 3, 6].includes(index))  spot.style['border-left'] = 'none';
            if ([0, 1, 2].includes(index))  spot.style['border-top'] = 'none';
            if ([2, 5, 8].includes(index))  spot.style['border-right'] = 'none';
            if ([6, 7, 8].includes(index))  spot.style['border-bottom'] = 'none';
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
    return {initInterface, addEventListenersToButtons};
})();

const Player = (name, symbol, isHuman) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsHuman = () => isHuman;
    return {toString, getName, getSymbol, getIsHuman};
};

const game = (() => {
    let player1 = Player('Player 1', 'O', true);
    let player2, gamemode, turn;
    const setGamemode = (mode) => {
        gamemode = mode;
    };
    const start = (mode) => {
        displayController.initInterface(); // initializes interface for game
        setGamemode(mode) // human players or human vs AI
        if (gamemode === 'playerVSplayer') {
            player2 = Player('Player 2', 'X', true);
        } else {
            player2 = Player('AI Player', 'X', false);
        } 
    };
    return {start};

})();

displayController.addEventListenersToButtons();
