class Bullet {
    constructor(x, y, speed, color, angle, life = 1000) {
        this.first = new BulletPoint(x, y, 1);
        this.speed = speed;
        this.type='point'
        this.life = life;
        this.color = color;
        this.angle = angle;
        let cur = this.first;
        let alpha = 1;
        for (let i = 0; i < 10; i++) {
            alpha = Math.max(0.1, alpha *= 0.8)
            let p = new BulletPoint(x, y, alpha);
            cur.next = p;
            cur = p;
        }
    }


    update(buildings){
         let bx=this.x+Math.cos(this.angle)*this.speed
         let by=this.y+Math.sin(this.angle)*this.speed
         let bt={x:bx,y:by}
         let collision=null
         let bv=new Segment(new Point(this.x,this.y),new Point(bx,by))
         buildings.forEach(b=>{
            b.segments.forEach(s=>{
               let temp=bv.getIntersection(s)
                if(temp&&(!collision||temp.rate<collision.rate)){
                 collision=temp;
             }  
            })
         })
         
         if(collision){
             let angle=2*collision.angle-this.angle
             let x=collision.x;
             let y=collision.y;
             this.angle=angle;
             x+=Math.cos(this.angle)*0.00001
             y+=Math.sin(this.angle)*0.00001
             this.move(x,y);
         }else{
            this.move(bx,by);
         }
    }

    get x() {
        if (this.first) {
            return this.first.x
        } else {
            return 0;
        }
    }

    set x(val) {
        if (this.first) {
            this.first.x = val;
        }
    }

    get y() {
        if (this.first) {
            return this.first.y
        } else {
            return 0;
        }
    }

    set y(val) {
        if (this.first) {
            this.first.y = val;
        }
    }


    move(x,y) {
        if (this.first) {
          this.first.move(x,y)
        }
    }

    render(ctx) {
        let cur = this.first;
        if (this.first) {
            ctx.lineWidth = 4
            while (cur.next) {
                ctx.strokeStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + cur.alpha + ")"
                ctx.beginPath();
                ctx.moveTo(Math.round(cur.x), Math.round(cur.y));
                cur = cur.next;
                ctx.lineTo(Math.round(cur.x), Math.round(cur.y));
                ctx.closePath()
                ctx.stroke();
            }
        }
    }
}


class BulletPoint {
    constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.alpha = alpha;
    }

    move(x, y) {
        if (this.next) {
            this.next.move(this.x, this.y);
        }
        this.x = x;
        this.y = y;
    }
}