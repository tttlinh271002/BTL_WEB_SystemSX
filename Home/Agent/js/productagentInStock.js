var factoryAPI = 'http://localhost:3000/productAgentInStock';
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
    alert('Xóa sản phẩm trong Kho Đại lý thành công');
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
        let codeAgent = document.getElementById('codeAgent').value;
        let nameAgent = document.getElementById('nameAgent').value;
        let codeProduct = document.getElementById('codeProduct').value;
        let brand = document.getElementById('brand').value;
        let version = document.getElementById('version').value;
        let color = document.getElementById('color').value;
        let price = document.getElementById('price').value;

        let formData = {
            codeAgent: codeAgent,
            nameAgent: nameAgent,
            codeProduct: codeProduct,
            brand: brand,
            version: version,
            color: color,
            price: price,
        };

        alert('Thêm sản phẩm trong Kho Đại lý thành công');
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
        <th>Mã Đại lý</th>
        <th>Tên Đại lý</th>
        <th>Mã sản phẩm</th>
        <th class="restable">Hãng</th>
        <th class="restable">Phiên bản</th>
        <th class="restable">Màu sắc</th>
        <th>Giá</th>
        <th>Action</th>
    </tr>`

    let listStudent = factory.map((value, index)=>{
        student += `<tr>
            <td>${index + 1}</td>
            <td>${value.codeAgent}</td>
            <td>${value.nameAgent}</td>
            <td>${value.codeProduct}</td>
            <td class="restable">${value.brand}</td>
            <td class="restable">${value.version}</td>
            <td class="restable">${value.color}</td>
            <td>${value.price}</td>
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
            document.getElementById("codeAgent").value = data.codeAgent;
            document.getElementById("nameAgent").value = data.nameAgent;
            document.getElementById("codeProduct").value = data.codeProduct;
            document.getElementById("brand").value = data.brand;
            document.getElementById("version").value = data.version;
            document.getElementById("color").value = data.color;
            document.getElementById("price").value = data.price;
            document.getElementById("index").value = data.id;
            document.getElementById("save").style.display = "none"
            document.getElementById("update").style.display = "inline-block"
        });
}

function changeStudent() {
    let id = document.getElementById('index').value
    let formData = {
        codeAgent: document.getElementById('codeAgent').value,
        nameAgent: document.getElementById('nameAgent').value,
        codeProduct: document.getElementById('codeProduct').value,
        brand: document.getElementById('brand').value,
        version: document.getElementById('version').value,
        color: document.getElementById('color').value,
        price: document.getElementById('price').value,
        
    };
    updateFactory(formData, id);
    alert('Thay đổi sản phẩm trong Kho Đại lý thành công');
}

function searchUser() {
    let factory = fetch(factoryAPI)
    fetch(factoryAPI)
        .then((res) => res.json())
        .then((data) => {
            let valueSearchInput = document.getElementById("search").value
            let userSearch = data.filter(value => {
                return value.nameAgent.toUpperCase().includes(valueSearchInput.toUpperCase())
            })
            // renderPageNumber(userSearch)
            renderStudent(userSearch)
        });
}
