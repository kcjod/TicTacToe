var buttons = document.querySelectorAll('#box button');
var reset = document.querySelector("#reset button");
var player = document.querySelector("#result");
var turn1 = true;

const winningPatterns = [
    [0, 1, 2], // Horizontal patterns
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical patterns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal patterns
    [2, 4, 6]
];


buttons.forEach(function(button) {

    button.addEventListener("click", function() {
        
        if(turn1 == true){
            button.innerHTML = "X";
            turn1 = false;
            // Showing turns of each player
            player.innerHTML = "<h2>Player 2's turn</h2>";
        }
        else{
            button.innerHTML = "O";
            turn1 = true;
            player.innerHTML = "<h2>Player 1's turn</h2>";
        }
        button.disabled = true;

        checkResult();
        
    });
});



const disabled = ()=>{
    for(let button of buttons){
        button.disabled = true;
    }
}

const enable = ()=>{
    for(let button of buttons){
        button.innerHTML = "";
        button.disabled = false;
    }
    player.innerHTML = "<h2>Player 1's turn</h2>";
}

    reset.addEventListener("click",function(){
        turn1 = true;
        enable();
    })

    const checkResult = () => {
        let isDraw = true; // Assume it's a draw unless a winning pattern is found
    
        for (let pattern of winningPatterns) {
            let pos1 = buttons[pattern[0]].innerHTML;
            let pos2 = buttons[pattern[1]].innerHTML;
            let pos3 = buttons[pattern[2]].innerHTML;
    
            if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
                if (pos1 === pos2 && pos2 === pos3) {
                    if (turn1 === true) {
                        player.innerHTML = "<h2>Player 2, You Won🎉</h2>";
                    } else {
                        player.innerHTML = "<h2>Player 1, You Won🎉</h2>";
                    }
                    disabled();
                    return; // Exit function early if there's a winner
                }
            }
        }
    
        // Check for draw condition
        for (let button of buttons) {
            if (button.innerHTML === "") {
                // If any button is not filled, it's not a draw yet
                isDraw = false;
                break;
            }
        }
    
        // If all buttons are filled and there's no winner, it's a draw
        if (isDraw) {
            player.innerHTML = "<h2>Game Drawn, Please Reset</h2>";
            disabled();
        }
    }
    