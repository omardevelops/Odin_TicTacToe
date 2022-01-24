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
    const main_menu_div = document.getElementById('#main_menu');
})();

const Player = (name, symbol, isHuman) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getIsHuman = () => isHuman;
    return {getName, getSymbol, getIsHuman};
};

// const john = Player('john', 'x');

// gameboard.tickSpot('o', 3);
// gameboard.logGameboard();