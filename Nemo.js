class Nemo{
    constructor(x,y){
       var options={
           restitution:1,
           friction:1
       }
        this.body= Bodies.rectangle(x,y,150,100,options);
        this.image=loadImage("images/nemo_left.png");
        this.width=150;
        this.height=100;
        World.add(world, this.body);
    }

    display(){
        imageMode(CENTER);
        image(this.image,this.body.position.x, this.body.position.y,this.width,this.height);
    }
}