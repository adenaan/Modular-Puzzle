
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const restartBtn = document.getElementById('restartBtn');
    const forceWinBtn = document.getElementById('forceWinBtn');
    const debugInfo = document.getElementById('debugInfo');
    let tiles = [];

    function logTouchSupport(msg) {
        console.log("[JS Loaded] " + msg);
        const testMsg = document.createElement('div');
        testMsg.style.color = 'yellow';
        testMsg.innerText = msg;
        document.body.appendChild(testMsg);
    }

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
        if (index % 3 !== 0) toggle(index - 1);
        if (index % 3 !== 2) toggle(index + 1);
        if (index - 3 >= 0) toggle(index - 3);
        if (index + 3 < 9) toggle(index + 3);

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

    const setButtonHandler = (btn, handler) => {
        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler);
    };

    setButtonHandler(restartBtn, (e) => {
        e.preventDefault();
        alert('Restart tapped');
        initGrid();
    });

    setButtonHandler(forceWinBtn, (e) => {
        e.preventDefault();
        alert('Force Win tapped');
        tiles.forEach(tile => tile.classList.add('active'));
        updateDebug();
        checkWin();
    });

    initGrid();
    logTouchSupport("JS is running and touch events supported.");
});
