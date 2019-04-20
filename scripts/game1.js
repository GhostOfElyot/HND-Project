var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;
var frame = 0;
var mousepos = new Vector(0,0);
var click = false;
var mouseDown = false;
var mouseMode = 2;

ctx.font = "100 20px arial";

function getDimensions(){
	height = window.innerHeight;
	width = window.innerWidth;
}

document.addEventListener("mousemove", function(e){
	mousepos.Update(e.clientX,e.clientY);
})

document.addEventListener("mouseup", function(e){
	click = true;
	mouseDown = false;
})

document.addEventListener("mousedown", function(e){
	mouseDown = true;
})


class Tile {
	constructor(x_,y_,xOffset_,yOffset_,size_,id_,upgrade_){
		this.x = x_;
		this.y = y_;
		this.size = size_;
		this.id = id_;
		this.mouseHover = false;
		this.upgrade = upgrade_;
		this.xOffset = xOffset_;
		this.yOffset = yOffset_;
		this.tick = 0;
		this.tower;


	}

	update(xOffset_,yOffset_,grid_){
		if(mousepos.x > this.x + xOffset_ && mousepos.x < this.x + xOffset_ + this.size && mousepos.y > this.y + yOffset_ && mousepos.y < this.y + yOffset_ + this.size){
			this.mouseHover = true;
		}else{
			this.mouseHover = false;
		}

		if(this.upgrade == 2 && this.tower == null){
			this.tower = new Tower(this.x + this.xOffset,this.y + this.yOffset,this.size);
		}else if (this.upgrade == -1){
			if(this.tick % 20 == 0){
				grid_.enemies.push(new Enemy(this.x + this.xOffset,this.y + this.yOffset))
				grid_.enemies.push(new Enemy(this.x + this.xOffset,this.y + this.yOffset))
				grid_.enemies.push(new Enemy(this.x + this.xOffset,this.y + this.yOffset))
				grid_.enemies.push(new Enemy(this.x + this.xOffset,this.y + this.yOffset))
			}
		}

		if(this.mouseHover == true){
			if(mouseDown == true && this.upgrade != mouseMode){
				this.upgrade = mouseMode;
				if(this.upgrade == 2){
					this.tower = new Tower(this.x + this.xOffset,this.y + this.yOffset,this.size);
				}else if (this.upgrade == 0){
					this.tower = null;
				}
			}
		}


		this.tick++;
	}

	draw(xOffset_,yOffset_){

		if(this.upgrade == 1){
			ctx.fillStyle="rgb(255, 0, 61)";
			ctx.fillRect(this.x+xOffset_,this.y+yOffset_,this.size,this.size);
			ctx.strokeStyle="rgb(122, 0, 25)";
			ctx.strokeRect(this.x+xOffset_ + (this.size/10),this.y+yOffset_ + (this.size/10),this.size * 0.8,this.size * 0.8);
		}else if (this.upgrade == 2){
			ctx.fillStyle="rgb(205, 0, 101)";
			ctx.fillRect(this.x+xOffset_,this.y+yOffset_,this.size,this.size);
			ctx.strokeStyle="rgb(122, 0, 25)";
			ctx.strokeRect(this.x+xOffset_ + (this.size/10),this.y+yOffset_ + (this.size/10),this.size * 0.8,this.size * 0.8);
		}else if (this.upgrade == -1){
			ctx.strokeStyle="rgb(22, 200, 25)";
			ctx.strokeRect(this.x+xOffset_ + (this.size/10),this.y+yOffset_ + (this.size/10),this.size * 0.8,this.size * 0.8);
		}

		if(this.tower != null){
			this.tower.draw();
		}

		if(this.mouseHover == false){
			ctx.strokeStyle="rgb("+Math.floor(Math.random()*100 + 155)+","+Math.floor(Math.random()*0)+","+Math.floor(Math.random()*100)+")";
			ctx.strokeStyle="rgb(255, 0, 61)";
		}else{
			ctx.strokeStyle="rgb(255, 0, 61)";
			ctx.fillStyle="rgba(255, 255, 255, 0.1)";
			ctx.fillRect(this.x+xOffset_,this.y+yOffset_,this.size,this.size);
		}



		ctx.strokeRect(this.x+xOffset_,this.y+yOffset_,this.size,this.size);

		ctx.fillStyle="white";
		//ctx.fillText(this.upgrade,this.x + xOffset_ + 15,this.y+yOffset_ + 25)
	}
}

class Grid {
	constructor(x_,y_,size_){

		this.width = x_;
		this.height = y_;
		this.size = size_;

		this.xOffset = Math.floor((width/2) - ((this.width * this.size)/2));
		this.yOffset = Math.floor((height/2) - ((this.height * this.size)/2));

		this.tiles = [];
		this.enemies = [];

		for(var i = 0; i < this.width; i++ ){
			for(var j = 0; j < this.height; j++ ){
				if(i == this.width - 1 || i == 0 || j == this.height - 1 || j == 0){
					this.tiles.push(new Tile(i*this.size + i,j*this.size + j,this.xOffset,this.yOffset,this.size,this.tiles.length,1));
				}else{
					this.tiles.push(new Tile(i*this.size + i,j*this.size + j,this.xOffset,this.yOffset,this.size,this.tiles.length,0));

				}

			}
		}

		for(var i = 0; i < this.height*this.width; i++ ){
			if(this.tiles[i].upgrade == 0){
				//debugger;
				this.enemies.push(new Enemy(this.tiles[i].x + this.xOffset,this.tiles[i].y + this.yOffset))
			}
		}
	}

	returnTile(x_,y_){
		//console.log(this.height*this.size+this.yOffset + this.height + "," + y_);
		if(x_- this.xOffset < 0 || x_ > this.width*this.size+this.xOffset + this.width	 || y_ - this.yOffset < 0 || y_  >= this.height*this.size+this.yOffset + this.height	){
			return 0;
		}else{
			//return (Math.floor((y_ - this.yOffset -	 (Math.floor((y_ - this.yOffset)/this.size)))/this.size) * this.width) + (Math.floor((x_ - this.xOffset - (Math.floor((x_ - this.xOffset)/this.size)))/this.size));
			//console.log((Math.floor((x_ - this.xOffset -	 (Math.floor((x_ - this.xOffset)/this.size)))/this.size) * this.height) + (Math.floor((y_ - this.yOffset - (Math.floor((y_ - this.yOffset)/this.size)))/this.size)));
			return (Math.floor((x_ - this.xOffset -	 (Math.floor((x_ - this.xOffset)/this.size)))/this.size) * this.height) + (Math.floor((y_ - this.yOffset - (Math.floor((y_ - this.yOffset)/this.size)))/this.size));

		}

	}

	removeEnemy(enemy_){
		//debugger;
		var index = this.enemies.indexOf(enemy_);
		//console.log("enemy died at" + this.enemies[index].hp);
		//console.log("before" + this.enemies.length);
		//debugger;
		this.enemies.splice(index,1)
		//console.log("after" + this.enemies.length);
	}

	update(){
		for(var i = 0; i < this.height*this.width; i++ ){
			this.tiles[i].update(this.xOffset,this.yOffset,this);

				if(this.tiles[i].upgrade == 2){
					if(this.enemies.length > 0){
						var closestEnemy = null;
						var closestEnemyDistance = 100;
						for(var j = 0; j < this.enemies.length; j++ ){
							if(this.enemies[j].alive){
								if(closestEnemyDistance > pythag(this.tiles[i].tower.center,this.enemies[j].position)){
									var closestEnemy = this.enemies[j];
									var closestEnemyDistance = pythag(this.tiles[i].tower.center,this.enemies[j].position);
								}
							}
						}
						this.tiles[i].tower.target = closestEnemy;
						if(closestEnemy != null){
							closestEnemy.damage(10);
						}
					}else{
						this.tiles[i].tower.target = null;
					}
				}

		}

		for(var i = 0; i < this.enemies.length; i++ ){
			this.enemies[i].update(this);

			if(this.enemies[i] != null && !this.enemies[i].alive){
				this.removeEnemy(this.enemies[i]);
			}
		}

		//update towers

	}

	draw(){

		this.xOffset = Math.floor((width/2) - ((this.width * this.size)/2) - (this.width/2));
		this.yOffset = Math.floor((height/2) - ((this.height * this.size)/2) - (this.height/2));

		for(var i = 0; i < this.height*this.width; i++ ){
			this.tiles[i].draw(this.xOffset,this.yOffset);
		}

		for(var i = 0; i < this.enemies.length; i++ ){
			this.enemies[i].draw();
		}
	}
}

class Tower{
	constructor(x_,y_,size_){
		this.x = x_;
		this.y = y_;
		this.position = new Vector(this.x, this.y);
		this.size = size_;
		this.centerx = this.x + 10;
		this.centery = this.y + 18;
		this.center = new Vector(this.centerx, this.centery);
		this.targetx = 0;
		this.targety = 0;
		this.target = null;
	}

	update(){

	}

	draw(){
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.arc(this.x +10,this.y +18,15,0,2*Math.PI);
		ctx.strokeStyle="white";
		ctx.stroke();

		//line
		if(this.target != null){
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.x + 10,this.y + 18);
			ctx.lineTo(this.target.position.x + 2,this.target.position.y + 2);
			ctx.stroke();

		}
		ctx.lineWidth = 1;
	}
}

class Enemy{
	constructor(x_,y_){
		this.x = x_;
		this.y = y_;
		this.size = 5;
		this.vol = new Vector(Math.random()*10 - 5,Math.random()*10 -5 );
		this.position = new Vector(this.x,this.y);
		this.hp = 500;
		this.alive = true;
	}

	damage(amount_){
		this.hp = this.hp - Number(amount_);
		if(this.hp < 0){
			this.kill();
		}
	}

	kill(){
		this.alive = false;
	}

	update(grid_){
		this.x += this.vol.x;
		this.y += this.vol.y;

		this.position = new Vector(this.x,this.y);

		if(grid_.tiles[grid_.returnTile(this.x,this.y)].upgrade <= 1){
			this.damage(0);
		}

		//collision
		if(grid_.tiles[grid_.returnTile(this.x + this.vol.x + this.size,this.y)].upgrade >= 1){
			this.vol.x *= -0.8;
		}

		if(grid_.tiles[grid_.returnTile(this.x ,this.y + this.vol.y + this.size)].upgrade >= 1){
			this.vol.y *= -0.8;
		}

		if(grid_.tiles[grid_.returnTile(this.x + this.vol.x ,this.y)].upgrade >= 1){
			this.vol.x *= -0.8;
		}

		if(grid_.tiles[grid_.returnTile(this.x ,this.y + this.vol.y )].upgrade >= 1){
			this.vol.y *= -0.8;
		}



	}

	draw(){
		if (this.alive){

			ctx.fillStyle="yellow";
			ctx.fillRect(this.x,this.y,this.size,this.size);
		}



	}
}

newgrid = new Grid(30,15,30);

newgrid.tiles[Math.floor(Math.random()*newgrid.height*newgrid.width)].draw();

function step() {
		frame++;
		ctx.clearRect(0,0,canvas.width,canvas.height);

		if(frame % 60 == 0){
			//getDimensions();
		}

		if(click){
			console.log("click");
		}

 		newgrid.update();
		newgrid.draw();

		ctx.fillStyle="white";
		//ctx.fillText(newgrid.returnTile(mousepos.x,mousepos.y),mousepos.x,mousepos.y);
		ctx.fillText(newgrid.tiles[newgrid.returnTile(mousepos.x,mousepos.y)].upgrade,mousepos.x,mousepos.y);

		click = false;

    window.requestAnimationFrame(step);
  }


  window.requestAnimationFrame(step);
