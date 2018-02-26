// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
    
  return num;
}

function velocity(range) {
    var sign = Math.random()
    var speed = Math.random()*range*2;
    if(sign>0.5){
        return speed;
    } else {
        return -(speed);
    }
}

function Ball(x, y, velX, velY, color, size, status) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.status = status;
    
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function(dist) {
    
    var color = 0;
    
    if(dist==="far") {
        var resetSize = 0.5;
    }else{
        var resetSize = 1;
    }
    

    if( ((this.x + this.size) >=width) || ((this.x - this.size) <= 0)
        || ((this.y + this.size) >= height) || ((this.y - this.size) <= 0) ) {
            this.x = width/2;
            this.y = height/2;
            this.size = resetSize;
            color = 0;
            if(!(dist==="far")) {
                this.velX = velocity(2);
                this.velY = velocity(2);
            } else {
                this.velX = velocity(1);
                this.velY = velocity(1);
            }
        }
    
    
    if(dist=="far"){
        if(!(this.size > 1)){
            this.size += 0.001;

        }
    }else{
        this.size += 0.01;
       
    }
    
    if(this.size > 0){
        this.velX *= (this.size*0.003)+1;
        this.velY *= (this.size*0.003)+1;
    }
        

        this.x += this.velX;
        this.y += this.velY;
    
}

/* Ball.prototype.checkBounds = function() {
    if((this.x + this.size) >=width) || ((this.x - this.size) <= 0) 
        || ((this.y + this.size) >= height) || ((this.y - this.size) <= 0)) {
            return true;
        }else{
            return false;
        }
} */

Ball.prototype.resetStar = function() {
        this.x = width/2;
        this.y = height/2;
        this.size = .5;
    }


/* Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
            if(!(this===balls[j])) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                
                if(balls[j].status) {
                    if(distance<this.size+balls[j].size) {
                        balls[j].status = this.status = 0;
                        
                        }
                }
    }
}
}*/

var balls = [];
var farStars = [];

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,width,height);
    
    while (balls.length < 25) {
        var ball = new Ball(width/2,height/2,velocity(2),velocity(2),'rgb(255,255,255)',1,1);
        
        balls.push(ball);
    }
    
    while (farStars.length < 100) {
        var star = new Ball(width/2,height/2,velocity(.5),velocity(.5),'rgb(255,255,255)',1,1);
        farStars.push(star);
    }
    
    for (var i = 0; i < balls.length; i++) {
        if(balls[i].status) {
            balls[i].draw();
            balls[i].update();
            //balls[i].collisionDetect();
        }
    }
    
    for (var j = 0; j < farStars.length; j++) {
        farStars[j].draw();
        farStars[j].update("far");
    }
    
    requestAnimationFrame(loop);
}

function windowSize() {
    alert('Width: '+width+' Height: '+height);
}

loop()
