const gameBoard = (function(){
    var gameboard = new Array(9);
    var playersMoves = 0;
    
    const state = () => {
        if(gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2] && typeof gameboard[0] !== 'undefined'){
            return "won";
        }else if(gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5] && typeof gameboard[3] !== 'undefined'){
            return "won";
        }else if(gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8] && typeof gameboard[6] !== 'undefined'){
            return "won";
        }else if(gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6] && typeof gameboard[0] !== 'undefined'){
            return "won";
        }else if(gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7] && typeof gameboard[1] !== 'undefined'){
            return "won";
        }else if(gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8] && typeof gameboard[2] !== 'undefined'){
            return "won";
        }else if(gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8] && typeof gameboard[0] !== 'undefined'){
            return "won";
        }else if(gameboard[6] === gameboard[4] && gameboard[6] === gameboard[2] && typeof gameboard[6] !== 'undefined'){
            return "won";
        }else if(playersMoves >= 9){
            return "tie";
        }else{
            return "unfinished";
        }        
    }

    const updateGameBoard = (index,player) => {
        if(player === 1){
            gameboard[index] = "X";
        }else{
            gameboard[index] = "O";
        }
        playersMoves += 1;

    }

    function resetGameBoard(){
        playersMoves = 0;
        for(let i = 0; i< gameboard.length; i++){
            delete gameboard[i];
        }
    }


    return {state, updateGameBoard, resetGameBoard}
})();

const player = (function(name){
    var name = name;
    const setName = (name) => {
        name = name; 
    
    };

    const getName = () => {
        return name;
    }

    return{setName, getName};
});

const displayController = (function(){
    var player1;
    var player2;
    var playerCounter = 1;

    var startGame = (gameBoard) =>{
        document.getElementById('playerInfo').style.display = "none";
        var boardDisplay = document.getElementById("boardDisplay").style.display = "flex";
        document.getElementById("player").innerHTML = `${player1.getName()}'s Turn:`;
        document.getElementById("player").style.visibility = "visible";
        playerCounter = 1;

    }

    var updateGame = function(boardSpot) {
        var boardSpotIndex = boardSpot.getAttribute('data-index');
        if(boardSpot.textContent !== ""){
            alert("Spot has already been selected! Chose a different one");
        }else if(playerCounter === 1){
            boardSpot.textContent = "X";
            boardSpot.clasName = "player1Symbol";
            gameBoard.updateGameBoard(boardSpotIndex, playerCounter);
            checkState();
        }else{
            boardSpot.textContent = "O";
            boardSpot.clasName = "player2Symbol";
            gameBoard.updateGameBoard(boardSpotIndex, playerCounter);
            checkState();
        }
        
    }

    function checkState(){
        if(gameBoard.state() === 'won' || gameBoard.state() === 'tie'){
            endGame(gameBoard.state());

        }else{
            if(playerCounter === 1){
                document.getElementById("player").innerHTML = player2.getName() + "'s Turn:";
                playerCounter = 2;
            }else{
                document.getElementById("player").innerHTML = player1.getName() + "'s Turn:";
                playerCounter = 1;
            }
            
        }
    }

    function endGame(result){
        var resultDisplay = document.getElementById("resultDisplay");
        resultDisplay.style.display = "flex";
        var resultText = document.getElementById("resultText");
        var button = document.getElementById("playAgain");
        button.style.display = "block";
        
        document.getElementsByTagName("h1")[0].style.visibility="hidden";
        document.getElementById("player").style.visibility="hidden";
        if(result === "won"){
            var winningPlayer;
            if(playerCounter === 1){
                winningPlayer = player1.getName();
            }else{
                winningPlayer = player2.getName();
            }
            resultText.textContent = winningPlayer + " Won!"
        }else{
            resultText.textContent = "Tied Game!"
        }

    }

    function resetGame(){
        var boardSpots = document.getElementsByClassName("boardSpot");
        for(let spot of boardSpots){
            spot.innerHTML = "";
        }

        gameBoard.resetGameBoard();
        playerCounter = 1;

        var resultDisplay = document.getElementById("resultDisplay");
        resultDisplay.style.display = "none";
        var resultText = document.getElementById("resultText");
        var button = document.getElementById("playAgain");
        button.style.display = "none";
        
        document.getElementsByTagName("h1")[0].style.visibility="visible";
        document.getElementById("player").style.visibility="visible";
    }

    var setPlayers = function(playerName1, playerName2){
        player1 = player(playerName1);
        player2 = player(playerName2);
    }

    return {
        startGame, updateGame, setPlayers, resetGame
    };

})(gameBoard);

const startGameForm = document.getElementById("playerInfo");
startGameForm.addEventListener('submit', function(e){
    var player1 = startGameForm.elements['player1'].value;
    var player2 = startGameForm.elements['player2'].value;
    displayController.setPlayers(player1, player2);
    displayController.startGame(gameBoard);
    e.preventDefault();
});