document.addEventListener("DOMContentLoaded", function () {
  displayExams();
});

function addExam() {
  const name = document.getElementById("examName").value.trim();
  const price = parseFloat(document.getElementById("examPrice").value.trim());

  // Verifica se os campos estão preenchidos corretamente
  if (!name || isNaN(price) || price < 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Recupera a lista de exames do localStorage ou inicializa uma nova lista
  let exams = JSON.parse(localStorage.getItem("exams")) || [];
  exams.push({ name, price });
  localStorage.setItem("exams", JSON.stringify(exams));

  // Atualiza a exibição dos exames e reseta o formulário
  displayExams();
  document.getElementById("examForm").reset();
}

function displayExams() {
  const exams = JSON.parse(localStorage.getItem("exams")) || [];
  const tableBody = document.querySelector("#examTable tbody");
  tableBody.innerHTML = "";

  // Itera sobre a lista de exames e cria as linhas da tabela
  exams.forEach((exam, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exam.name}</td>
      <td>R$ ${exam.price.toFixed(2)}</td>
      <td>
        <button class="edite" onclick="editExam(${index})">Editar</button>
        <button class="delete" onclick="deleteExam(${index})">Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editExam(index) {
  const exams = JSON.parse(localStorage.getItem("exams"));
  const exam = exams[index];
  document.getElementById("examName").value = exam.name;
  document.getElementById("examPrice").value = exam.price;
  deleteExam(index);
}

function deleteExam(index) {
  let exams = JSON.parse(localStorage.getItem("exams"));
  exams.splice(index, 1);
  localStorage.setItem("exams", JSON.stringify(exams));
  displayExams();
}
