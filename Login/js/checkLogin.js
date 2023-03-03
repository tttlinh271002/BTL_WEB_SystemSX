const username_login = document.getElementById('loginuser');
const password_login = document.getElementById('loginpass');
const btnLogin = document.getElementById('form-login');
const error_form = document.getElementById('error');
btnLogin.addEventListener("click", e => {
    e.preventDefault();
    checkLogin();
    console.log(getUsername());
})

const getUser = async() => {
    const response = await fetch(apiUser);
    const data = await response.json();
    return data;
};

function checkLogin() {
    const usernameValue = username_login.value.trim();
    const passwordValue = password_login.value.trim();
    var check = false;
    if (usernameValue === '') {
        setErrorFor(username_login, 'Username cannot be blank');
        check = false;
    } else if (passwordValue === '') {
        setErrorFor(password_login, 'Password cannot be blank');
        check = false;
    } else {
        check = true;
    }
    if (check) {
        getUser().then((data) => {
            const user = data.find(
                (user) =>
                user.username == usernameValue && user.password == passwordValue
            );
            if (user) {
                if (user.workplace == 'Agent') {
                    window.open("/Home/Agent/agent.html", "_self");
                }
                if (user.workplace == 'Factory') {
                    window.open("/Home/Factory/factory.html", "_self");
                }
                if (user.workplace == 'Warranty') {
                    window.open("/Home/Warranty/warranty.html", "_self");
                }
                if (user.role == 'Manager') {
                    window.open("/Home/Manager/manager.html", "_self");
                }
            } else {
                setErrorFor(password_login, 'Username or password invalid');
            }
        });
    }
}