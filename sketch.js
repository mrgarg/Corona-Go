function load_images(){
    //player,virus,gem
    enemy_image = new Image;
    enemy_image.src = "Assets/v2.png";
    
    player_img = new Image;
    player_img.src = "Assets/superhero.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gemm.png";  
        
}
function init(){
    //define the objects that we will have in the game
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 1500;
    H = 700;
    
    canvas.width = W;
    canvas.height = H;
    
    // create a context 
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over = false;
    
    // enemies
    e1 = {
		x : 150,
		y : 50,
		w : 100,
		h : 100,
		speed : 20,
	};
	e2 = {
		x : 350,
		y : 150,
		w : 100,
		h : 100,
		speed : 30,
	};
	e3 = {
		x : 550,
		y : 20,
		w : 100,
		h : 100,
		speed : 35,
	};
    
    e4 = {
		x : 750,
		y : 50,
		w : 100,
		h : 100,
		speed : 50,
	};
    e5 = {
		x : 1050,
		y : 50,
		w : 100,
		h : 100,
		speed : 40,
	};
    
    enemy = [e1,e2,e3,e4,e5];
    
    player = {
		x : 20,
		y : H/2-50,
		w : 80,
		h : 80,
		speed : 40,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-100,
		y : H/2,
		w : 100,
		h : 100,
	};
    
    // eventListener
    function keyPressed(e)
    {
        if(e.key=="ArrowRight" ){

            player.direction="right";
        }
        else if(e.key=="ArrowLeft" )
        {
            player.direction="left";
        }
        else if( e.key=="ArrowDown")
        {
            player.direction="down";
        }
        else{
            player.direction="up";
        }
        player.moving=true;
        console.log(player.direction);

    }
    document.addEventListener("keydown",keyPressed);
    
}

// to check collision
function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    return true
    }
    
    return false;
    
}

function draw(){
    
    //clear the canvas area for the old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle = "red";
    
    //draw player
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    
    // draw gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    // draw enemy
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
   
    }
    
    // draw score
    pen.fillStyle = "white";
    pen.font = "30px Roboto"
    pen.fillText("Score "+player.health,25,25);
    
}

function update(){
    
    
    if(player.direction=="right" && player.moving==true)    // for keyboard 
    {
        player.x = player.x+player.speed;
        player.health += 20;
               
    }
    else if(player.direction=="left" && player.moving==true)
    {
        player.x = player.x-player.speed;  
    }
    else if ( player.direction =="up" && player.moving==true)
    {
        player.y = player.y-player.speed;
       
    }
    else if ( player.direction =="down" && player.moving==true)
    {
        player.y= player.y+player.speed;
    }
    
    player.moving=false;
    
    
    // overlap with enemy
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            player.health -= 50;
            if(player.health <0){
                console.log(player.health);
                game_over = true;
                alert("Game Over" + player.health);
            }
        }
    }
    
    //overlap with gem
    if(isOverlap(player,gem)){
        
        pen.clearRect(gem.x,gem.y,gem.w,gem.h)
        console.log("You Won");
        setTimeout(function(){
            alert("You Won!");
            game_over = true;
        },0.5)
        return;
    }
    
    //move the box downwards
    //update each enemy by same logic
    for(let i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y <0){
            enemy[i].speed *= -1;
        }   
    }
    
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
}

load_images();
init();
var f = setInterval(gameloop,100);