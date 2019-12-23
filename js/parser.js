class Parser {
  constructor(tokens, context) {
    this.tokens = tokens;
    this.context = context;
    this.signals = [];
    this.actors = [];
    this.title = [];
    this.ypos = 75;
    this.xposFirst = 40;
  }
  parse() {
    this.uniqueActorArray();
    return {
      title: this.title,
      actors: this.actors,
      signals: this.signals
    };

  }

  uniqueActorArray() {
    this.tokens.forEach((token, index) => {
      let actor = [];
      let arrowType = "";
      let message = "";
      let swapFlag = false;
      token.forEach((element) => {
        if (element.type === 'actor') {
          actor.push(element.value)
        } else if (element.type === 'arrow') {
          arrowType = element.value;
        } else if (element.type === 'message') {
          message = element.value
        } else if (element.type === 'Title') {
          this.title = element.value

        }
      });

      actor.forEach((name, index) => {

        //first actor:(0,0)
        if (this.actors.length == 0) {
          this.actors.push(new Actor(this.xposFirst, this.ypos, name, this.context));
        } else if (this.actors.length != 0 && this.findActor(name) === null) {
          //new actor element
          if (index == 0) {
            //message sender
            let lastActor = this.actors[this.actors.length - 1];
            //message is send to identify width
            this.actors.push(new Actor(lastActor.x + 150, this.ypos, name, this.context));
          } else {
            //message receiver

            let lastActor = this.actors[this.actors.length - 1];
            let senderActorX = this.findActor(actor[0]).value.x;
            //getting text width
            let txtWidth = this.context.measureText(message).width + 40;
            //text width from sender actor
            let xpos = senderActorX + txtWidth;
            let secondX = lastActor.x + 150;
            //new actor shifting
            //lastactor +150 or sendactor.x+textwidth 
            //new actor position will be maxinum between above
            if (secondX > xpos) {
              xpos = secondX;
            }

            this.actors.push(new Actor(xpos, this.ypos, name, this.context));
          }
        } else {

          if (index != 0) {

            //getting first actor 
            let from = this.findActor(actor[0]);
            let to = this.findActor(actor[1]);
            let actor1 = from.value;
            let actor2 = to.value;
            if (actor1.name == actor2.name) {
              console.log("same actor")
              actor1.updateWidth(message);

            } else {
              if (to.index < from.index) {
                //swapping

                swapFlag = true;
                let temp = actor2;
                actor2 = actor1;
                actor1 = temp;
              }

              //update x of actor 
              let textWidth = this.context.measureText(message).width + 40;
              textWidth = (textWidth < 150) ? 150 : textWidth;
              let width = actor1.x + textWidth;
              if (width < actor2.x) {
                width = actor2.x;
              }
              actor2.updateX(width);
            }
          }
        }

      });
      if (actor.length != 0) {
        this.signals.push(new Signal(message, actor, swapFlag, arrowType));
      }
    });
  }
  signalArray() {
    this.tokens.forEach((element, index) => {
      if (element.type == 'col') {
        this.signals.push({
          index: index,
          actor1: this.findActor(this.tokens[index - 3].value),
          arrowType: this.tokens[index - 2].value,
          actor2: this.findActor(this.tokens[index - 1].value),
          message: this.tokens[index + 1].value
        });
      }
    });

  }

  findActor(name) {
    //find actor along with index
    //index is used to check which actor defined first 
    for (let i = 0; i < this.actors.length; i++) {
      if (this.actors[i].name === name) {
        return {
          index: i,
          value: this.actors[i]
        };
      }
    }
    return null;
  }
}