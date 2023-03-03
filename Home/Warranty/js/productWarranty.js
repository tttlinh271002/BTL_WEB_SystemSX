var factoryAPI = 'http://localhost:3000/productWarranty';
let currentPge = 1;
let perPage = 5;
let totalPage = 0;
let perUser = [];
function start() {
    getFactory(renderNew);
}

start();

function validateInput(){
    let formElement = document.querySelector(".form")
    let inputElement = formElement.querySelectorAll(".form-input")
    for (let i = 0; i < inputElement.length; i++) {
        if(inputElement[i].value === ""){
            inputElement[i].parentElement.querySelector(".error-message").innerText = `Please enter your ${inputElement[i].id}`
        } else {
            inputElement[i].parentElement.querySelector(".error-message").innerText = ""
        }
    }
}

function getFactory(callback) {
    fetch(factoryAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function createFactory(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(factoryAPI, options)
        .then(function(response) {
            response.json();
        })
        .then(callback);
}

function updateFactory(formData, id) {
    var options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(formData)
};
fetch(factoryAPI + '/' + id, options)
    .then(function(response) {
        response.json();
    })
    // .then(callback);
}

function deleteStudent(id) {
    alert('Xóa sản phẩm bảo hành thành công');
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(factoryAPI + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var factoryItem = document.querySelector('.factory-item-' + id);
            if (factoryItem) {
                factoryItem.remove();
            }
        });
}

function addNew(){
    validateInput()
    let formElement = document.querySelector(".form")
    let errorElement = formElement.querySelectorAll('.error-message')
    let arrErrorElement = []
    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText)
    }
    let checkErrorElement = arrErrorElement.every(value => value === "")
    if (checkErrorElement) {
        let codeProduct = document.getElementById('codeProduct').value;
        let codeWarranty = document.getElementById('codeWarranty').value;
        let typewarr = document.getElementById('typewarr').value;
        let status = document.getElementById('status').value;
        let codefactory = document.getElementById('codefactory').value;
        let codeagent = document.getElementById('codeagent').value;

        let formData = {
            codeProduct: codeProduct,
            codeWarranty: codeWarranty,
            typewarr: typewarr,
            status: status,
            codefactory: codefactory,
            codeagent: codeagent
        };

        alert('Thêm sản phẩm bảo hành thành công');
        createFactory(formData, function() {
            getFactory(renderNew);
        });
    }
}

function renderNew(factory) {
    renderPageNumber(factory)
    perUser = factory.slice(
        (currentPge - 1) * perPage,
        (currentPge - 1) * perPage + perPage,
    )
    renderStudent(perUser)
}

function renderStudent(factory){
    let student = `<tr>
        <th>STT</th>
        <th>Mã sản phẩm</th>
        <th>TT Bảo hành</th>
        <th class="restable">Loại BH</th>
        <th>Trạng thái</th>
        <th class="restable">Cơ sở sản xuất</th>
        <th class="restable">Đại lý</th>
        <th>Action</th>
    </tr>`

    let listStudent = factory.map((value, index)=>{
        student += `<tr>
            <td>${index + 1}</td>
            <td>${value.codeProduct}</td>
            <td>${value.codeWarranty}</td>
            <td class="restable">${value.typewarr}</td>
            <td>${value.status}</td>
            <td class="restable">${value.codefactory}</td>
            <td class="restable">${value.codeagent}</td>
            <td>
                <button onclick="editStudent(${value.id})">Edit</button>
                <button onclick="deleteStudent(${value.id})">Delete</button>
            </td>
        </tr>`
    })
    document.getElementById('tableContent').innerHTML = student;
}

function handlePageNumber(num) {
    currentPge = num
    fetch(factoryAPI)
        .then((res) => res.json())
        .then((data) => {
            perUser = data.slice(
                (currentPge - 1) * perPage,
                (currentPge - 1) * perPage + perPage,
            )
            renderStudent(perUser)
        });
}

function renderPageNumber(factory) {
    totalPage = factory.length / perPage;
    du = factory.length % perPage;
    if (du != 0){
        totalPage = totalPage + 1;
    }
    for (let i = 1; i <= totalPage; i++) {
        document.getElementById("pagination").innerHTML += `<li onclick="handlePageNumber(${i})">${i}</li>`
    }
}

function editStudent(id) {
    let factory = fetch(factoryAPI)
    fetch(factoryAPI + '/' + id)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("codeProduct").value = data.codeProduct;
            document.getElementById("codeWarranty").value = data.codeWarranty;
            document.getElementById("typewarr").value = data.typewarr;
            document.getElementById("status").value = data.status;
            document.getElementById("codefactory").value = data.codefactory;
            document.getElementById("codeagent").value = data.codeagent;
            document.getElementById("index").value = data.id;
            document.getElementById("save").style.display = "none"
            document.getElementById("update").style.display = "inline-block"
        });
}

function changeStudent() {
    let id = document.getElementById('index').value
    let formData = {
        codeProduct: document.getElementById('codeProduct').value,
        codeWarranty: document.getElementById('codeWarranty').value,
        typewarr: document.getElementById('typewarr').value,
        status: document.getElementById('status').value,
        codefactory: document.getElementById('codefactory').value,
        codeagent: document.getElementById('codeagent').value,
        
    };
    updateFactory(formData, id);
    alert('Thay đổi sản phẩm bảo hành thành công');
}

function searchUser() {
    let factory = fetch(factoryAPI)
    fetch(factoryAPI)
        .then((res) => res.json())
        .then((data) => {
            let valueSearchInput = document.getElementById("search").value
            let userSearch = data.filter(value => {
                return value.codeProduct.toUpperCase().includes(valueSearchInput.toUpperCase())
            })
            // renderPageNumber(userSearch)
            renderStudent(userSearch)
        });
}
