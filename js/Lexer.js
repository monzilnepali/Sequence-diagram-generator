class Lexer {
  constructor(input) {
    this.input = input;
    this.keyword = " Title Note right of  left of ";
    this.token = [];
    this.tempToken = [];
    this.parseFlag = false;
    this.errorElement = null;
  }
  is_char(ch) {
    return /[a-zA-z]/.test(ch);
  }
  is_keyword(x) {
    return this.keyword.indexOf(" " + x + " ") >= 0;
  }
  is_whitespace(ch) {
    return " \t\n".indexOf(ch) >= 0;
  }
  is_arrow(ch) {
    return "->".indexOf(ch) >= 0;
  }
  readWhile(predication) {
    let str = "";
    while (!this.input.eof() && predication(this.input.peek())) {
      str += this.input.next();
    }
    return str;
  }

  readString() {
    let str = "";
    while (this.is_char(this.input.peek()) && !this.input.eof()) {
      str += this.input.next();
    }
    return str;
  }
  readMessage() {
    let str = "";
    while (!this.input.eof() && this.input.peek() != '\n') {
      str += this.input.next();
    }
    return str;
  }

  readArrowSign() {
    let str = "";
    while (this.is_arrow(this.input.peek()) && !this.input.eof()) {
      str += this.input.next();
    }
    return str;

  }
  readNext() {
    //first skip white space
    this.readWhile(this.is_whitespace);
    //if eof return null;
    if (this.input.eof()) return null;
    let ch = this.input.peek();
    try {
      if (this.is_char(ch)) {
        let str = this.readString();
        if (this.is_keyword(str)) {
          this.token.push({
            type: 'token',
            value: str
          });
        } else {
          this.token.push({
            type: 'actor',
            value: str
          });
        }

      } else if (ch === "-") {
        /*
        checking if there is any actor before arrow sign
        if not show error
        */
        if (this.token.length != 0 && this.token[this.token.length - 1].type === 'actor') {
          let readArrowSign = this.readArrowSign();
          let arrowSign = "";
          if (readArrowSign === '->') {
            arrowSign = 'msg'
          } else if (readArrowSign === '-->') {
            arrowSign = 'reply'
          } else {
            throw new ValidationError(`unexpected ' ${ch} ' at [${this.input.line},${this.input.col}]`);
          }
          this.token.push({
            type: 'arrow',
            value: arrowSign
          });
        } else {
          throw new ValidationError(`Actor expected at [${this.input.line},${this.input.col}]`);
        }



      } else if (ch == ":") {
        //before : there must be actor or Title keyword to be valid

        if (this.token.length == 1) {
          // 1 length before : expected title keyword
          if (this.token[this.token.length - 1].type === 'token') {
            this.input.next();
            this.token.push({
              type: 'Title',
              value: this.readMessage()
            });
            this.tempToken.push(this.token);
            this.token = [];
            this.parseFlag = true;
          } else {
            throw new ValidationError(`Expected Title keyword  at [${this.input.line},${this.input.col-1}]`);
          }
        } else {
          if (this.token.length !== 0 && this.token[this.token.length - 2].type === 'arrow') {
            if (this.token[this.token.length - 1].type === 'actor') {
              this.parseFlag = true;
              this.token.push({
                type: 'col',
                value: this.input.next()
              });
              //reading string after :
              this.token.push({
                type: 'message',
                value: this.readMessage()
              });
              this.tempToken.push(this.token);
              this.token = [];
            } else {
              throw new ValidationError(`Actor expected at [${this.input.line},${this.input.col}]`);
            }
          } else {
            throw new ValidationError(`unexpected ${ch} at [${this.input.line},${this.input.col}]`);
          }
        }



      }
    } catch (error) {
      //showing error message
      document.getElementById('errorMsg').innerText = error.message;
      document.getElementById('errorMsg').parentElement.style.backgroundColor = 'red'
    }
  }




  tokenize() {
    let counter = 0;
    while (counter != this.input.length) {
      this.readNext();
      counter++;
    }
    if (!this.input.errorFlag && this.parseFlag) {
      return this.tempToken;
    } else {
      return null;
    }

  }




}