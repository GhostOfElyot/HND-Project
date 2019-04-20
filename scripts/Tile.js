class Tile {
	constructor(x_,y_,size_,id_,upgrade_){
		this.x = x_;
		this.y = y_;
		this.size = size_;
		this.id = id_;
		this.mouseHover = false;
		this.upgrade = upgrade_;
		this.tick = 0;
		this.tower;

		this.directionToGoal = new Vector(15,15);

		this.distanceFromGoal = 2147483647;
	}

	update(grid_){
		if(mousepos.x > this.x && mousepos.x < this.x + this.size && mousepos.y > this.y && mousepos.y < this.y + this.size){
			this.mouseHover = true;
		}else{
			this.mouseHover = false;
		}

		if(this.upgrade == 2 && this.tower == null){
			this.tower = new Tower(this.x,this.y,this.size);
		}else if (this.upgrade == -1){
			if(this.tick % 20 == 0){
				grid_.enemies.push(new Enemy(this.x + (this.size/2),this.y + (this.size/2)))
			}
		}

		if(this.mouseHover == true){
			if(mouseDown == true && this.upgrade != mouseMode){
				this.upgrade = mouseMode;
				grid_.calculateRoutes();
				if(this.upgrade == 2){
					this.tower = new Tower(this.x,this.y,this.size);
				}else if (this.upgrade == 0){
					this.tower = null;
				}
			}
		}
		this.tick++;
	}

	draw(){

		if(this.upgrade == 1){
			ctx.fillStyle="rgb(205, 0, 101)";
			ctx.fillRect(this.x,this.y,this.size,this.size);
			ctx.strokeStyle="rgb(122, 0, 25)";
			ctx.strokeRect(this.x + (this.size/10),this.y + (this.size/10),this.size * 0.8,this.size * 0.8);
		}else if (this.upgrade == 2){
			ctx.fillStyle="rgb(0, 205, 156)";
			ctx.fillRect(this.x,this.y,this.size,this.size);
			ctx.strokeStyle="rgb(122, 0, 25)";
			ctx.strokeRect(this.x + (this.size/10),this.y + (this.size/10),this.size * 0.8,this.size * 0.8);
		}else if (this.upgrade == -3){
			ctx.fillStyle="rgb(205, 148, 0)";
			ctx.fillRect(this.x,this.y,this.size,this.size);
			ctx.strokeStyle="rgb(122, 0, 25)";
			ctx.strokeRect(this.x + (this.size/10),this.y + (this.size/10),this.size * 0.8,this.size * 0.8);
		}else if (this.upgrade == -1){
			ctx.strokeStyle="rgb(22, 200, 25)";
			ctx.strokeRect(this.x + (this.size/10),this.y + (this.size/10),this.size * 0.8,this.size * 0.8);
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
			ctx.fillRect(this.x,this.y,this.size,this.size);
		}

		ctx.strokeStyle = "rgb(88, 80, 101)";
		ctx.lineWidth = 0.5;
		ctx.strokeRect(this.x,this.y,this.size,this.size);

		ctx.fillStyle="white";

		// /ctx.fillText(this.id,this.x + ((this.size/2) - (ctx.measureText(this.distanceFromGoal).width/2)),this.y+18)

		if(this.upgrade <= 0){
			if((this.id + 1) % 15 == 0){
				ctx.strokeStyle = "red";
			}else{
				ctx.strokeStyle = "white";
			}

			ctx.beginPath();
			ctx.moveTo(this.x + this.size/2,this.y + this.size/2);
			ctx.lineTo((this.x + this.size/2) + (this.directionToGoal.x * 6),(this.y + this.size/2)+(this.directionToGoal.y * 6));
			ctx.stroke();
		}
		ctx.fillStyle="white";
	}
	drawTowerBeam(){
		if(this.tower != null){
			this.tower.drawBeam();
		}
	}
}
