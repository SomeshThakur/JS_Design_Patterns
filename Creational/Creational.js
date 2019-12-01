// Person Types

const SHOPPER = 1;
const EMPOLYEE = 2;


class PersonFactory {

    createPerson(type = SHOPPER, name, money) {
        if (type === SHOPPER) {
            return this._createShopper(name, money);
        } else if (type === EMPOLYEE) {
            return this._createEmpolyee(name, money);
        } else {
            console.error("Person Type Unknown");
        }
    }

    _createShopper(name, money) {
        return new Shopper(name, money);
    }

    _createEmpolyee(name, money) {
        if (this.empolyee) {
            console.warn("Empolyee already initialized. Returning old instance.");
            return this.empolyee;
        }
        this.empolyee = new Employee(name, money);
        return this.empolyee;
    }
}




class Person {

    constructor(name = 'unnamed person') {
        this.name = name;
    }
}

class Shopper extends Person {

    constructor(name, money = 0) {
        super(name);
        this.money = money;
        this.employed = false;
    }
}

class Employee extends Shopper {

    constructor(name, money = 0, employer = '') {
        super(name, money);
        this.employerName = employer;
        this.employed = true;
    }
}


let personFactory = new PersonFactory();
let myShopper = personFactory.createPerson(SHOPPER, "Alex Banks", 100);
let myEmpolyee = personFactory.createPerson(EMPOLYEE, "Eve Porcello", 100);


console.log("Shopper Name : " + myShopper.name + " Money :" + myShopper.money);
console.log("Empolyee Name : " + myEmpolyee.name + " Money :" + myEmpolyee.money);


let myEmpolyee1 = personFactory.createPerson(EMPOLYEE, "Eve Porcello", 100);
