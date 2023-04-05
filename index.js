var selectedRow = null

function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null)
      insertNewRecord(formData);
    else
      updateRecord(formData);
    resetForm();
  }
}

function readFormData() {
  var formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["jhewan"] = document.getElementById("jhewan").value;
  formData["keluhan"] = document.getElementById("keluhan").value;
  formData["kasus"] = document.getElementById("kasus").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById("petList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.jhewan;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.keluhan;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.kasus;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("jhewan").value = "";
  document.getElementById("keluhan").value = "";
  document.getElementById("kasus").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("jhewan").value = selectedRow.cells[1].innerHTML;
  document.getElementById("keluhan").value = selectedRow.cells[2].innerHTML;
  document.getElementById("kasus").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.jhewan;
  selectedRow.cells[2].innerHTML = formData.keluhan;
  selectedRow.cells[3].innerHTML = formData.kasus;
}

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
    row = td.parentElement.parentElement;
    document.getElementById("petList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  isValid = true;
  if (document.getElementById("fullName").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("jhewan").value = "";
  document.getElementById("keluhan").value = "";
  document.getElementById("kasus").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("jhewan").value = selectedRow.cells[1].innerHTML;
  document.getElementById("keluhan").value = selectedRow.cells[2].innerHTML;
  document.getElementById("kasus").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.jhewan;
  selectedRow.cells[2].innerHTML = formData.keluhan;
  selectedRow.cells[3].innerHTML = formData.kasus;
}

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
    row = td.parentElement.parentElement;
    document.getElementById("petList").deleteRow(row.rowIndex);
    resetForm();
  }
}

function validate() {
  isValid = true;
  if (document.getElementById("fullName").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}