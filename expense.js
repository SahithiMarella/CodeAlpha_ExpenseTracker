const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expenses-list');
const totalAmountElement = document.getElementById('total-amount');
const categoryTotalsElement = document.getElementById('category-totals');

let expenses = getExpensesFromLocalStorage();

function getExpensesFromLocalStorage() {
  const storedExpenses = localStorage.getItem('expenses');
  return storedExpenses ? JSON.parse(storedExpenses) : [];
}

function setExpensesToLocalStorage(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function displayExpenses(expenses) {
  expenseList.innerHTML = ''; // Clear existing list
  expenses.forEach(expense => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span><span class="math-inline">\{expense\.description\}</span\>
<span\></span><span class="math-inline">\{expense\.amount\.toFixed\(2\)\}</span\>
<span\></span>{expense.category}</span>
      <span><span class="math-inline">\{expense\.date\}</span\>
<button data\-id\="</span>{expense.id}">Edit</button>
      <button data-id="${expense.id}">Delete</button>
    `;
    expenseList.appendChild(listItem);

    const editButton = listItem.querySelector('button[data-id="' + expense.id + '"]:first-child');
    editButton.addEventListener('click', () => editExpense(expense.id));

    const deleteButton = listItem.querySelector('button[data-id="' + expense.id + '"]:last-child');
    deleteButton.addEventListener('click', () => deleteExpense(expense.id));
  });

  updateTotals();
}

function updateTotals() {
  let totalAmount = 0;
  const categoryTotals = {};
  expenses.forEach(expense => {
    totalAmount += expense.amount;
    if (expense.category) {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    }
}
  )
}
