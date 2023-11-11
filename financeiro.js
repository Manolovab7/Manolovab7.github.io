const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
   updateLocalStorage()
    init()
}
const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
 
    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name}
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick = "removeTransaction(${transaction.id})">x</button>
    `
    transactionsUl.prepend(li)

    // <li class="minus">
    //     Salário <span>-$400</span><button class="delete-btn">x</button>
    // </li>
}  

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmount = transactions.map(transaction => transaction.amount)
    const total = transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
    const income = transactionsAmount
     .filter(value => value > 0)
     .reduce((accumulator, value) => accumulator + value,0)
     .toFixed(2)
    const expense = getExpenses(transactionsAmount)
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
 }
 
const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateId = () => Math.round(Math.random()* 1000)

const transactionName = inputTransactionName.value.trim()
const transactionAmount = inputTransactionAmount.value.trim()

const addToTransactionsArray = (transactionName, transactionsAmount) => {
    transactions.push(
        {id: generateId(),
    name: transactionName, 
    amount: Number(transactionAmount)
})
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
        event.preventDefault()
    
        if(inputTransactionName.value.trim()=== '' || inputTransactionAmount.value.trim() === ''){
            alert('Por favor, preencha o nome e o valor da transação')
            return
        }
    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
  
}
form.addEventListener('submit', handleFormSubmit)
