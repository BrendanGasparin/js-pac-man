// Wait for all DOM elements to load
document.addEventListener('DOMContentLoaded', ()=> {
    const scoreDisplay = document.querySelector('#score');
    const livesDisplay = document.querySelector('#lives');
    const width = 28;
    let score = 0;
    let level = 1;
    let lives = 2;
    const grid = document.querySelector('.grid');
    let scaredTime = 10000;
    let pellets = 236;

    scoreDisplay.innerHTML = ' ' + score;
    livesDisplay.innerHTML = ' ' + lives;

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
        eatPowerPellet();
    }
    document.addEventListener('keyup', movePacman);

    // detect eating pellets
    function eatPellet() {
        if (squares[pacmanCurrentRow][pacmanCurrentCol].classList.contains('pellet')) {
            score += 10;
            scoreDisplay.innerHTML = " " + score;
            squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('pellet');
            pellets--;
        }
    }

    // detect eating power pellets
    function eatPowerPellet() {
        if (squares[pacmanCurrentRow][pacmanCurrentCol].classList.contains('power-pellet')) {
            score += 50;
            scoreDisplay.innerHTML = " " + score;

            // change ghosts to be scared
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unscareGhosts, scaredTime);

            squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('power-pellet');
        }
    }

    // Unscare the ghosts
    function unscareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    // GHOSTS
    // CONSTRUCTOR
    class Ghost {
        constructor(className, startRow, startCol, speed) {
            this.className = className;
            this.startRow = startRow;
            this.currentRow = startRow;
            this.startCol = startCol;
            this.currentCol = startCol;
            this.speed = speed;
            this.isScared = false;
            this.timerId = NaN;
        }
    }

    // Array of ghosts
    ghosts = [
        new Ghost ('blinky', 10, 13, 250),
        new Ghost ('pinky', 12, 14, 400),
        new Ghost ('inky', 12, 15, 300),
        new Ghost ('clyde', 12, 13, 500)
    ]

    // Render ghosts to the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentRow][ghost.currentCol].classList.add(ghost.className);
        squares[ghost.currentRow][ghost.currentCol].classList.add('ghost');
    })

    // Move ghosts randomly
    // TODO: Handle ghosts in the warp tunnel
    ghosts.forEach(ghost => moveGhost(ghost));
    function moveGhost(ghost) {
        let direction = Math.floor(Math.random() * 4);  // Random direction: 0 is up, 1 is right, 2 is down, 3 is left

        // Move the ghost at intervals according to ghost.speed
        ghost.timerId = setInterval(function() {
            // Stop a ghost from losing its styling when another ghost leaves its square
            squares[ghost.currentRow][ghost.currentCol].classList.remove(ghost.className);
            // Only remove the actual ghost class from the square if there are no other ghosts there
            let other_ghosts = false;
            ghosts.forEach(other_ghost => {
                if (squares[ghost.currentRow][ghost.currentCol].classList.contains(other_ghost.className) && other_ghost.className !== ghost.className)
                    other_ghosts = true;
            });
            if(other_ghosts === false)
                squares[ghost.currentRow][ghost.currentCol].classList.remove('ghost', 'scared-ghost');

            // Move the ghost in the given direction, or choose a new direction if there is a wall there
            if (direction === 0 && squares[ghost.currentRow - 1][ghost.currentCol].classList.contains('wall') == false)
                ghost.currentRow--;
            else if (direction === 0)
                direction = Math.floor(Math.random() * 4);
            if (direction === 1 && squares[ghost.currentRow][ghost.currentCol + 1].classList.contains('wall') == false)
                ghost.currentCol++;
            else if (direction === 1)
                direction = Math.floor(Math.random() * 4);
            if (direction === 2 && squares[ghost.currentRow + 1][ghost.currentCol].classList.contains('wall') == false)
                ghost.currentRow++;
            else if (direction === 2)
                direction = Math.floor(Math.random() * 4);
            if (direction === 3 && squares[ghost.currentRow][ghost.currentCol - 1].classList.contains('wall') == false)
                ghost.currentCol--;
            else if (direction === 3)
                direction = Math.floor(Math.random() * 4);

            if (ghost.isScared) {
                squares[ghost.currentRow][ghost.currentCol].classList.add('scared-ghost');
            }

            squares[ghost.currentRow][ghost.currentCol].classList.add(ghost.className, 'ghost');

            // Pac-Man eats a scared ghost
            if (ghost.isScared && squares[ghost.currentRow][ghost.currentCol].classList.contains('pac-man')) {
                squares[ghost.currentRow][ghost.currentCol].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentRow = ghost.startRow;
                ghost.currentCol = ghost.startCol;
                score += 100;
                scoreDisplay.innerHTML = " " + score;
                ghost.isScared = false;
                squares[ghost.currentRow][ghost.currentCol].classList.add(ghost.className, 'ghost');
            }
            // Check if Pac-Man has been eaten
            checkPacmanEaten();
            // Check if level is complete
            checkLevelComplete();
        }, ghost.speed);
    }

    // check for ghosts eating Pac-Man
    function checkPacmanEaten() {
        if (squares[pacmanCurrentRow][pacmanCurrentCol].classList.contains('ghost') &&
            squares[pacmanCurrentRow][pacmanCurrentCol].classList.contains('scared-ghost') == false) {
            squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('pac-man');
            lives--;
            if (lives >= 0)
                livesDisplay.innerHTML = ' ' + lives;
            console.log('Pac-Man was eaten.')

            if (lives < 0) {
                gameOver();
            }
            else {
                pacmanCurrentRow = 20;
                pacmanCurrentCol = 14;
                squares[pacmanCurrentRow][pacmanCurrentCol].classList.add('pac-man');
            }
        }
    }

    // Check for level completion
    function checkLevelComplete() {
        if (pellets === 0) {
            level++;
        }
    }

    // Handle game over
    function gameOver() {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacman);
        squares[pacmanCurrentRow][pacmanCurrentCol].classList.remove('pac-man');
        setTimeout(function() { alert('Game over!'); }, 500);
    }
})