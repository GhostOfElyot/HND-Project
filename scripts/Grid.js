class Grid {
	constructor(x_,y_,size_){

		this.width = x_;
		this.height = y_;
		this.size = size_;

		this.tiles = [];
		this.enemies = [];

		for(var i = 0; i < this.width; i++ ){
			for(var j = 0; j < this.height; j++ ){
				if(i == this.width - 1 || i == 0 || j == this.height - 1 || j == 0){
					this.tiles.push(new Tile(i*this.size + i,j*this.size + j,this.size,this.tiles.length,0));
				}else{
					this.tiles.push(new Tile(i*this.size + i,j*this.size + j,this.size,this.tiles.length,0));
				}
			}
		}

		this.tiles[Math.floor(this.height*this.width)/2 + 8].upgrade = -3;

		for(var i = 0; i < this.height*this.width; i++ ){

			this.tiles[i].distanceFromGoal = 9999;

		}

		this.calculateRoutes();
	}

	calculateRoutes(){

		this.goal;
		this.current;

		this.visited = [];
		this.que = [];

		// tile to right 	+15
		// tile to left 	-15
		// tile above		-1
		// tile below		+1

		for(var i = 0; i < this.height*this.width; i++ ){
			if(this.tiles[i].upgrade == -3){
				this.goal = this.tiles[i];
			}
			this.visited[i] = false;
			this.tiles[i].distanceFromGoal = 9999;
		}

		this.goal.distanceFromGoal = 0;
		this.que.push(this.goal);

		while(this.que.length > 0){

			this.current = this.que[0];


			//tile to the right
			//only interacts with tiles that are inside the array (tiles with the id above 0 and below array.length())
			//only interacts with tiles that dont stop enemy movement (upgrade above 0)
			if(this.current.id+this.height < this.tiles.length && this.tiles[this.current.id+this.height].upgrade <= 0){
				// only changes the distance from the goal if the distance is an improvement (lower number of hops)
				if(this.tiles[this.current.id+this.height].distanceFromGoal > this.current.distanceFromGoal + 1){
					// changes the distance from the goal
					this.tiles[this.current.id+this.height].distanceFromGoal = this.current.distanceFromGoal + 1;
				}
					// checks if the tile (to the right) has been visited before or is currently in the que
				if(!this.visited[this.current.id+this.height]){
					// if no
					// adds tile to que
					this.que.push(this.tiles[this.current.id+this.height]);
					// adds tile to visted as everything in the que will be visited
					// this prevents duplicate tiles being in the que
					this.visited[this.current.id+this.height] = true;
				}
			}

			// tile to the left
			if(this.current.id-this.height >= 0 && this.tiles[this.current.id-this.height].upgrade <= 0){
				if(this.tiles[this.current.id-this.height].distanceFromGoal > this.current.distanceFromGoal + 1){
					this.tiles[this.current.id-this.height].distanceFromGoal = this.current.distanceFromGoal + 1;
				}
				if(!this.visited[this.current.id-this.height]){
					this.que.push(this.tiles[this.current.id-this.height]);
					this.visited[this.current.id-this.height] = true;
				}
			}

			// tile below
			if(this.current.id+1 < this.tiles.length && (this.current.id + 1) % 15 != 0 && this.tiles[this.current.id+1].upgrade <= 0){
				if(this.tiles[this.current.id+1].distanceFromGoal > this.current.distanceFromGoal + 1){
					this.tiles[this.current.id+1].distanceFromGoal = this.current.distanceFromGoal + 1;
				}
				if(!this.visited[this.current.id+1]){
					this.que.push(this.tiles[this.current.id+1]);
					this.visited[this.current.id+1] = true;
				}
			}
			// tile above
			if(this.current.id-1 >= 0 && this.current.id % 15 != 0 && this.tiles[this.current.id-1].upgrade <= 0){
				if(this.tiles[this.current.id-1].distanceFromGoal > this.current.distanceFromGoal + 1){
					this.tiles[this.current.id-1].distanceFromGoal = this.current.distanceFromGoal + 1;
				}
				if(!this.visited[this.current.id-1]){
					this.que.push(this.tiles[this.current.id-1]);
					this.visited[this.current.id-1] = true;
				}
			}

			this.visited[this.current.id] = true;

			//console.log(this.que);
			this.que.splice(0,1);
		}
		//vector field
		for(var i = 0; i < this.height*this.width; i++ ){

			this.distanceT = 0;
			this.distanceB = 0;
			this.distanceL = 0;
			this.distanceR = 0;

			this.direction = new Vector (0,0);

			if(i < 15){
				this.distanceL = this.tiles[i].distanceFromGoal;
			}else{
				if(this.tiles[i-15].upgrade > 0){
					this.distanceL = this.tiles[i].distanceFromGoal;
				}else{
					this.distanceL = this.tiles[i-15].distanceFromGoal;
				}
			}

			if(i > this.height * this.width - 16){
				this.distanceR = this.tiles[i].distanceFromGoal;
			}else{
				if(this.tiles[i+15].upgrade > 0){
					this.distanceR = this.tiles[i].distanceFromGoal;
				}else{
					this.distanceR = this.tiles[i+15].distanceFromGoal;
				}
			}

			if(i % 15 == 0){
				this.distanceT = this.tiles[i].distanceFromGoal;
			}else{
				if(this.tiles[i-1].upgrade > 0){
					this.distanceT = this.tiles[i].distanceFromGoal;
				}else{
					this.distanceT = this.tiles[i-1].distanceFromGoal;
				}
			}

			if((i + 1) % 15 == 0){
				this.distanceB = this.tiles[i].distanceFromGoal;
			}else if(i + 1 == this.height*this.width){
				this.distanceB = this.tiles[i].distanceFromGoal;
			}else{
				if(this.tiles[i+1].upgrade > 0){
					this.distanceB = this.tiles[i].distanceFromGoal;
				}else{
					this.distanceB = this.tiles[i+1].distanceFromGoal;
				}
			}


			this.direction.x = (this.distanceL - this.distanceR) * 1;

			this.direction.y = (this.distanceT - this.distanceB) * 1;


			//normalise

			if(i < 15){
			}else{
				if(this.direction.x < 0 && this.tiles[i-15].upgrade > 0){
					this.direction.x = 0;
					console.log("test");
				}else if (this.direction.x > 0 && this.tiles[i-15].upgrade > 0){
					this.direction.x = 2;
				}
			}

			if(i > this.height * this.width - 16){
			}else{
				if(this.direction.x > 0 && this.tiles[i+15].upgrade > 0){
					this.direction.x = 0;
					console.log("test");
				}else if (this.direction.x < 0 && this.tiles[i+15].upgrade > 0){
					this.direction.x = -2;
				}
			}

			if(i % 15 == 0){
			}else{
				if(this.direction.y < 0 && this.tiles[i-1].upgrade > 0){
					this.direction.y = 0;
					console.log("test");
				}else if (this.direction.y > 0 && this.tiles[i-1].upgrade > 0){
					this.direction.y = 2;
				}
			}

			if((i + 1) % 15 == 0){
			}else if(i + 1 == this.height*this.width){
			}else{
				if(this.direction.y > 0 && this.tiles[i+1].upgrade > 0){
					this.direction.y = 0;
					console.log("test");
				}else if (this.direction.y < 0 && this.tiles[i+1].upgrade > 0){
					this.direction.y = -2;
				}
			}

			if(this.direction.x < 0 && this.direction.y < 0 && this.tiles[i-16].upgrade > 0){
				this.direction.y = 0;
			}
			if(this.direction.x < 0 && this.direction.y > 0 && this.tiles[i-14].upgrade > 0){
				this.direction.y = 0;
			}
			if(this.tiles[i+14] != null){
				if(this.direction.x > 0 && this.direction.y < 0 && this.tiles[i+14].upgrade > 0){
					this.direction.y = 0;
				}
			}
			if(this.tiles[i+16] != null){
				if(this.direction.x > 0 && this.direction.y > 0 && this.tiles[i+16].upgrade > 0){
					this.direction.y = 0;
				}
			}

			this.tiles[i].directionToGoal = this.direction;


		}

	}

	returnTile(x_,y_){
		if(x_ < 0 || x_ > this.width*this.size + this.width	 || y_  < 0 || y_  >= this.height*this.size + this.height	){
			return null;
		}else{
			return (Math.floor((x_ - (Math.floor((x_ )/this.size)))/this.size) * this.height) + (Math.floor((y_ -  (Math.floor((y_ )/this.size)))/this.size));

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
			this.tiles[i].update(this);

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
							closestEnemy.damage(50);
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
		document.getElementById("numberOfEnemies").innerHTML = this.enemies.length;
	}

	draw(){


		for(var i = 0; i < this.height*this.width; i++ ){
			this.tiles[i].draw();
		}

		for(var i = 0; i < this.height*this.width; i++ ){
			this.tiles[i].drawTowerBeam();
		}

		for(var i = 0; i < this.enemies.length; i++ ){
			this.enemies[i].draw();
		}

		for(var i = 0; i < this.enemies.length; i++ ){
			this.enemies[i].drawHP();
		}
	}
}
