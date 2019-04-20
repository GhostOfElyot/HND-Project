class Enemy{
	constructor(x_,y_){
		this.x = x_;
		this.y = y_;
		this.size = 5;
		this.vol = new Vector(0,0);
		this.position = new Vector(this.x,this.y);
		this.maxHP = 500
		this.hp = this.maxHP;
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
		debugger;


		if(this.vol.x < grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.x && grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.x > 0){
			this.vol.x += 0.1
		}else if (this.vol.x > grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.x && grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.x < 0){
			this.vol.x -= 0.1
		}else{
			if(this.vol.x > -0.1 && this.vol.x < 0.1){
				this.vol.x = 0;
			}else if(this.vol.x > 0){
				this.vol.x -= 0.1;
			}else{
				this.vol.x += 0.1;
			}
		}

		if(this.vol.y < grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.y && grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.y > 0){
			this.vol.y += 0.1
		}else if (this.vol.y > grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.y && grid_.tiles[grid_.returnTile(this.x,this.y)].directionToGoal.y < 0){
			this.vol.y -= 0.1
		}else{
			if(this.vol.y > -0.1 && this.vol.y < 0.1){
				this.vol.y = 0;
			}else if(this.vol.y > 0){
				this.vol.y -= 0.1;
			}else{
				this.vol.y += 0.1;
			}
		}


		if(grid_.tiles[grid_.returnTile(this.x,this.y)].upgrade <= 1){
			this.damage(0);
		}

		//collision
		if(grid_.tiles[grid_.returnTile(this.x + this.vol.x,this.y)] != null){
			if(grid_.tiles[grid_.returnTile(this.x + this.vol.x,this.y)].upgrade >= 1){
				this.vol.x *= -0.5;
			}
		}else{
			this.vol.x *= -0.5;
		}

		if(grid_.tiles[grid_.returnTile(this.x ,this.y + this.vol.y)] != null){
			if(grid_.tiles[grid_.returnTile(this.x ,this.y + this.vol.y)].upgrade >= 1 ){
				this.vol.y *= -0.5;
			}
		}else{
			this.vol.y *= -0.5;
		}

		/*
		if(grid_.tiles[grid_.returnTile(this.x + this.vol.x ,this.y)] != null){
			if(grid_.tiles[grid_.returnTile(this.x + this.vol.x ,this.y)].upgrade >= 1 ){
				this.vol.x *= -0.2;
			}
		}else{
			this.vol.x *= -0.2;
		}

		if(grid_.tiles[grid_.returnTile(this.x ,this.y + this.vol.y )] != null){
			if(grid_.tiles[grid_.returnTile(this.x ,this.y + this.vol.y )].upgrade >= 1 ){
				this.vol.y *= -0.2;
			}
		}else{
			this.vol.y *= -0.2;
		}
		*/

			this.x += this.vol.x;
			this.y += this.vol.y;

			this.position = new Vector(this.x,this.y);

	}

	draw(){
		if (this.alive){

			ctx.fillStyle="yellow";
			ctx.fillRect(this.x,this.y,this.size,this.size);
		}
	}

	drawHP(){
		if(this.hp != this.maxHP){
			ctx.fillStyle="red";
			ctx.fillRect(this.x - (this.size/2 + 5),this.y - 5,20,2)
			ctx.fillStyle="green";
			ctx.fillRect(this.x - (this.size/2 + 5),this.y - 5,(this.hp/this.maxHP)*20,2)
		}
	}
}
