function Object(i, j) {

	this.i = i;
	this.j = j;
	this.x = this.i * w;
	this.y = this.j * w;



	this.show = function() {
		this.x = this.i * w;
		this.y = this.j * w;
		fill(0, 101, 192, 127);
		noStroke();
		rect(this.x + w/4, this.y + w/4, w/2, w/2);
	}

}