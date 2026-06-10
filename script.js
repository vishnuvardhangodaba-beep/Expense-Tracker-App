let transactions = [];

function addTransaction() {

let text = document.getElementById("text").value;
let amount = document.getElementById("amount").value;

if(text === "" || amount === ""){
alert("Please enter all fields");
return;
}

let transaction = {
id: Date.now(),
text: text,
amount: Number(amount)
};

transactions.push(transaction);

updateUI();
saveToLocalStorage();

document.getElementById("text").value = "";
document.getElementById("amount").value = "";

}

function updateUI() {

let list = document.getElementById("list");
list.innerHTML = "";

let balance = 0;

transactions.forEach(t => {

let sign = t.amount < 0 ? "-" : "+";
balance += t.amount;

list.innerHTML += `
<li>
${t.text} <span>${sign}₹${Math.abs(t.amount)}</span>
<button onclick="deleteTransaction(${t.id})">X</button>
</li>
`;

});

document.querySelector(".balance h2").innerText =
"Balance: ₹" + balance;

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