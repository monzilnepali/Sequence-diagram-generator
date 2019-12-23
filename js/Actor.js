class Actor {
  constructor(x, y, name, context) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.context = context;
    this.rectWidth = this.context.measureText(name).width + 40;
    this.rectHeight = 30;
    this.width = 0;
  }
  updateWidth(message) {
    console.log("width updated")
    this.message = message;
    let messageWidth = this.context.measureText(this.message).width;
    this.width = (messageWidth > 150) ? messageWidth : 150;
  }
  updateX(x) {
    this.x = x;
  }
  draw() {
    this.context.beginPath();
    //aligning text at center of rect
    this.context.fillStyle = "black";
    this.context.fillText(this.name, this.x + this.rectWidth / 2 - (this.rectWidth - 40) / 2, this.y + this.rectHeight / 2 + 10 / 2);
    this.context.strokeStyle = 'black';
    this.context.setLineDash([]);
    this.context.strokeRect(this.x, this.y, this.rectWidth, this.rectHeight);
    //drawing line below actor
    this.drawLine();


  }
  drawLine() {
    this.context.beginPath();
    this.context.rect(this.x + this.rectWidth / 2, this.y + this.rectHeight, 2, Diagram.yMax - 70);
    this.context.fillStyle = 'black';
    this.context.fill();
  }
}