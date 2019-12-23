class Editor {
  constructor() {

    this.textArea = document.getElementsByClassName('code-area')[0];
    this.lineNumberElement = document.getElementsByClassName('line-number')[0];
    this.textArea.oninput = this.inputChanged.bind(this);
    this.textArea.onscroll = this.scrollChange.bind(this);
    this.canvas = document.getElementById('app');
    this.canvas.onchange = this.removeCanvas.bind(this);
    this.createCanvas();
    this.saveBtnElement = document.getElementById('saveBtn');
    this.saveBtnElement.onclick = this.saveImage.bind(this);
  }
  saveImage() {
    //save canvas asimage
    //saving context
    this.saveBtnElement.href = this.canvas.toDataURL();
    this.saveBtnElement.download = 'canvas.jpg';
  }
  inputChanged() {
    document.getElementById('errorMsg').innerText = "";
    document.getElementById('errorMsg').parentElement.style.backgroundColor = '#191a21'
    let numberOfLine = this.countLine(this.textArea.value);
    let temp_arr = this.lineNumberElement.value.split('\n');
    let oldNumberOfLine = parseInt(temp_arr[temp_arr.length - 1]);
    //if there was change in line count
    if (numberOfLine != oldNumberOfLine) {
      this.updateRow(numberOfLine);
    }
    //checking the input validation using regrex and tokenize it using lexer
    this.lexInput(this.textArea.value);

  }
  lexInput(inputValue) {

    let lex = new Lexer(new InputStream(inputValue)).tokenize();
    if (lex != null) {
      //draw
      this.clearRect();
      console.log(lex)
      let parse = new Parser(lex, this.context).parse();
      let diagram = new Diagram(parse, this.context);
      diagram.draw()

    } else {
      this.clearRect();
      //show error
    }

  }

  scrollChange() {

    this.lineNumberElement.scrollTop = this.textArea.scrollTop;
  }
  updateRow(numberOfLine) {
    let tempstr = '';
    for (let i = 1; i <= numberOfLine; i++) {
      tempstr = tempstr + i.toString() + '\n';
    }
    this.lineNumberElement.value = tempstr;
  }
  countLine(text) {
    if (text == '') {
      return 1;
    }
    return text.split('\n').length;
  }
  createCanvas() {

    let wrapper = document.getElementById('wrapper-right');
    //checking for landscape or portrait mode status
    let wrapperWidth = parseInt(wrapper.style.width); //only parsing int from like 120px;
    let wrapperHeight = parseInt(wrapper.style.height);
    if (document.getElementById('rotateBtn').getAttribute('data-id') == 0) {
      //for portait mode
      this.canvas.width = wrapperWidth * 0.965;
    } else {
      //for landscape mode
      this.canvas.width = wrapperWidth * 0.974;
    }

    //making canvas height responsive as canvas content push it down
    //getting wrapper right
    this.canvas.height = wrapperHeight * 0.945;
    this.context = this.canvas.getContext('2d');
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.font = '18px Arial';

  }
  removeCanvas() {
    console.log("remove canvas");
    let wrapper = document.getElementById('wrapper-right');
    let wrapperWidth = parseInt(wrapper.style.width); //only parsing int from like 120px;
    let wrapperHeight = parseInt(wrapper.style.height);
    console.log(wrapperWidth)
    //removing canvas
    this.context = null;
    this.createCanvas()
    //redraw()
    let event = new Event('input');
    this.textArea.dispatchEvent(event);

  }
  clearRect() {
    this.context.clearRect(0, 0, 1000, 752);
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.font = '18px Arial';
  }

}