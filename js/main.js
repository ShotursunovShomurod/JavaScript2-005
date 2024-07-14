const nameInput = document.querySelector(".name");
const lastnameInput = document.querySelector(".lastname");
const usernameInput = document.querySelector(".username");
const ageInput = document.querySelector(".age");
const plusButton = document.querySelector(".plus");
const faXmark = document.querySelector(".fa-xmark");
const openbar = document.querySelector(".openbar");
const form = document.querySelector(".form");
const qoshishButton = document.querySelector(".qoshish");
const tableBody = document.querySelector("table tbody");
const scoreSelect = document.querySelector(".score");

let rowCount = 0;
const maxRows = 300;

// Sayt yuklanganida localStorage-dan ma'lumotlarni o'qish
document.addEventListener("DOMContentLoaded", () => {
    const storedData = JSON.parse(localStorage.getItem("tableData"));
    if (storedData) {
        storedData.forEach((row) => {
            addRowToTable(row.name, row.lastname, row.username, row.age, row.id, row.ilesScore);
        });
    }
});

// Yangi qatorni jadvalga qo'shish
function addRowToTable(name, lastname, username, age, id, ilesScore) {
    const newRow = document.createElement("tr");
    newRow.classList.add("tr");

    newRow.innerHTML = `
        <td contenteditable="true" data-call="name">${name}</td>
        <td contenteditable="true" data-call="lastname">${lastname}</td>
        <td contenteditable="true" data-call="username">${username}</td>
        <td contenteditable="true" data-call="age">${age}</td>
        <td contenteditable="true" class="id" data-call="id">${id}</td>
        <td contenteditable="true" data-call="ilesScore">${ilesScore}</td>
    `;

    tableBody.appendChild(newRow);
    rowCount++;
}

plusButton.addEventListener("click", () => {
    openbar.style.display = "flex";
});

openbar.addEventListener("click", (event) => {
    if (event.target === openbar) {
        openbar.style.display = "none";
    }
});

faXmark.addEventListener("click", () => {
    openbar.style.display = "none";
});

qoshishButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (rowCount >= maxRows) {
        alert("Siz faqat 6 ta qatordan ko'p qo'sha olmaysiz.");
        return;
    }

    const name = nameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const username = usernameInput.value.trim();
    const age = ageInput.value.trim();

    if (!name || !lastname || !username || !age) {
        alert("Barcha maydonlar to'ldirilishi shart.");
        return;
    }

    const scoreOptions = Array.from(scoreSelect.options);
    const randomOption = scoreOptions[Math.floor(Math.random() * scoreOptions.length)].value;

    const randomId = Math.floor(Math.random() * 100000) + 1;

    addRowToTable(name, lastname, username, age, randomId, randomOption);

    const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    tableData.push({ name, lastname, username, age, id: randomId, ilesScore: randomOption });
    localStorage.setItem("tableData", JSON.stringify(tableData));

    form.reset();
    openbar.style.display = "none";
});