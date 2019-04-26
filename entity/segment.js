class Segment{
	constructor(start,end){
		this.start=start;
		this.end=end;
		this.x=this.end.x-this.start.x;
		this.y=this.end.y-this.start.y;
		this.angle=Math.atan2(this.y,this.x)
		this.length=this.start.getDistance(this.end)
	}


 	getDistance(p){
 		let spv=new Segment(this.start,p)
        let sp=this.product(spv);
        if(sp<=0) return this.start.getDistance(p);
        let ep=this.getReverse().product(new Segment(this.end,p));
        if(ep<=0) return this.end.getDistance(p);
        let theta=spv.angle-this.angle;
        let l= Math.abs(spv.length*Math.sin(theta));
        return l;
    }

    getDistanceDetail(p){
 		let spv=new Segment(this.start,p)
        let sp=this.product(spv);
        if(sp<=0) return {x:this.start.x,y:this.start.y,distance:this.start.getDistance(p),isPoint:true};
        let ep=this.getReverse().product(new Segment(this.end,p));
        if(ep<=0) return {x:this.end.x,y:this.end.y,distance:this.end.getDistance(p),isPoint:true};
        let theta=spv.angle-this.angle;
        let l= (spv.length*Math.sin(theta));
        let cx=this.angle-Math.PI/2
        let x=p.x+Math.cos(cx)*l
        let y=p.y+Math.sin(cx)*l
        return {x:x,y:y,distance:Math.abs(l),isPoint:false};
    }


	product(v){
        return v.x *this.x +v.y *this.y;
    }

    getReverse(){
        return new Segment(this.end,this.start);
    }

}