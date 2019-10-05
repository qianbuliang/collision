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

     getIntersection(segment) {
        let r_px = this.start.x;
        let r_py = this.start.y;
        let r_dx = this.x;
        r_dx = r_dx == 0 ? 0.000001 : r_dx;
        let r_dy = this.y;
        let s_px = segment.start.x;
        let s_py = segment.start.y;
        let s_dx = segment.x;
        let s_dy = segment.y;
        let r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
        let s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
        if (this.angle==segment.angle) {
            return null;
        }
        let T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
        let T1 = (s_px + s_dx * T2 - r_px) / r_dx;
        if (T1 < 0 || T1 > 1) return null;
        if (T2 < 0 || T2 > 1) return null;
        if (isNaN(T1)) return null;
        return new Hit2d(r_px + r_dx * T1, r_py + r_dy * T1, segment.angle, T1);
    }

    

}