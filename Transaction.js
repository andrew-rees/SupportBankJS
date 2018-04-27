

//class to define 'transaction'
module.exports = class Transaction {
    //constructor then looks for the () list, and finds different properties of these
    constructor (date, from, to, narrative, amount) {
        //this.xxxx looks for an individual instance of the class 'transaction' eg Row 4 in Excel, then this equals the variable date, which can be called
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }

    displayString() {
        return "DATE: " + this.date + " TO: " + this.to + " THIS MUCH: " + this.amount + " FOR THIS: " + this.narrative;
    }
    
}

