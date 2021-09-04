const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const Transactions = [
    // { id: 1, reason: 'Salary', amount: 5000 },
    // { id: 2, reason: 'Utility', amount: -200 },
    // { id: 3, reason: 'Dinner', amount: -400 },
    // { id: 4, reason: 'Misc', amount: -1000 }
]



let transactions = Transactions;
// let transactions = localStorage.setItem('transactions', Transactions);

// Function to display transaction in DOM - History Section
function displayTransactions(transaction) {
    const type = transaction.amount > 0 ? '+' : '-';
    const transactionLI = document.createElement('li');
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${transaction.amount}</span>
        <button class="delete-btn" onclick='deleteTransaction(${transaction.id})' >X</button>
    `;
    list.appendChild(transactionLI)
};

// Function to update all balances
function updateBalance() {
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    const totalBalance = transactionAmounts.reduce((acc, amount) => (acc += amount), 0);
    const creditBalance = transactionAmounts
        .filter(amount => amount > 0)
        .reduce((acc, amount) => (acc += amount), 0);
    const debitBalance = transactionAmounts
        .filter(amount => amount < 0)
        .reduce((acc, amount) => (acc += amount), 0);
    console.log(totalBalance);
    moneyCredit.innerText = `$${creditBalance}`
    moneyDebit.innerText = `$${debitBalance}`
    balance.innerText = `$${totalBalance}`
};

function createID() {
    return Math.floor(Math.random() * 100000000000);
}

function addTransaction(e) {
    e.preventDefault();
    console.log(reason.value);
    if (reason.value.trim() === '' || amount.value.trim() === '') {
        alert('Please provide a valid reason and transaction amount')
    } else {
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        displayTransactions(transaction);
        updateBalance();
        reason.value = '';
        amount.value = '';
        localStorage.setItem('transactions', JSON.stringify(transaction));
    }
}

// Function to delete the transaction

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// Function to initialize the Application
function init() {
    list.innerHTML = '';
    transactions.forEach(displayTransactions);
    updateBalance();
}

form.addEventListener('submit', addTransaction)

init();