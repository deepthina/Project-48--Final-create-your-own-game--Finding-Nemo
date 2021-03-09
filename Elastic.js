class Elastic {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            length: 10,
            stiffness: 0.08
        }

        this.pointB = pointB;
        this.elastic = Constraint.create(options);
        World.add(world, this.elastic);
    }

    display() {

        if(this.elastic.bodyA){
        noStroke();
        line(this.elastic.bodyA.position.x, this.elastic.bodyA.position.y, this.pointB.x, this.pointB.y);
    }
}

    fly(){
        this.elastic.bodyA= null;
    }

    attach(body){
        this.elastic.bodyA=body;
    }
}