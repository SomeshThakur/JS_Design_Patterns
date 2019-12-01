class OldCalculator {
    constructor() {
        this.operations = function (term1, term2, operation) {
            switch (operation) {
                case 'add':
                    return { res: term1 + term2 };
                case 'sub':
                    return { res: term1 - term2 };
                default:
                    return NaN;
            }
        };
    }
}

class NewCalculator {
    constructor() {
        this.multiply = function (term1, term2) {
            return term1 * term2;
        };
        this.divide = function (term1, term2) {
            return term1 / term2;
        };
    }
}

class UltimateCalculator extends NewCalculator {
    constructor() {
        super();
        this.oldCalculator = new OldCalculator();
    };

    add(n1, n2) {
        return this.oldCalculator.operations(n1, n2, 'add').res;
    };

    sub(n1, n2) {
        return this.oldCalculator.operations(n1, n2, 'sub').res;
    }
}


class CleverCalculator {
    constructor() {
        this.cacheResults = {
            add: {},
            sub: {},
            multiply: {},
            divide: {}
        };
        this.ultimateCalculator = new UltimateCalculator();
    }

    operations(type, n1, n2) {
        switch (type) {
            case 'add':
                if (!this.cacheResults[type][`${n1}+${n2}`])
                    this.cacheResults[type][`${n1}+${n2}`] = this.ultimateCalculator.add(n1, n2)
                return this.cacheResults[type][`${n1}+${n2}`]

            case 'sub':
                if (!this.cacheResults[type][`${n1}-${n2}`])
                    this.cacheResults[type][`${n1}-${n2}`] = this.ultimateCalculator.sub(n1, n2)
                return this.cacheResults[type][`${n1}-${n2}`]

            case 'multiply':
                if (!this.cacheResults[type][`${n1}*${n2}`])
                    this.cacheResults[type][`${n1}*${n2}`] = this.ultimateCalculator.multiply(n1, n2)
                return this.cacheResults[type][`${n1}*${n2}`]

            case 'divide':
                if (!this.cacheResults[type][`${n1}/${n2}`])
                    this.cacheResults[type][`${n1}/${n2}`] = this.ultimateCalculator.divide(n1, n2)
                return this.cacheResults[type][`${n1}/${n2}`]
        }
    }
}

class CleverCalculatorWrapper extends CleverCalculator {
    constructor() {
        super();

    }
    cal(type, n1, n2) {
        let result = this.operations(type, n1, n2);
        console.log(`LOG : ${type} of ${n1} and ${n2} is ${result}`)
        return result;
    }
}

class CalcAdapter {
    constructor() {
        this.newCalculator = new NewCalculator();
    }

    multiply(obj, n) {
        this.newCalculator.multiply(obj.res, n)
    }
}


//Task-A
const oldCalculator = new OldCalculator();
const calcAdapter = new CalcAdapter();
calcAdapter.multiply(oldCalculator.operations(3, 2, 'sub'), 6);

//Task-B
const ultimateCalculator = new UltimateCalculator();
console.log('multiplication', ultimateCalculator.multiply(10, 50))
console.log('addition', ultimateCalculator.add(79, 58))

//Task-C and Task-D
const cleverCalculator = new CleverCalculatorWrapper();
console.log('Addition: ', cleverCalculator.cal('add', 46, 75))
console.log('Subtraction: ', cleverCalculator.cal('sub', 125, 45))
console.log('Multiplication: ', cleverCalculator.cal('multiply', 79, 45))
console.log('Divide: ', cleverCalculator.cal('divide', 19, 63))
