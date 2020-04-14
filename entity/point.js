class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}

	getDistance(p){
        return Math.sqrt(Math.pow(p.y-this.y,2)+Math.pow(p.x-this.x,2));
    }

    render(ctx){
    	ctx.save()
    	ctx.fillStyle="#f00"
    	ctx.beginPath()
    	ctx.arc(this.x,this.y,2,0,Math.PI*2)
    	ctx.closePath()
    	ctx.fill()
    	ctx.restore()
    }
}