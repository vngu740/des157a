(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol')
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const teethbg = document.querySelector('img');
    const quit = document.querySelector('#quit');
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');

    /* Background music */
    const bgmusic = new Audio('sounds/bgmusic.mp3');
    bgmusic.play();
    bgmusic.loop = true;

    /* Audio effects */

    const drill = new Audio('sounds/drill.mp3');
    const scream = new Audio('sounds/scream.mp3');


    /* Game data */

    const gameData = {
        dice: ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png', 'images/7.png', 'images/8.png', 'images/9.png', 'images/10.png', 'images/11.png', 'images/12.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll: 0,
        index: 0,
        gameEnd: 29
    };



    /* Starts game */

    startGame.addEventListener('click', function () {

        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        gameControl.innerHTML = ''
        quit.innerHTML = '<button id="quitbutton">Wanna quit?</button>'

        document.querySelector('#quit').addEventListener('click', function () {
            location.reload();
        });

        setUpTurn()

    });



    /* Sets up turn */

    function setUpTurn() {

        actionArea.innerHTML = `<p>Break teeth for ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML += '<button id="roll">Break the teeth</button>'

        /* Bounces character when it's their turn */
        const char1turn = document.querySelector('#player1');
        const char2turn = document.querySelector('#player2');

        if (gameData.index == 0) {
            char1turn.classList.add('playerturn');
            char2turn.classList.remove('playerturn');
        } else if (gameData.index == 1) {
            char2turn.classList.add('playerturn');
            char1turn.classList.remove('playerturn');
        }
        /* --- */

        player1.innerHTML = '<p>Player 1</p>';
        player1.innerHTML += '<img src="images/leftperson.png" height="35" />';

        player2.innerHTML = '<p>Player 2</p>';
        player2.innerHTML += '<img src="images/rightperson.png" height="35" />';


        document.querySelector('#roll').addEventListener('click', function () {
            drill.play();
            throwDice();

        });

    };



    /* Throws dice */

    function throwDice() {
        gameData.roll = Math.floor(Math.random() * 12) + 1;
        actionArea.innerHTML = `<p>Break teeth for ${gameData.players[gameData.index]}</p>`;

        teethbg.src = `${gameData.dice[gameData.roll - 1]}`

        if (gameData.roll === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            actionArea.innerHTML += `<p>Weak. Your minions only broke one tooth, switching to ${gameData.players[gameData.index]}.</p>`;
            setTimeout(setUpTurn, 2000);
        }

        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.roll;
            actionArea.innerHTML += '<button id="pass">No more please</button> <button id="rollagain">Break more teeth</button>';

            document.querySelector('#rollagain').addEventListener('click', function () {
                setUpTurn();
            });

            document.querySelector('#pass').addEventListener('click', function () {
                scream.play();
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
        }

        checkWinningCondition();
    }



    /* Checks if player won */

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2 class="winner"><img src="images/confetti.gif" height="75"> ${gameData.players[gameData.index]} wins the game with ${gameData.score[gameData.index]} 🦷 broken. <img src="images/confetti.gif" height="75"></h2>`;

            teethbg.src = 'images/end.png'

            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = '<button id="startagain">Start a new game</button>';
        } else {
            //show current score
            showCurrentScore();
        }
    };



    /* Shows current score */

    function showCurrentScore() {
        score.innerHTML = `<p id="score1">🦷 <strong>${gameData.score[0]}</strong></p>`
        score.innerHTML += `<p id="score2">🦷 <strong>${gameData.score[1]}</strong></p>`
    };


})();//end of IIFE