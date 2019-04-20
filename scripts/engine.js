class Vector{
	constructor(x_,y_){
		this.x = x_;
		this.y = y_;
	}

	Update(x_,y_){
		this.x = x_;
		this.y = y_;
	}
}
	
function pythag(a_,b_){
	var a = a_;
	var b = b_;
//	console.log(a.x + "," + a.y + " " + b.x + "," + b.y)
//console.log("start");

	if(Number(a.x) > Number(b.x)){
		var xDistance = (Number(a.x) - Number(b.x)) * (Number(a.x) - Number(b.x));
		//console.log((Number(a.x) - Number(b.x)));
	}else{
		var xDistance = (Number(b.x) - Number(a.x)) * (Number(b.x) - Number(a.x));
		//console.log((Number(b.x) - Number(a.x)));
	}

	if(Number(a.y) >Number(b.y)){
		var yDistance = (Number(a.y) - Number(b.y)) * (Number(a.y) - Number(b.y));
		//console.log((Number(a.y) - Number(b.y)));
	}else{
		var yDistance = (Number(b.y) - Number(a.y)) * (Number(b.y) - Number(a.y));
		//console.log((Number(b.y) - Number(a.y)));
	}

	//console.log(xDistance);
	//console.log(yDistance);
	//console.log(Math.sqrt(xDistance + yDistance));
	//console.log("end");
	return Math.sqrt(xDistance + yDistance);
}


//ui

function tool(option_){
	mouseMode = option_;
}
