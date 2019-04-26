class Building{
	constructor(vetexs=[],closed=true){
		this.vetexs=vetexs;
		this.closed=closed;
		this.segments=[];
		for(let i=0;i<this.vetexs.length-1;i++){
			this.segments.push(new Segment(new Point(this.vetexs[i].x,this.vetexs[i].y),new Point(this.vetexs[i+1].x,this.vetexs[i+1].y)))
		}
		if(this.vetexs.length>2&&this.closed){
			this.segments.push(new Segment(new Point(this.vetexs[this.vetexs.length-1].x,this.vetexs[this.vetexs.length-1].y),new Point(this.vetexs[0].x,this.vetexs[0].y)))
		}
	}




	render(ctx){
		if(this.vetexs.length>1){
			ctx.lineWidth=1;
			ctx.strokeStyle="#333";
			ctx.beginPath();
			ctx.moveTo(this.vetexs[0].x,this.vetexs[0].y);
			for(let i=1;i<this.vetexs.length;i++){
				ctx.lineTo(this.vetexs[i].x,this.vetexs[i].y);
			}
			if(this.closed)
			ctx.closePath();
			ctx.stroke();
		}else if(this.vetexs.length==1){
			ctx.fillStyle="#333";
			ctx.beginPath();
			ctx.arc(this.vetexs[0].x,this.vetexs[0].y,1,0,Math.PI*2);
			ctx.closePath();
			ctx.fill()
		}
	}
}