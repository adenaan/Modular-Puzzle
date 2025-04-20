
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const restartBtn = document.getElementById('restartBtn');
    const forceWinBtn = document.getElementById('forceWinBtn');
    const debugInfo = document.getElementById('debugInfo');
    const logBox = document.createElement('div');
    logBox.id = 'logBox';
    document.body.appendChild(logBox);

    function log(message) {
        const line = document.createElement('div');
        line.textContent = message;
        logBox.appendChild(line);
    }

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
        log("Grid initialized.");
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
                log("Win condition met.");
            }
        }
    }

    function updateDebug() {
        const activeCount = tiles.filter(tile => tile.classList.contains('active')).length;
        debugInfo.innerText = `Active Tiles: ${activeCount}/9\nTile States: ${tiles.map((t, i) => t.classList.contains('active') ? \`[\${i}]\` : '').filter(Boolean).join(' ')}`;
    }

    const setButtonHandler = (btn, handler, label) => {
        if (!btn) {
            log(`[ERROR] ${label} button not found!`);
            return;
        }
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            log(`${label} clicked`);
            handler();
        });
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            log(`${label} touched`);
            handler();
        });
        log(`${label} button bound.`);
    };

    setButtonHandler(restartBtn, () => initGrid(), "Restart");
    setButtonHandler(forceWinBtn, () => {
        tiles.forEach(tile => tile.classList.add('active'));
        updateDebug();
        checkWin();
    }, "Force Win");

    initGrid();
    log("JS loaded and initialized.");
});
