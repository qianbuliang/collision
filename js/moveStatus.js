class MoveStatus{
	constructor(speed){
		this.keys = {w: false, s: false, a: false, d: false}
		window.addEventListener("keydown",e=>{
			this.add(e.key)
		})
		window.addEventListener("keyup",e=>{
			this.remove(e.key)
		})
        //移动方向
		this.angle=0;
        //当前速度
		this.speed=0;
        //初始速度
		this.initspeed=speed;
	}

	add(key) {
        key=key.toLowerCase()
        if (key in this.keys)
            this.keys[key] = true
    }

    remove(key) {
        key=key.toLowerCase()
        if (key in this.keys)
            this.keys[key] = false;
    }

    update() {
        let k=0;
        if(this.keys.w){
            k-=1;
        }
        if(this.keys.s){
            k+=1;
        }
        if(this.keys.a){
            k-=3;
        }
        if(this.keys.d){
            k+=3;
        }
        if(k==0){
            this.speed=0;
            this.angle=0;
        }else{ 
            if(k==-1){
                this.angle=-Math.PI/2;
            }else if(k==1){
                this.angle=Math.PI/2;
            }else if(k==3){
                this.angle=0;
            }else if(k==-3){
                this.angle=Math.PI;
            }else if(k==-4){
                this.angle=Math.PI+Math.PI/4;
            }else if(k==4){
                this.angle=Math.PI/4;
            }else if(k==2){
                this.angle=-Math.PI/4;
            }else if(k==-2){
                this.angle=Math.PI-Math.PI/4;
            }
            this.speed=this.initspeed;
        }
    
    }
}