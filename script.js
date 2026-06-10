let myChart;
let transactions = [];

function addTransaction() {

let category = document.getElementById("category");
let amount = document.getElementById("amount");

if(amount.value === ""){
alert("Please enter amount");
return;
}

let value = Number(amount.value);

if(category.value !== "Salary"){
value = -Math.abs(value);
}

let transaction = {
id: Date.now(),
text: category.value,
amount: value
};

transactions.push(transaction);

updateUI();
saveToLocalStorage();

amount.value = "";

amount.focus();

}

function updateUI() {

let list = document.getElementById("list");
list.innerHTML = "";

let balance = 0;
let income = 0;
let expense = 0;

transactions.forEach(t => {

let sign = t.amount < 0 ? "-" : "+";
balance += t.amount;

if(t.amount > 0){
income += t.amount;
}else{
expense += Math.abs(t.amount);
}

list.innerHTML += `
<li>
<div>
<b>${t.text}</b>
</div>

<div>
${sign}₹${Math.abs(t.amount)}
<button onclick="deleteTransaction(${t.id})">❌</button>
</div>

</li>
`;

});

document.getElementById("balance").innerText = "Balance: ₹" + balance;
document.getElementById("income").innerText = income;
document.getElementById("expense").innerText = expense;

updateChart();

}

function deleteTransaction(id) {

transactions = transactions.filter(t => t.id !== id);

updateUI();
saveToLocalStorage();

}

function saveToLocalStorage() {
localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {

let data = localStorage.getItem("transactions");

if(data){
transactions = JSON.parse(data);
updateUI();
}

}

loadFromLocalStorage();

function updateChart() {

let ctx = document.getElementById("myChart").getContext("2d");

if(myChart){
myChart.destroy();
}

let categoryTotals = {};

transactions.forEach(t => {

if(!categoryTotals[t.text]){
categoryTotals[t.text] = 0;
}

categoryTotals[t.text] += Math.abs(t.amount);

});

let labels = Object.keys(categoryTotals);
let amounts = Object.values(categoryTotals);

myChart = new Chart(ctx, {

type: "pie",

data: {

labels: labels,

datasets: [{

data: amounts,

backgroundColor: [
"green",
"red",
"blue",
"orange",
"purple",
"yellow",
"pink"
]

}]

}

});

}
