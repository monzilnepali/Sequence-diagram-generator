class InputStream {
  constructor(input) {
    this.input = input;
    this.length = this.input.length;
    this.pos = 0;
    this.line = 1;
    this.col = 1;
    this.errorFlag = false;
    this.lineElement = document.getElementById('line');
    this.colElement = document.getElementById('col');
  }
  /**
   * read each character from input stream 
   * if \n then update line number and col otherwise increase column number
   * return the next character in inputstream
   */
  next() {

    var ch = this.input.charAt(this.pos++);
    if (ch == '\n') {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }

    //display line and col num
    this.lineElement.innerText = this.line;
    this.colElement.innerText = this.col;
    return ch;
  }

  /**
   * get character at specific position in stream
   */
  peek() {
    return this.input.charAt(this.pos);
  }
  /**
   * end of file which return true if there is not character left to readNext
   */
  eof() {
    return this.peek() == "";
  }
  /**
   * return error message along with line number and column
   */
  error(char) {
    this.errorFlag = true;
    console.log(`unexpected ${char} at line: ${this.line} ,column:  ${this.col}`);

  }

}