
const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restartBtn');
let tiles = [];

// Create 3x3 grid
function initGrid() {
    grid.innerHTML = '';
    tiles = [];
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.index = i;
        tile.addEventListener('click', () => toggleTile(i));
        grid.appendChild(tile);
        tiles.push(tile);
    }
}

function toggleTile(index) {
    const toggle = (i) => {
        if (i >= 0 && i < 9) {
            tiles[i].classList.toggle('active');
        }
    };
    toggle(index);
    if (index % 3 !== 0) toggle(index - 1);       // Left
    if (index % 3 !== 2) toggle(index + 1);       // Right
    if (index - 3 >= 0) toggle(index - 3);        // Up
    if (index + 3 < 9) toggle(index + 3);         // Down

    checkWin();
}

function checkWin() {
    if (tiles.every(tile => tile.classList.contains('active'))) {
        alert('You win!');
    }
}

restartBtn.addEventListener('click', initGrid);

initGrid();
