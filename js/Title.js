class Title {
  constructor(title, context) {
    this.title = title;
    this.context = context;
  }
  draw() {
    //getting text width
    let textWidth = this.context.measureText(this.title).width + 15;
    let rectHeight = 40;
    let rectWidth = (textWidth > 30) ? textWidth : 30;
    let xpos = 40;
    let ypos = 20;
    this.context.font = '18px Arial';
    this.context.fillStyle = "black";
    this.context.fillText(this.title, xpos + 8 + rectWidth / 2 - textWidth / 2, ypos + 5 + rectHeight / 2);
    this.context.strokeStyle = 'black';
    this.context.setLineDash([]);
    this.context.strokeRect(xpos, ypos, rectWidth, rectHeight);

  }
}