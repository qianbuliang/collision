class Player{
	constructor(x,y,r){
		this.x=x;
		this.y=y;
		this.radius=r;
		this.angle=0;
	}



	render(ctx){
		ctx.save();
		ctx.fillStyle="#000";
		ctx.strokeStyle="#000";
		ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.beginPath();
		ctx.arc(0,0,this.radius,0,Math.PI*2)
		ctx.rect(0,-5,40,10)
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}
}