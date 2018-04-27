///////////////////////////
// 0) NOTES ////
//////////////////////////

//need to access the .CSV file 
    //("Either parse the file yourself, or search NPM for a relevant CSV parsing library!")
//need to order it in a way that the JS can understand -  
    //"Use a class for each type of object you want to create." 
    //- what objects do I need? Date, from, to, narrative, amount, so 4 objects - Date, user, narrative and amount?
    // Do I need to define a variable 'transaction' with different objects - Date, user, narrative and amount?
    // Are From and To users to different objects, or just 1 object used differently? 1 OBJECT USED DIFFERENTLY

//create an account for each person (create an accountName 
//find a way to link a transaction to an account, coming from another account - IF TRANSACTION IS THE VAR, THIS WOULD WORK
//need to take input from readline.prompt() of two types:
    //- List All, should output the names of each person, and the total amount they owe, or are owed.
    //- List [Account], should also print a list of every transaction, with the date and narrative, for that account with that name.
//Functions required:
    //Finds all names, sees what they are owed (in to), and owe (in from)
    //Finds all transations that involve a user in from or to


///INPUT
    // 1) Read file, parse and print DONE
    // 2) Create suitable data structure to store transations, and populate them
    // 3) List All console output, and work out what to print out 
    // 4) Create data structure for accounts
    // 5) List Account console output, and work out what to print out 

//////////////////////////////////////
// 0a) REQUIREMENTS //////////////////
/////////////////////////////////////

//allows readline prompt to be used
const readline = require('readline-sync');

//allow use of transaction.js
const Transaction = require('./Transaction.js');

//allow use of account.js
const Account = require('./account.js');

//to allow moment for time
const moment = require("moment");
//defines format
moment().format("MMM-Do-YYYY");

//use it
let aTime = moment ();
console.log(aTime);

// let sixthJuly2018 = moment ("06.06.2018");
// console.log(sixthJuly2018);

// 1 - require moment, and call moment
// 2 - tell moment that the dates in the csv are in a certain format
// 3 - convert the csv dates into a format moment can understand, as dd-mm-yyyy doesn't seem to be in ISO or RFC
// 4 - 


/////////////////////////////////////
// 1) READ FILE, PARSE AND PRINT////
////////////////////////////////////

//defines how to 'get' the data from the file, using fs already in Node
const fs = require('fs');

//define this data as a variable 'Transaction2014FileContents', then call method .readFileSync that locates the file, then .toString() turns the data into a readable format to the console (in this caase, utf8)
const Transaction2014FileContents = fs.readFileSync("Transactions2014.csv").toString('utf8');

//show all the data, just to be sure
//console.log("Before separation " + Transaction2014FileContents);

//split the data into separate parts and define this as var
var splitTransaction2014FileContents = Transaction2014FileContents.split('\r\n');

//show all the split data, just to be sure
//console.log(splitTransaction2014FileContents);
//console.log("_________DATA LIST ABOVE, PROPER OUTPUTS BELOW_____________")

///////////////////////////////////////////////////////////////////////////
// 2) CREATE SUITABLE DATA STRUCTURE TO STORE TRANSACTIONS AND ACCOUNTS////
///////////////////////////////////////////////////////////////////////////


//LOOP FOR TRANSACTIONS//

// variable transactionList, is the variable (set of data) that the string data is put into, then separated out within
let transactionList = []
//For loop will start from line 0, run until the last liine of splitT2014, each time moving along 1 line
for(var i = 1; i < splitTransaction2014FileContents.length; i++){
    //churns out the data in rows, one after the other, because i is in the variable
    let transactionRow = splitTransaction2014FileContents[i];
    // splits the rows nearly into an array
    let cells = transactionRow.split(',');
    // this prevents faulty data displaying (will need this later)
    if (cells.length === 5) {
        //not sure, but I think this 'pushes' the row of data out towards the console.log (when run).
        transactionList.push(new Transaction(
                //each of these is the array reference column (in excel)
                cells[0], cells[1], cells[2], cells[3], cells[4]
            )
        );
    }
}

 //For loop to count total Amount owed
 var totalAmount = 0
 for(let i = 1; i < transactionList.length; i++){
    totalAmount += +transactionList[i].amount;
}

/////////////
//ACCOUNTS//
////////////

//function to check if Account already exists, if so, don't run, if it does, run
function contains (accountList, from){
    for (let i = 1; i < accountList.length; i++){
         //define account as the i-th account - the one the code is 'on'
        let account = accountList[i];
        //if the from name is the same as the account name, then be true
        if (from === account.name){
            return true
        }
    }
    return false
}
//function to find an existing Account
function find (accountList, from){
    for (let i = 1; i < accountList.length; i++){
        //define account as the i-th account - the one the code is 'on'
        let account = accountList[i];
        //if the from name is the same as the account name, return the account value
        if (from === account.name){
            return account
        }
    }
}

////LOOP FOR ACCOUNTS////
let accountList = []
for (let i = 1; i < transactionList.length; i++) {
    //now want to loop thru each transaction, pull out name columns.
    //this defining the current (the i-th) transaction as 'transaction'
    let transaction = transactionList[i];
    //console.log(transaction);
    let from = transaction.from;
    //console.log(from);
    let to = transaction.to;
    //console.log(to);
    //FROM so, if 'contains' function (that references account list and from), detects a new account where the from is not already in the list, push
    if(!contains(accountList, from)) {
        //define a variable newAccount, so that when code runs, we can tell it to allocate the owed to this
        var newAccount = new Account(from);
        accountList.push(newAccount);
        // and push to its transactions (owes)
        newAccount.owes.push(transaction);
    } else {
        // use the find function to equal var foundAccount
        let foundAccount = find(accountList, from);
        // push this transaction to its owes
        foundAccount.owes.push(transaction);
        
    }
    //TO so, if 'contains' function (that references account list and from), does not (becuse it's got !) detect a new account where the from is not already in the list, push
    if(!contains(accountList, to)) {
        //define a variable newAccount, so that when code runs, we can tell it to allocate the owed to this
        var newAccount = new Account(to);
        accountList.push(newAccount);
        // and push to its transactions (owed)
        newAccount.owed.push(transaction);
    } else {
        // use the find function to equal var foundAccount
        let foundAccount = find(accountList, to)
        // push this transaction to its owed
        foundAccount.owed.push(transaction)
    }
}

console.log("-----------------------------------------------------------------\nThis is how many accounts there are with the Support Desk: " + accountList.length + "\nThis is how much they owe in total, £" + totalAmount + "\n-----------------------------------------------------------------");

///////////////////////////////
// 3) LISTALL and LISTNAME//////////////////
//////////////////////////////

//prompt for input, then define it as a constant
console.log("\nIf you want to see all employees, and what their balance is with the Support Desk, please enter All. \nIf you would like to see the balance of a particular person, please enter their first name and first letter of surname.")
const inputReadline = readline.prompt();

//take inputReadline and interpret it. 
//if all, show all, if something else, define this as var and do another if/else
    //then if name matches account name, show account
    //else, show error
// let userEnteredAll = []
// let userEnteredNameOrNothing = []
if (inputReadline.toLowerCase() === "All".toLowerCase()) {
    console.log("Thanks! Below is a list of all user and the amounts they owe, are owed, and the total amount of debt/credit:");
    //to do pretty printing
    console.log(accountList);
}
else {
    var matchingAccount = undefined;
    for (let i = 1; i < accountList.length; i++) {
        let account = accountList[i]
        if (inputReadline === account.name){ 
            matchingAccount = account; 
        }
    }    
 }
    // todo loop and match/push
    if(matchingAccount) {
        // we found it!
        console.log("-----------------------\n" + matchingAccount.outputStatus() + "\n------------------------------");
    } else {
        // we found nothing
        console.log("Sorry, no matches for that name")
        //loop back up to name input
        console.log("Would you like to do another search? Y/N")
        const inputAgain = readline.prompt();
            if (inputAgain.toLowerCase() === "y".toLowerCase()){
            console.log("ok, let's do another search");
        //loop back to name input
}
    }
console.log("Would you like to do another search? Y/N")
    const inputAgain = readline.prompt();
    if (inputAgain.toLowerCase() === "y".toLowerCase()){
    console.log("ok, let's do another search");
    //loop back to name input
}
else {
    console.log("Thanks anyway")
}


//To Do:
// 1) Format All list to be like individual list (look at how individual sections are returned)
// 2) Work out why "sorry no matches" appears at end of All list
// 3) After Another Search - how to loop this back to name input - do while loop
// 4) After "Sorry, no matches" - how to loop this back to name input - do while loop
// 5) Set up moment for dates
//
