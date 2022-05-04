class All {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.width;
		this.height;
	}
}
class SpaceShip extends All {
	constructor(x, y) {
		super(x, y);

		this.width = 100;
		this.height = 100;

		this.img = new Image();
		this.img.src = "images/SpaceShip.png";
	}
	draw() {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
	update(direction) {
		this.x += direction*10;
		this.y += direction*10;
	}
	gotHit() {
		this.alive = 0;
		this.dead = 1;
	}
}
class Invader extends All {
	constructor(x, y, points) {
		super(x, y);

		this.width = 40;
		this.height = 40;

		this.direction = 1;

		this.alive = 1;
		this.dead = 0;

		//this.category = category;
		this.points = points;

		this.img = new Image();
		this.img.src = "images/invader.png";
	}
	draw() {
		ctx.drawImage(this.img, this.x, this.y, 40, 40);
	}
	update() {
		this.x += this.direction*1;
		//this.y += 0.1;
	}
	itGotHitBy(b) {
		if(Math.abs(this.x - b.x) < this.width && Math.abs(this.y - b.y) < this.height) {
			return 1;
		} else {
			return 0;
		}
	}
	itIsDead() {
		this.alive = 0;
		this.dead = 1;
	}
	changeDirection() {
		if(this.x <= 0) {
			this.direction = 1;
			this.y += 1;
		} else if(this.x >= canvas.width) {
			this.direction = -1;
			this.y += 1;
		}
	}
}
class Bullet extends All {
	constructor(x, y) {
		super(x, y);

		this.width = 2;
		this.height = 20;
	}
	draw() {
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	update() {
		this.y -= 2;
	}
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let score = 0;

let mouse = {
	x: 0,
	y: 0,
};

let bg = new Image();
bg.src = "images/hexagon-line.png";

let ss = new SpaceShip(Math.floor(innerWidth/2), Math.floor(innerHeight - 100));

let invaders = [];
for(let i = 0 ; i <= 30 ; i++) {
	invaders.push(new Invader(i*40, i/10));
}

let bullets = [];

//const audio1=document.createElement("audio");
//audio1.src="../sounds/bubblePop.ogg";

/*
let color=["#33ffff","#4799eb","#0073e6","#0000cc","#000080"];
let size=[3,4,5,6,7,8];
let speed=[0.015,0.02,0.023,0.025,0.03];
let radius=[250,260,270,280,290];
*/

/*
window.addEventListener("resize",function(){
	canvas.width=innerWidth;
	canvas.height=innerHeight;
});
*/

document.addEventListener("keydown", moveSpaceShip);
function moveSpaceShip(event) {
    if(event.keyCode == 37) {
		ss.x -= 10;
	} else if(event.keyCode == 39) {
		ss.x += 10;
	} else if(event.keyCode == 38) {
		bullets.push(new Bullet(ss.x + Math.floor(ss.width / 2), ss.y));
		console.log(bullets);
	}
}

function randomInt(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}

//no need to spawn them every second
//just send the ones that left the screen or which were bursted by player back down*/
/*
setInterval(keepBubbling,1000);
function keepBubbling(){
	for(i=0;i<5;i++){
		arr.push({x:randomInt(0,innerWidth),y:randomInt(innerHeight,innerHeight*2),color:color[randomInt(-1,5)]});
	}
}
*/
/*
for(i=0;i<100;i++){
	arr.push({x:randomInt(0,innerWidth),y:randomInt(innerHeight,innerHeight*10),color:color[randomInt(-1,5)]});
}
*/

requestAnimationFrame(animate);
function animate(){
	//ctx.fillStyle='rgb(225,225,225,0.1)'; //white color with last parameter as opacity between 0 and 1
	//ctx.fillRect(0,0,innerWidth,innerHeight);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	ctx.drawImage(bg, 0, 0, innerWidth, innerHeight);

	ctx.textAlign = "start";
	ctx.font = "30px georgia";
	ctx.fillStyle = "black";
	ctx.fillText("score: " + score, 20, 20);

	ss.draw();

	bullets.forEach(b => {
		b.draw();
		b.update();
	})

	let i = 0;
	let remove = [];
	invaders.forEach(inv => {
		inv.draw();
		inv.changeDirection();
		inv.update();

		bullets.forEach(b => {
			if(inv.itGotHitBy(b)) {
				remove.push(i);
				//invaders.splice(i, 1);
				inv.itIsDead();
			}
		});
		i++;
	});

	for(let i = 0 ; i < remove.length ; i++) {
		invaders.splice(remove[i], 1);
	}
	requestAnimationFrame(animate);
}
