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
		/*
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.arc(this.x +10,this.y +18,15,0,2*Math.PI);
		ctx.strokeStyle="white";
		ctx.stroke();
		*/
		//line

	}
	drawBeam(){
		if(this.target != null){
			ctx.strokeStyle="rgb(0, 187, 165)";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.x + 10,this.y + 18);
			ctx.lineTo(this.target.position.x + 2,this.target.position.y + 2);
			ctx.stroke();
			ctx.lineWidth = 1;
		}
	}
}
