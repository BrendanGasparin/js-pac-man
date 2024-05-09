// Wait for all DOM elements to load
document.addEventListener('DOMContentLoaded', ()=> {
    const scoreDisplay = document.querySelector('#score');
    const width = 28;
    let score = 0;
    const grid = document.querySelector('.grid');

    // DEFAULT LEVEL LAYOUT
    // 0 - dot
    // 1 - wall
    // 2 - ghost lair
    // 3 - power pellet
    // 4 - empty
    const layout = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,0,1,1,1,1,1,4,1,1,4,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1],
        [4,4,4,4,4,4,0,4,4,4,1,2,2,2,2,2,2,1,4,4,4,0,4,4,4,4,4,4],
        [1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
        [1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1],
        [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
        [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    // A 2d array to store the current game level state
    const squares = [];

    // Create level
    function createLevel() {
        for (let i = 0; i < width; i++) {
            squares[i] = [];
            for (let j = 0; j < width; j++) {
                const square = document.createElement('div');
                grid.appendChild(square);
                squares[i].push(square);

                // Add layout classes to the level
                if (layout[i][j] === 0)
                    squares[i][j].classList.add('pellet');
                if (layout[i][j] === 1)
                    squares[i][j].classList.add('wall');
                if (layout[i][j] === 2)
                    squares[i][j].classList.add('ghost-lair');
                if (layout[i][j] === 3)
                    squares[i][j].classList.add('power-pellet');
            }
        }
    }

    createLevel();

    // Place Pac-Man in the level
    let pacmanCurrentRow = 20;
    let pacmanCurrentCol = 14;
    squares[pacmanCurrentRow][pacmanCurrentCol].classList.add('pac-man');

    // Move Pac-Man
    function movePacman(e) {
        squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('pac-man');
        if (e.key == 'ArrowLeft' || e.key == 'a')
            pacmanCurrentCol--;
        else if (e.key == 'ArrowRight' || e.key == 'd')
            pacmanCurrentCol++;
        else if (e.key == 'ArrowUp' || e.key == 'w')
            pacmanCurrentRow--;
        else if (e.key == 'ArrowDown' || e.key == 's')
            pacmanCurrentRow++;

        squares[pacmanCurrentRow][pacmanCurrentCol].classList.add('pac-man');
    }
    document.addEventListener('keyup', movePacman);
})