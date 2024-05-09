// Wait for all DOM elements to load
document.addEventListener('DOMContentLoaded', ()=> {
    const scoreDisplay = document.querySelector('#score');
    const levelDisplay = document.querySelector('#level');
    const width = 28;
    let score = 0;
    let level = 1
    const grid = document.querySelector('.grid');

    scoreDisplay.innerHTML = " " + score;
    levelDisplay.innerHTML = " " + level;

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
    // TODO: Pac-Man should have a velocity, not a movement based on keyup
    function movePacman(e) {
        squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('pac-man');

        if ((e.key === 'ArrowLeft' || e.key === 'a') && e.key !== 'ArrowRight' && e.key !== 'd') {
            if (pacmanCurrentCol === 0 && pacmanCurrentRow === 13)
                pacmanCurrentCol = width - 1;
            else if (squares[pacmanCurrentRow][pacmanCurrentCol - 1].classList.contains('wall') == false
                     && squares[pacmanCurrentRow][pacmanCurrentCol - 1].classList.contains('ghost-lair') == false
                     && pacmanCurrentCol > 0)
                pacmanCurrentCol--;
        }
        else if ((e.key === 'ArrowRight' || e.key === 'd') && e.key !== 'ArrowLeft' && e.key !== 'a') {
            if (pacmanCurrentCol === width - 1 && pacmanCurrentRow === 13)
                pacmanCurrentCol = 0;
            else if (squares[pacmanCurrentRow][pacmanCurrentCol + 1].classList.contains('wall') == false
                     && squares[pacmanCurrentRow][pacmanCurrentCol + 1].classList.contains('ghost-lair') == false
                     && pacmanCurrentCol < width - 1)
                pacmanCurrentCol++;
        }
        else if ((e.key == 'ArrowUp' || e.key == 'w') && e.key != 'ArrowDown' && e.key != 's' && pacmanCurrentRow > 0
                  && squares[pacmanCurrentRow - 1][pacmanCurrentCol].classList.contains('wall') == false
                  && squares[pacmanCurrentRow - 1][pacmanCurrentCol].classList.contains('ghost-lair') == false)
            pacmanCurrentRow--;
        else if ((e.key == 'ArrowDown' || e.key == 's') && e.key != 'ArrowUp' && e.key != 'w' && pacmanCurrentRow < width 
                  && squares[pacmanCurrentRow + 1][pacmanCurrentCol].classList.contains('wall') == false
                  && squares[pacmanCurrentRow + 1][pacmanCurrentCol].classList.contains('ghost-lair')== false)
            pacmanCurrentRow++;

        squares[pacmanCurrentRow][pacmanCurrentCol].classList.add('pac-man');
        eatPellet();
    }
    document.addEventListener('keyup', movePacman);

    // TODO: detect eating pellets
    function eatPellet() {
        if (squares[pacmanCurrentRow][pacmanCurrentCol].classList.contains('pellet')) {
            score += 10;
            scoreDisplay.innerHTML = " " + score;
            squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('pellet');
        }
    }

    // TODO: detect eating power pellets
    // TODO: check for game over
    // TODO: check for level completion
})