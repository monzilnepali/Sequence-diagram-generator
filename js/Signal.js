class Signal {
  constructor(message, actors, swap, arrowType) {
    this.message = message;
    this.actors = actors;
    this.swap = swap;
    this.arrowType = arrowType;


  }
  draw(x1, x2, y, context) {
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;
    this.context = context;
    //display line

    if (this.arrowType == 'msg') {
      this.context.setLineDash([]);
    } else if (this.arrowType == 'reply') {
      this.context.setLineDash([10, 10]);
    }
    if (this.x1 == this.x2) {
      //sending message to self
      //console.log("sending messag to self")
      this.context.beginPath();
      this.context.moveTo(this.x1, this.y);
      this.context.lineTo(this.x1 + 40, this.y);
      this.context.lineTo(this.x1 + 40, this.y + 20);
      this.context.lineTo(this.x1, this.y + 20);
      this.context.stroke();
      this.context.fillText(this.message, this.x1 + 5, this.y - 10)
      this.drawArrowPointer(true);
    } else {
      this.context.beginPath();
      this.context.moveTo(this.x1, this.y);
      this.context.lineTo(this.x2, this.y);
      this.context.stroke();
      //display message
      let textWidth = this.context.measureText(this.message).width;
      if (this.swap) {
        let temp = this.x2;
        this.x2 = this.x1;
        this.x1 = temp;
      }
      let distance = Math.abs(x2 - x1);
      let centerX = this.x1 + distance / 2 - textWidth / 2;
      this.context.fillStyle = 'black';
      this.context.fillText(this.message, centerX, y - 8);
      this.drawArrowPointer(this.swap);
    }
  }
  drawArrowPointer(direction) {
    //direction true:point to left side
    //direction false=point to right side

    this.context.beginPath();
    if (direction) {
      this.context.moveTo(this.x1 + 1, this.y);
      this.context.lineTo(this.x1 + 11, this.y + 8);
      this.context.lineTo(this.x1 + 11, this.y - 8);
    } else {
      this.context.moveTo(this.x2, this.y);
      this.context.lineTo(this.x2 - 8, this.y - 8);
      this.context.lineTo(this.x2 - 8, this.y + 8);
    }
    this.context.fill();
  }

}