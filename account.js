//class to define 'account'
module.exports = class Account {
    //constructor then looks for the () list, and finds different properties of these
    constructor (name) {
        //this.xxxx looks for an individual instance of the class 'account' eg Row 4 in Excel, then this equals the variable date, which can be called
        this.name = name;
        // these are the owed and owes fields that will be needed to link transactions to accounts.
        //they are undefined because they don't exist in the data, but they are being made up to fill with owed/owes
        this.owes = []
        this.owed = []
        this.status = 0 //can use this to compare owes vs owed
    }

    outputStatus() {
        let outputString = this.name;
        
        outputString += "\n\nOWES:";
        for(let i = 0; i < this.owes.length; i++) {
            outputString += "\n" + this.owes[i].displayString()
        }
        outputString += "\n\nOWED:"
        for(let i = 0; i < this.owed.length; i++) {
            outputString += "\n" + this.owed[i].displayString()
        }
        return outputString
    }
    
}
