// Dataset

const data = {
  hewan: 'kucing',
  jenis: [
    ["siamese", 20000],
    ["ragdoll", 50000],
    ["persia", 30000],
    ["bengal", 20000],
    ["hutan", 35000],
    ["norwegia", 55000],
    ["siberia", 35000],
    ["sphinx", 50000]
  ],
  keluhan: [
    ["muntah", 5000],
    ["diare", 10000],
    ["scabies", 30000],
    ["diabetes", 45000],
    ["ispa", 65000]
  ]

}

const dataCustomer = [
  
]

/*
function dibawah merupakan modular function 
yang berfungsi untuk mendapatkan harga basic dari jenis suatu kucing
input: String jenis kucing (ex: "Sphinx"), Dataset(data)
note: input tidak case sensitive
*/

function getBasicPrice(jenis, dataset) {
  let basicPrice = 0;
  let value = jenis.toLowerCase();
  for (let i = 0; i < dataset.jenis.length; i++) {
    if (value === dataset.jenis[i][0]) {
      basicPrice = dataset.jenis[i][1]
    }
  }
  return basicPrice
}

// expected output pada function ini adalah Harga basic jenis kucing 
// console.log(getBasicPrice("Sphinx", data)); // 50000

// jika output 0 berarti jenis tidak terdaftar


/*
function dibawah merupakan modular function 
yang berfungsi untuk mendapatkan harga tambahan dari keluhan yang diterima
input: array berisi keluhan (ex: ['muntah', 'ispa', 'scabies']), Dataset(data)
note: input tidak case sensitive
*/
function getKeluhanPrice(arrKeluhan, dataset) {
  let keluhanPrice = 0;
  for (let i = 0; i < arrKeluhan.length; i++) {
    let value = arrKeluhan[i].toLowerCase();

    for (let j = 0; j < dataset.keluhan.length; j++) {

      if (value === dataset.keluhan[j][0]) {
        keluhanPrice += dataset.keluhan[j][1]
        break;
      }
    }
  }

  return keluhanPrice
}

// expected output pada function ini adalah Harga dari semua keluhan yang ada 

// console.log(getKeluhanPrice(['Muntah', 'isPa', 'scabies'], data)); // 100000

// jika output 0 berarti tidak ada keluhan



/*
function untuk membuat suatu object dari input pasien hewan yang ada

input disini bisa diambil dari inputan html didepan untuk kemudian dikirim lagi ke checkout
contoh:
nama: "sam", jenis:"Sphinx", keluhan: "muntah,ispa,scabies", data

*note* 
untuk input keluhan tidak boleh pake spasi setelah tanda koma
*/
function createPasien(nama, jenis, keluhan, dataset) {
  let obj = {}
  let arrKel = keluhan.split(',') //array yang berisi keluhan

  let basicPrice = getBasicPrice(jenis, dataset)
  let addPrice = getKeluhanPrice(arrKel, dataset)
  let total = basicPrice + addPrice;

  //error handling jika jenis kucing kosong dan keluhan kosong
  if (basicPrice === 0) { //jika basicPrice 0 maka jenis tidak ada dalam dataset
    jenis = 'jenis kucing tidak ada!'
  }
  if (addPrice === 0) { //jika addPrice 0 maka tidak ada keluhan
    arrKel = 'tidak ada keluhan!'
  }

  obj.name = nama
  obj.hewan = dataset.hewan
  obj.jenis = jenis
  obj.keluhan = arrKel
  obj.totalPrice = total

  return obj
}

//contoh

// console.log(createPasien('sam', 'Sphinx', "muntah,ispa,scabies", data));

/* Expected Output
{
  nama: 'sam'
  jenis: 'Sphinx'
  keluhan: [ 'muntah', 'ispa', 'scabies' ]
  totalPrice: 150000
} 

Data object diatas bisa dikirim lewat DOM untuk keperluan Checkout
*/
// console.log(createPasien('sam', '', "", data)); // contoh untuk error handling



/*-------------------------------------------------------------------------------------*/
/*
Funsi dibawah merupakan addtional untuk frontend, 
fungsi dibawah untuk mensortir jenis kucing dan harga per object

kalau mau ditambah foto bisa, nanti link fotonya di assign kedalam object
*/

function sortJenis(dataset) {
  let arr = []
  for (let i = 0; i < dataset.jenis.length; i++) {
    let obj = { jenis: dataset.jenis[i][0], price: dataset.jenis[i][1] }

    arr.push(obj)
  }

  return arr
}
// console.log(sortJenis(data));

/*
Fungsi dibawah merupakan addtional untuk frontend, 
fungsi dibawah untuk mensortir keluhan dan harga per object

kalau mau ditambah foto bisa, nanti link fotonya di assign kedalam object
*/
function sortKeluhan(dataset) {
  let arr = []
  for (let i = 0; i < dataset.keluhan.length; i++) {
    let obj = { keluhan: dataset.keluhan[i][0], price: dataset.keluhan[i][1] }

    arr.push(obj)
  }

  return arr
}
// console.log(sortKeluhan(data));
/*-------------------------------------------------------------------------------------*/


// DOM

// codingan dibawah dari didit

var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["namaPemilik"] = document.getElementById("namaPemilik").value;
    formData["hewan"] = document.getElementById("hewan").value;
    formData["jHewan"] = document.getElementById("jHewan").value;
    formData["keluhan"] = document.getElementById("keluhan").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("dList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		        cell1.innerHTML = data.namaPemilik;
    cell2 = newRow.insertCell(1);
		        cell2.innerHTML = data.hewan;
    cell3 = newRow.insertCell(2);
            cell3.innerHTML = data.jHewan;
    cell4 = newRow.insertCell(3);
		        cell4.innerHTML = data.keluhan;
    cell4 = newRow.insertCell(4);
            cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("namaPemilik").value = selectedRow.cells[0].innerHTML;
    document.getElementById("hewan").value = selectedRow.cells[1].innerHTML;
    document.getElementById("jHewan").value = selectedRow.cells[2].innerHTML;
    document.getElementById("keluhan").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.namaPemilik;
    selectedRow.cells[2].innerHTML = formData.hewan;
    selectedRow.cells[1].innerHTML = formData.jHewan;
    selectedRow.cells[3].innerHTML = formData.keluhan;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('dList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("namaPemilik").value = '';
    document.getElementById("hewan").value = '';
    document.getElementById("jHewan").value = '';
    document.getElementById("keluhan").value = '';
    selectedRow = null;
}
