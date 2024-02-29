(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const teethbg = document.querySelector('#teeth');


    /* Game data */

    const gameData = {
        dice: ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg', 'images/7.jpg', 'images/8.jpg', 'images/9.jpg', 'images/10.jpg', 'images/11.jpg', 'images/12.jpg'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll: 0,
        index: 0,
        gameEnd: 29
    };



    /* Starts game */

    startGame.addEventListener('click', function () {

        gameData.index = Math.round(Math.random());
        console.log(gameData.index);


        gameControl.innerHTML = '<h2>The Game Has Started</h2>'
        gameControl.innerHTML += '<button id="quit">Wanna quit?</button>'

        document.querySelector('#quit').addEventListener('click', function () {
            location.reload();
        });

        setUpTurn()

    });



    /* Sets up turn */

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;

        actionArea.innerHTML = '<button id="roll">Break the teeth</button>'

        document.querySelector('#roll').addEventListener('click', function () {
            throwDice();

        });

    };



    /* Throws dice */

    function throwDice() {
        actionArea.innerHTML = '';
        gameData.roll = Math.floor(Math.random() * 12) + 1;
        game.innerHTML = `<p>Break teeth for ${gameData.players[gameData.index]}</p>`;

        teethbg.style.backgroundImage = `url('${gameData.dice[gameData.roll - 1]}')`


        if (gameData.roll === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Weak. Your minions only broke one tooth, switching to ${gameData.players[gameData.index]}.</p>`;
            setTimeout(setUpTurn, 2000);
        }

        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.roll;
            actionArea.innerHTML = '<button id="rollagain">Break more teeth</button> <button id="pass">No more please</button>';

            document.querySelector('#rollagain').addEventListener('click', function () {
                setUpTurn();
            });

            document.querySelector('#pass').addEventListener('click', function () {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
        }

        checkWinningCondition();
    }



    /* Checks if player won */

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins the game with ${gameData.score[gameData.index]}</h2>`;
            teethbg.style.backgroundImage = `url(images/end.jpg)`
            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a new game';
        }

        else {
            showCurrentScore();
        }
    };



    /* Shows current score */

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}: ${gameData.score[1]}</strong></p>`
    };


})();//end of IIFE