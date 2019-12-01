class CumulativeSum {
    constructor() {
        this.sum = 0;
    }

    add(num) {
        this.sum += num;
        return this;
    }
}

class SpecialMath {
    constructor(num) {
        this._num = num;
    }

    square() {
        return this._num ** 2;
    }

    cube() {
        return this._num ** 3;
    }

    squareRoot() {
        return Math.sqrt(this._num);
    }
}

class Command {
    constructor(specialMath) {
        this.specialMath = specialMath;
        this.commandsExecuted = [];
    }

    execute(command) {
        this.specialMath[command]();
        this.commandsExecuted.push(command);
    }
}

const attachArrayListener = (array, cb) => {
    Object.defineProperties(array, {
        push: {
            configurable: true,
            enumerable: false,
            writable: true,
            value: function (...args) {
                const result = Array.prototype.push.apply(this, args)
                cb("push", args);
                return result;
            }
        },
        pop: {
            configurable: true,
            enumerable: false,
            writable: true,
            value: function (...args) {
                const result = Array.prototype.pop.apply(this, args)
                cb("pop", result);
                return result;
            }
        }
    })
}

function listener(operation, value) {
    console.log(`${operation} ${value}`)
}

const x = new Command(new SpecialMath(5));
x.execute('square');
x.execute('cube');

console.log(x.commandsExecuted);

const users = ["Alex Banks", "Eve Porcello"];
attachArrayListener(users, listener);
users.pop();