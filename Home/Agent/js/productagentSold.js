var factoryAPI = 'http://localhost:3000/productAgentSold';
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
        // .then(callback);
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
    alert('Xóa sản phẩm đã bán thành công');
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
        let nameAgent = document.getElementById('nameAgent').value;
        let codeProduct = document.getElementById('codeProduct').value;
        let brand = document.getElementById('brand').value;
        let version = document.getElementById('version').value;
        let color = document.getElementById('color').value;
        let price = document.getElementById('price').value;
        let idCustomer = document.getElementById('idCustomer').value;
        let orderDate = document.getElementById('orderDate').value;

        let formData = {
            nameAgent: nameAgent,
            codeProduct: codeProduct,
            brand: brand,
            version: version,
            color: color,
            price: price,
            idCustomer: idCustomer,
            orderDate: orderDate,
        };
        alert('Thêm sản phẩm đã bán thành công');
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
        <th>Tên Đại lý</th>
        <th>Mã sản phẩm</th>
        <th class="restable">Hãng</th>
        <th class="restable">Phiên bản</th>
        <th class="restable">Màu sắc</th>
        <th>Giá</th>
        <th>Mã Khách hàng</th>
        <th>Ngày bán</th>
        <th>Action</th>
    </tr>`

    let listStudent = factory.map((value, index)=>{
        student += `<tr>
            <td>${index + 1}</td>
            <td>${value.nameAgent}</td>
            <td>${value.codeProduct}</td>
            <td class="restable">${value.brand}</td>
            <td class="restable">${value.version}</td>
            <td class="restable">${value.color}</td>
            <td>${value.price}</td>
            <td>${value.idCustomer}</td>
            <td>${value.orderDate}</td>
            <td>
                <button onclick="editStudent(${value.id})">Edit</button>
                <button onclick="deleteStudent(${value.id})">Delete</button>
            </td>
        </tr>`
    })
    document.getElementById('tableContent').innerHTML = student;
    // getFactory(editStudent);
    // updateFactory(listStudent, function() {
    //         getFactory(editStudent);
    // });
}

function handlePageNumber(num) {
    currentPge = num;
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
    fetch(factoryAPI + '/' + id)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("nameAgent").value = data.nameAgent;
            document.getElementById("codeProduct").value = data.codeProduct;
            document.getElementById("brand").value = data.brand;
            document.getElementById("version").value = data.version;
            document.getElementById("color").value = data.color;
            document.getElementById("price").value = data.price;
            document.getElementById("idCustomer").value = data.idCustomer;
            document.getElementById("orderDate").value = data.orderDate;
            document.getElementById("index").value = data.id;
            document.getElementById("save").style.display = "none"
            document.getElementById("update").style.display = "inline-block"
            // var updateBtn = document.querySelector('#update');
            // createBtn.onclick = function(index) {
            //     console.log(index)
            // }
        });
    // document.getElementById("name").value = index;
    // console.log(factory)
    // document.getElementById("address").value = factory.addressFactory;
}

function changeStudent() {
    let id = document.getElementById('index').value
    let formData = {
        nameAgent: document.getElementById('nameAgent').value,
        codeProduct: document.getElementById('codeProduct').value,
        brand: document.getElementById('brand').value,
        version: document.getElementById('version').value,
        color: document.getElementById('color').value,
        price: document.getElementById('price').value,
        idCustomer: document.getElementById('idCustomer').value,
        orderDate: document.getElementById('orderDate').value,
    };
    updateFactory(formData, id);
    alert('Thay đổi sản phẩm đã bán thành công');
    // fetch(factoryAPI + '/' + so)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         data = {
    //             nameFactory: document.getElementById('name').value,
    //             addressFactory: document.getElementById('address').value
    //         };
    //        
    //         // var updateBtn = document.querySelector('#update');
    //         // createBtn.onclick = function(index) {
    //         //     console.log(index)
    //         // }
    //     });
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
            // return userSearch;
        });
}
