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

    const hideElement = (element) => {
        element.style.display = 'none';
    };
    const showElement = (element, displayType) => {
        element.style.display = displayType;
    };
    const initInterface = () => {
        hideElement(main_menu_div);
        showElement(game_interface_div, 'flex');
    };
    const addEventListenersToButtons = () => {
        const buttons = Array.from(main_menu_div.getElementsByTagName('button'));
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                startGame(button.id);
            });
        });
    };
    return {initInterface, addEventListenersToButtons};
})();

const Player = (name, symbol, isHuman) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsHuman = () => isHuman;
    return {getName, getSymbol, getIsHuman};
};

const startGame = (gamemode) => {
    displayController.initInterface();
    let player1 = ('Player 1', 'O', true);
    let player2;
    if (gamemode === 'playerVSplayer') {
        player2 = ('Player 2', 'X', true);
    } else {
        player2 = ('AI Player', 'X', false);
    }    
};

displayController.addEventListenersToButtons();
