export default function move(gameState){
    let moveSafety = {
        up: 50,
        down: 50,
        left: 50,
        right: 50
    };
    
    // We've included code to prevent your Battlesnake from moving backwards
    const myHead = gameState.you.body[0];
    //const myNeck = gameState.you.body[1];
    
    /*if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
        moveSafety.left += 999;
        
    } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
        moveSafety.right += 999;
        
    } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
        moveSafety.down += 999;
        
    } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
        moveSafety.up += 999;
    }*/
    
    // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
    // gameState.board contains an object representing the game board including its width and height
    // https://docs.battlesnake.com/api/objects/board
    if(myHead.y==0){
        moveSafety.down+= 999;
    }if(myHead.y==gameState.board.height-1){
        moveSafety.up+= 999;
    }if(myHead.x==0){
        moveSafety.left+= 999;
    }if(myHead.x==gameState.board.width-1){
        moveSafety.right+= 999;
    }
    // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // gameState.you contains an object representing your snake, including its coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    for(let i=0;i<gameState.board.snakes.length;i++){
        for(let b=0;b<gameState.board.snakes[i].body.length-1;b++){
            if(myHead.x==gameState.board.snakes[i].body[b].x+1&&myHead.y==gameState.board.snakes[i].body[b].y){
                moveSafety.left+= 999;
            }if(myHead.x==gameState.board.snakes[i].body[b].x-1&&myHead.y==gameState.board.snakes[i].body[b].y){
                moveSafety.right+= 999;
            }if(myHead.y==gameState.board.snakes[i].body[b].y+1&&myHead.x==gameState.board.snakes[i].body[b].x){
                moveSafety.down+= 999;
            }if(myHead.y==gameState.board.snakes[i].body[b].y-1&&myHead.x==gameState.board.snakes[i].body[b].x){
                moveSafety.up+= 999;
            }
        }
    }

    for(let i=0;i<gameState.board.food.length;i++){
        if(gameState.board.food[i].x==myHead.x+1&&gameState.board.food[i].y==myHead.y){
            moveSafety.right-=10;
        }else if(gameState.board.food[i].x==myHead.x-1&&gameState.board.food[i].y==myHead.y){
            moveSafety.left+=(-10);
        }else if(gameState.board.food[i].x==myHead.x&&gameState.board.food[i].y==myHead.y-1){
            moveSafety.down-=10;
        }else if(gameState.board.food[i].x==myHead.x&&gameState.board.food[i].y==myHead.y+1){
            moveSafety.up-=10;
        }
    }
    
    // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // gameState.board.snakes contains an array of enemy snake objects, which includes their coordinates
    // https://docs.battlesnake.com/api/objects/battlesnake
    
    // Are there any safe moves left?
    
    //Object.keys(moveSafety) returns ["up", "down", "left", "right"]
    //.filter() filters the array based on the function provided as an argument (using arrow function syntax here)
    //In this case we want to filter out any of these directions for which moveSafety[direction] == false
    const safeMoves = Object.keys(moveSafety).filter(direction => moveSafety[direction]<999);
    let nextMove;
    for(let i=1;i<safeMoves.length;i++){
        let swap=false;
        for(let j=0;j<safeMoves.length; j++){
            if(moveSafety[safeMoves[j]]>moveSafety[safeMoves[j+1]]){
                let stored=safeMoves[j];
                safeMoves[j]=safeMoves[j+1];
                safeMoves[j+1]=stored;
                swap=true;
            }
        }
        if(swap==false){
            break;
        }
    }
    if(moveSafety[safeMoves[0]]==moveSafety[safeMoves[1]]){
        nextMove = safeMoves[Math.floor(Math.random() * 2)];
        console.log('random');
    }else if(moveSafety[safeMoves[0]]==moveSafety[safeMoves[1]]==moveSafety[safeMoves[2]]){
        nextMove = safeMoves[Math.floor(Math.random() * 3)];
        onsole.log('random');
    }else if(moveSafety[safeMoves[0]]==moveSafety[safeMoves[1]]==moveSafety[safeMoves[2]]==moveSafety[safeMoves[3]]){
        nextMove = safeMoves[Math.floor(Math.random() * 4)];
        onsole.log('random');
    }else{
        nextMove=safeMoves[0];
    }
    // Choose a random move from the safe moves
    //const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    
    // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // gameState.board.food contains an array of food coordinates https://docs.battlesnake.com/api/objects/board
    
    console.log(`MOVE ${gameState.turn}: ${nextMove}`)
    console.log(safeMoves);
    console.log(moveSafety);
    return { move: nextMove };
}