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
    const hideMenu = () => {
        main_menu_div.style.display = 'none';
    };
    const addEventListenersToButtons = () => {
        const buttons = Array.from(main_menu_div.getElementsByTagName('button'));
        buttons.forEach(button => {
            button.addEventListener('click', hideMenu);
            // logic for buttons based on ID (pvp vs player vs ai)
        });
    };
    return {hideMenu, addEventListenersToButtons};
})();

const Player = (name, symbol, isHuman) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsHuman = () => isHuman;
    return {getName, getSymbol, getIsHuman};
};

const startGame = () => {

};

// const john = Player('john', 'x');

// gameboard.tickSpot('o', 3);
// gameboard.logGameboard();
displayController.addEventListenersToButtons();
