const gameboard = (() => {
    const gameboard = ['', 'x', 'o', '', 'x', 'o', 'x', 'o', 'x'];
    const tickSpot = (symbol, index) => {
        const spot = gameboard[index]; // retrieve spot to check if empty
        if (spot === '' && index < gameboard.length) gameboard.splice(index, 1, symbol);
    };
    const logGameboard = () => console.log(gameboard);
    return {tickSpot, logGameboard}
})();

gameboard.tickSpot('o', 4);
gameboard.logGameboard();