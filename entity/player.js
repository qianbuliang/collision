class Player{
	constructor(x,y,r){
		this.x=x;
		this.y=y;
		this.radius=r;
		this.angle=0;
		this.w_angle=0;
		this.speed=0;
	}


	update(buildings){
		let tx=this.x+Math.cos(this.w_angle)*this.speed;
		let ty=this.y+Math.sin(this.w_angle)*this.speed;
		let hit=null
		let point=null
		let tp={x:tx,y:ty}
		for(let i=0;i<buildings.length;i++){    //计算与物体顶点碰撞
			let b=buildings[i]
			for(let j=0;j<b.segments.length;j++){
				let s=b.segments[j]
				let sd=s.start.getDistance(tp)
				let ed=s.end.getDistance(tp)
				if(sd<this.radius){
					point={x:s.start.x,y:s.start.y,distance:sd}
					break;
				}else if(ed<this.radius){
					point={x:s.end.x,y:s.end.y,distance:ed}
					break;
				}
			}
			if(point){
				break;
			}
		}
		if(point){
			let angle=Math.atan2(this.y-point.y,this.x-point.x)-Math.PI/2;
			let speed=Math.cos(angle-this.w_angle)*this.speed;
			tx=this.x+Math.cos(angle)*speed;
			ty=this.y+Math.sin(angle)*speed;
			tp={x:tx,y:ty}
		}
		buildings.forEach(b=>{          //计算与物体边界线段碰撞
			b.segments.forEach(s=>{
				let h=s.getDistance(tp)
				if(h<this.radius){
					if(!hit||hit.distance>h){
						hit={distance:h};
						hit.angle=s.angle;
					}
				}
			})
		})
		if(!hit){
			this.x=tx;
			this.y=ty;
		}else{
			let angle=hit.angle
			let speed=Math.cos(angle-this.w_angle)*this.speed
			tx=this.x+Math.cos(angle)*speed;
			ty=this.y+Math.sin(angle)*speed;
			let f=true;
			for(let i=0;i<buildings.length;i++){          //处理移动后如果还碰撞,那么终止此次移动
				let b=buildings[i]
				for(let j=0;j<b.segments.length;j++){
					let s=b.segments[j]
					let h=s.getDistance({x:tx,y:ty})
					if(h<this.radius){
						f=false;
						break;
					}
				}
				if(!f){
					break;
				}
			}
			if(f){
				this.x=tx;
				this.y=ty;
			}
		}
		return hits;
	}



	render(ctx){
		ctx.save();
		ctx.fillStyle="#000";
		ctx.lineWidth=1;
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