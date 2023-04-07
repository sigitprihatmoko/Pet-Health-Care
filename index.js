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
    let arrKel = keluhan //array yang berisi keluhan

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
        let obj = { jenis: dataset.jenis[i][0], price: dataset.jenis[i][1], img: `${dataset.jenis[i][0]}.jpg` }

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


let tampil = sortJenis(data)

function render() {
    let render = document.getElementById("render");
    render.innerHTML = ""

    for (let i = 0; i < tampil.length; i++) {
        render.innerHTML += `<div class="col-md-6 col-lg-4 mb-5">
    <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal${i}">
        <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
            <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
        </div>
        <img class="img-fluid" src="assets/${tampil[i].img}" alt="foto kuscing" />
        <h4>${tampil[i].jenis}</h4>
    </div>
</div>`

    }
}
render()


function tampilModal() {
    let render = document.getElementById("modal");
    render.innerHTML = ""

    for (let i = 0; i < tampil.length; i++) {
        render.innerHTML += `<div class="portfolio-modal modal fade" id="portfolioModal${i}" tabindex="-1" aria-labelledby="portfolioModal1"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
                    aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">${tampil[i].jenis} Cat</h2>
                            <div class="divider-custom">
                                <div class="divider-custom-line"></div>
                                <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                <div class="divider-custom-line"></div>
                            </div>
                            <img class="img-fluid rounded mb-5" src="assets/${tampil[i].img}" alt="foto kucing" />
                            <h4>Price: ${tampil[i].price}</h4>
                            <button class="btn btn-primary" data-bs-dismiss="modal">
                                <i class="fas fa-xmark fa-fw"></i>
                                Close Window
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`

    }
}

tampilModal()



// Create data
function create() {
    let nama = document.getElementById("nama").value;
    let jenis = document.getElementById("catRace").value;
    let checkboxes = document.querySelectorAll('input[name="keluhan"]:checked');
    let keluhan = [];

    checkboxes.forEach(element => {
        keluhan.push(element.value)
    });
    let pasienbaru = createPasien(nama, jenis, keluhan, data)
    return pasienbaru
}


// Read data
function insertNewRecord(data) {
    var table = document.getElementById("petlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.jenis;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.keluhan;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.totalPrice;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `Belum Dibayar`
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button class="btn btn-secondary"  id="Bayar" type="button" onClick="bayar(this)">Bayar</button>
    <button class="btn btn-secondary" id="delete" type="button" onClick="onDelete(this)">Delete</button>`;
  }

  function onFormSubmit() {
    let data = create()
    insertNewRecord(data);
    clear()
    
}

function resetForm() {
    document.location.reload()
  }

function clear() {
    document.getElementById("nama").value = "";
}

//Delete Data
function bayar(td) {
    if (confirm('Terimakasih telah melakukan pembayaran')) {
        cell5.innerHTML = `Sudah Selesai & Sudah Dibayar`
        cell6.innerHTML = `<button class="btn btn-secondary"  id="ambil" type="button" onclick= "status()">Ambil kucing</button>`;
    }
  }

function status() {
    cell5.innerHTML = `Kucing sudah diambil`
    cell6.innerHTML = `Selesai`;
}

//Delete Data
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
      row = td.parentElement.parentElement;
      document.getElementById("petlist").deleteRow(row.rowIndex);
    }
  }


