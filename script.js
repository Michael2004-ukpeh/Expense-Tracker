//constants
let balance = document.querySelector('.balance-text')
let incomeAmount = document.querySelector('.income-amount')
let expenseAmount = document.querySelector('.expense-amount')
let historyList = document.querySelector('.history-list')
let close = document.querySelector('.close')
let description = document.getElementById('description')
let amount = document.getElementById('amount')
let form = document.querySelector('.form')
let modal = document.querySelector('.modal');
let button = document.querySelector('.btn');
let closeSign = document.querySelector('.close-sign')

let transList = localStorage.getItem('transaction') !== null ? JSON.parse(localStorage.getItem('transaction')) : []

let globalID;
//Modal Functions

close.addEventListener('click', () => {
    modal.style.display = "none"
    description.value = ""
    amount.value = ""
})
form.addEventListener('submit', (e) => {
    e.preventDefault();


    addTrans(description.value, parseFloat(amount.value))


})




//Expense Math...
const addTrans = (descrip, amount) => {
        if (descrip.trim() === '' && amount === '' && isNaN(amount) === true) {
            alert('Please add a text and amount');
        } else {
            modal.style.display = "block"
            let transaction = {
                id: Math.floor(Math.random() * 100000000),
                description: descrip,
                amount: amount
            }
            transList.push(transaction)
            console.log(transList)
            createHistory(transaction)
            balanceUpdate()
            updateAmounts(transaction.amount)
            updateStorage()

        }


    }
    //local Storage
const updateStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transList))
}

const createHistory = (trans) => {
    let { description, amount, id } = trans
    globalID = id
    let komkom = document.createElement('div')
    let sign, border;
    if (amount >= 0) {
        sign = "income "
        border = "income-border"
    } else {
        sign = "expense"
        border = "expense-border"
    }
    komkom.className = `transaction ${border} `
    komkom.innerHTML = `<p>${description}</p>
       <p class=${sign}>${amount.toFixed(2).toString()}</p>`

    historyList.appendChild(komkom)

}


//remove item

// const removeItem = (id) => {
//     let newList = transList.filter((item) => item.id !== id)
//     localStorage.setItem('transaction', JSON.stringify(newList))
// }

const balanceUpdate = () => {
    // let amount = amt
    // let balanceValue = 
    const amounts = transList.map(transaction => transaction.amount);
    console.log(amounts)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    console.log(total)
    balance.innerText = total.toString();
}


const updateAmounts = (amt) => {
    const amounts = transList.map(transaction => transaction.amount)
    if (amt >= 0) {
        let incomeFiltered = amounts.filter((amt) => amt >= 0)
        incomeFiltered = incomeFiltered !== [] ? incomeFiltered : [0, 0]

        let incomeTotal = incomeFiltered.reduce((total, item) => {
            return total += item
        }).toFixed(2)
        incomeAmount.innerText = incomeTotal.toString();
        console.log(incomeTotal)
    }
    let expenseFiltered = amounts.filter((amt) => amt < 0)
    expenseFiltered = expenseFiltered !== null ? expenseFiltered : []
    console.log(expenseFiltered)
    let expenseTotal = expenseFiltered.reduce((total, item) => {
        return total += item
    }, 0)
    console.log(expenseTotal)
    expenseTotal = (expenseTotal * -1).toFixed(2)
    expenseAmount.innerText = expenseTotal.toString()

}


function init() {
    historyList.innerHTML = '';

    transList.forEach((trans) => createHistory(trans));
    balanceUpdate()
    updateAmounts(0)
}

init();