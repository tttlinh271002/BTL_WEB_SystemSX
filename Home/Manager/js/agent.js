var factoryAPI = 'http://localhost:3000/agent';
let currentPge = 1;
let perPage = 5;
let totalPage = 0;
let perUser = []
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
    alert('Xóa đại lý thành công');
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
        let nameAgent = document.getElementById('name').value;
        let addressAgent = document.getElementById('address').value;

        let formData = {
            codeAgent: codeAgent,
            nameAgent: nameAgent,
            addressAgent: addressAgent
        };
        alert('Thêm đại lý thành công');
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
        <th>Mã Đại Lý</th>
        <th>Tên Đại Lý</th>
        <th>Địa chỉ Đại Lý</th>
        <th>Action</th>
    </tr>`

    let listStudent = factory.map((value, index)=>{
        student += `<tr>
            <td>${index + 1}</td>
            <td>${value.codeAgent}</td>
            <td>${value.nameAgent}</td>
            <td>${value.addressAgent}</td>
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
            document.getElementById("name").value = data.nameAgent;
            document.getElementById("address").value = data.addressAgent;
            document.getElementById("index").value = data.id;
            document.getElementById("save").style.display = "none"
            document.getElementById("update").style.display = "inline-block"
        });
}

function changeStudent() {
    let id = document.getElementById('index').value
    let formData = {
        codeAgent: document.getElementById('codeAgent').value,
        nameAgent: document.getElementById('name').value,
        addressAgent: document.getElementById('address').value
    };
    updateFactory(formData, id);
    alert('Thay đổi đại lý thành công');
}

function searchUser() {
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
