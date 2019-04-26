class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}

	getDistance(p){
        return Math.sqrt(Math.pow(p.y-this.y,2)+Math.pow(p.x-this.x,2));
    }
}