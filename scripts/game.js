var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var height = 540;
var width = 960;
canvas.height = height;
canvas.width = width;
var frame = 0;
var mousepos = new Vector(0,0);
var click = false;
var mouseDown = false;
var mouseMode = 1;
var offset = new Vector(canvas.style.marginLeft,canvas.style.marginTop);

ctx.font = "100 8px arial";


document.addEventListener("mousemove", function(e){
	offset = new Vector(canvas.style.marginLeft,canvas.style.marginTop)
	mousepos.Update(e.clientX - 150,e.clientY - 150);
	//console.log(offset.x);
})

document.addEventListener("mouseup", function(e){
	click = true;
	mouseDown = false;
})

document.addEventListener("mousedown", function(e){
	mouseDown = true;
})

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
		//ctx.fillText(newgrid.tiles[newgrid.returnTile(mousepos.x,mousepos.y)].upgrade,mousepos.x,mousepos.y);

		click = false;

    window.requestAnimationFrame(step);
  }


  window.requestAnimationFrame(step);
