const gameboard = (() => {
    const gameboard = ['', 'x', 'o', '', 'x', 'o', 'x', 'o', 'x'];
    const tickSpot = (symbol, index) => {
        const spot = gameboard[index]; // retrieve spot to check if empty
        if (spot === '' && index < gameboard.length) gameboard.splice(index, 1, symbol);
    };
    const logGameboard = () => console.log(gameboard);
    return {tickSpot, logGameboard}
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
};
// const john = Player('john', 'x');

// gameboard.tickSpot('o', 3);
// gameboard.logGameboard();