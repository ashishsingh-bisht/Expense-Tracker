let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {
  let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.innerText = "₹" + total;
}

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.description} - ₹${expense.amount} (${expense.category})
      <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
    `;

    expenseList.appendChild(li);
  });

  updateTotal();
}

function addExpense() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (description === "" || isNaN(amount)) {
    alert("Please enter valid details");
    return;
  }

  expenses.push({ description, amount, category });

  saveToLocalStorage();
  renderExpenses();

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveToLocalStorage();
  renderExpenses();
}

renderExpenses();
