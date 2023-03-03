let apiUser = "http://localhost:3000/user";
const btnAdd = document.getElementById('add-button');
const btnRegis = document.getElementById('btnRegis');
const username = document.getElementById('username');
const email = document.getElementById('email');
const name1 = document.getElementById('fname');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const plW = document.getElementById('plW');
const role = document.getElementsByName('role');
var username2 = document.getElementById('username2');
var email2 = document.getElementById('email2');
var name2 = document.getElementById('fname2');
var phone2 = document.getElementById('phone2');
var passwordre = document.getElementById('passwordchange');
var repass = document.getElementById('re-password');
var plW2 = document.getElementById('plW2');
var role2 = document.getElementsByName('role2');
const updateBtn = document.getElementById('btnUpdate');
var getId;
const getUser = async() => {
    const response = await fetch(apiUser);
    const data = await response.json();
    return data;
};
// Edit User
updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkEdit();
})

// Thaot Update
document.querySelector(".popup2 .closeBtn2").addEventListener("click", function() {
    document.querySelector(".popup2").classList.remove("active");
})

function viewEdit(id) {
    getUser().then((data) => {
        const user = data.find(
            (user) => user.id == id,
        );
        if (user) {
            username2.value = user.username;
            email2.value = user.email;
            phone2.value = user.phone;
            name2.value = user.fname;
            passwordre.value = user.password;
            repass.value = user.password;
            plW2.value = user.workplace;
        }
    })
}

function editUser(id) {
    document.querySelector(".popup2").classList.add("active");
    viewEdit(id);
    getId = id;
}

function getRole2() {
    var roleValue = '';
    for (var i = 0; i < role2.length; i++) {
        if (role2[i].checked == true) {
            roleValue = role2[i].value;
        }
    }
    return roleValue;
}

function getRole() {
    var roleValue = '';
    for (var i = 0; i < role.length; i++) {
        if (role[i].checked == true) {
            roleValue = role[i].value;
        }
    }
    return roleValue;
}
btnRegis.addEventListener("click", e => {
    e.preventDefault();
    checkInputs();
    getFactory(renderStudent);
})

function makeClear() {}

function checkEdit() {
    const plWValue = plW2.value.trim();
    const usernameValue = username2.value.trim();
    const emailValue = email2.value.trim();
    const passwordValue = passwordre.value.trim();
    const password2Value = repass.value.trim();
    const nameValue = name2.value.trim();
    const phoneValue = phone2.value.trim();
    const roleValue = getRole2();
    var check = false;
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (nameValue === '') {
        setErrorFor(name1, 'Full Name cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (!isPhoneNum(phoneValue)) {
        setErrorFor(phone, 'Phone must be number');
        check = false;
    } else {
        check = true;
    }
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        check = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        check = false;
    } else {
        check = true;
    }
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (roleValue == 'Branch') {
        if (plWValue === '') {
            // Error Here
            check = false;
        } else {
            check = true;
        }
    }
    if (password2Value === '') {
        setErrorFor(password2, 'Repass cannot be blank');
        check = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        check = false;
    } else {
        check = true;
    }
    if (check) {
        getUser().then((data) => {
            const user = data.find(
                (user) => user.id == getId,
            );
            if (user) {
                user.username = username2.value;
                user.email = email2.value;
                user.phone = phone2.value;
                user.fname = name2.value;
                user.password = passwordre.value;
                user.role = getRole2();
                user.plW2 = plW2.value;
                fetch(apiUser + '/' + getId, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(user),
                    })
                    .then((res) => res.json())
                    .then((data) => console.log(data));
            }
        });
    }
}

function checkInputs() {
    const plWValue = plW.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const nameValue = name1.value.trim();
    const phoneValue = phone.value.trim();
    const roleValue = getRole();
    var check = false;
    if (usernameValue === '') {
        setErrorFor(username2, 'Username cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (nameValue === '') {
        setErrorFor(name2, 'Full Name cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (!isPhoneNum(phoneValue)) {
        setErrorFor(phone2, 'Phone must be number');
        check = false;
    } else {
        check = true;
    }
    if (emailValue === '') {
        setErrorFor(email2, 'Email cannot be blank');
        check = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        check = false;
    } else {
        check = true;
    }
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (roleValue == 'Branch') {
        if (plWValue === '') {
            // Error Here
            check = false;
        } else {
            check = true;
        }
    }
    if (password2Value === '') {
        setErrorFor(password2, 'Repass cannot be blank');
        check = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
        check = false;
    } else {
        check = true;
    }
    if (check) {
        const user = {
            username: usernameValue,
            password: passwordValue,
            fname: nameValue,
            email: emailValue,
            phone: phoneValue,
            role: roleValue,
            workplace: plWValue,
        };
        fetch(apiUser, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-box error';
    small.innerText = message;
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhoneNum(phone) {
    return /^-?\d+$/.test(phone);
}
btnAdd.addEventListener("click", function() {
    document.querySelector(".popup").classList.add("active");
})
document.querySelector(".popup .closeBtn").addEventListener("click", function() {
    document.querySelector(".popup").classList.remove("active");
})

function start() {
    getFactory(renderStudent);
}

start();

function getFactory(callback) {
    fetch(apiUser)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderStudent(user) {
    let student = ``

    let listStudent = user.map((value, index) => {
        student += `<tr>
            <td>${value.id}</td>
            <td>${value.fname}</td>
            <td>${value.email}</td>
            <td>${value.workplace}</td>
            <td>${value.role}</td>
            <td>
                <button onclick="editUser(${value.id})"><i class="fa fa-edit"></i></button>
                <button onclick="deleteUser(${value.id})"><i class="fa fa-trash"></i></button>
            </td>
        </tr>`
    })
    document.getElementById('tbody').innerHTML = student;
}

// search content 
function searchUser() {
    let user = fetch(apiUser)
    fetch(apiUser)
        .then((res) => res.json())
        .then((data) => {
            let valueSearchInput = document.getElementById("search").value
            let userSearch = data.filter(value => {
                return value.fname.toUpperCase().includes(valueSearchInput.toUpperCase())
            })
            renderStudent(userSearch)
        });
}


// Delete Infor
function deleteUser(id) {
    fetch(apiUser + '/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => console.log(data));
}