
const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restartBtn');
const forceWinBtn = document.getElementById('forceWinBtn');
const debugInfo = document.getElementById('debugInfo');
let tiles = [];

function initGrid() {
    grid.innerHTML = '';
    document.getElementById('winMessage')?.remove();
    tiles = [];
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.index = i;
        tile.addEventListener('click', () => toggleTile(i));
        grid.appendChild(tile);
        tiles.push(tile);
    }
    updateDebug();
}

function toggleTile(index) {
    const toggle = (i) => {
        if (i >= 0 && i < 9) {
            tiles[i].classList.toggle('active');
        }
    };
    toggle(index);
    if (index % 3 !== 0) toggle(index - 1); // Left
    if (index % 3 !== 2) toggle(index + 1); // Right
    if (index - 3 >= 0) toggle(index - 3);  // Up
    if (index + 3 < 9) toggle(index + 3);   // Down

    updateDebug();
    checkWin();
}

function checkWin() {
    if (tiles.every(tile => tile.classList.contains('active'))) {
        if (!document.getElementById('winMessage')) {
            const msg = document.createElement('div');
            msg.id = 'winMessage';
            msg.className = 'win-message';
            msg.innerText = 'You win!';
            document.body.appendChild(msg);
        }
    }
}

function updateDebug() {
    const activeCount = tiles.filter(tile => tile.classList.contains('active')).length;
    debugInfo.innerText = `Active Tiles: ${activeCount}/9\nTile States: ${tiles.map((t, i) => t.classList.contains('active') ? \`[\${i}]\` : '').filter(Boolean).join(' ')}`;
}

forceWinBtn.addEventListener('click', () => {
    tiles.forEach(tile => tile.classList.add('active'));
    updateDebug();
    checkWin();
});

restartBtn.addEventListener('click', initGrid);

initGrid();
