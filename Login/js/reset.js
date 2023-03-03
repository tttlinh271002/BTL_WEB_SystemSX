let apiUser = "http://localhost:3000/user";
const container = document.querySelector(".container");
const verify = document.querySelector('.checkCode');

// Btn Send code
const btnSendCode = document.getElementById('form-code');
const email = document.getElementById('verify-email');
const otp = document.getElementById('code-otp');
let random_otp = '';
// Reset
const new_pass = document.getElementById('new-pass');
const confirm_pass = document.getElementById('confirm-pass');
const btnRepass = document.getElementById('form-resetPass');

function getRandom() {
    return Math.floor(Math.random() * (999999 - 100000) + 100000);
}
export {
    getRandom
};
btnSendCode.addEventListener("click", () => {
    verifying();
    // sendEmail();
})
verify.addEventListener("click", () => {
        const otpValue = otp.value.trim();
        if (random_otp == otpValue) {
            container.classList.add("active");
        } else {
            setErrorFor(otp, 'Wrong OTP');
        }
    })
    // Send Email 

function verifying() {
    var check1 = false;
    const emailValue = email.value.trim();
    const getUser = async() => {
        const response = await fetch(apiUser);
        const data = await response.json();
        return data;
    };
    //var check = false;
    getUser().then((data) => {
        var check = false;
        const user = data.find(
            (user) => user.email == emailValue,
        );
        if (user) {
            check = true;
            if (check) {
                random_otp = getRandom().toString();
                // sendEmail();
            }
        } else {
            if (emailValue === '') {
                setErrorFor(email, 'Email cannot be blank');
            } else {
                setErrorFor(email, 'Email does not exist');
            }
        }
        if (check) {
            console.log(random_otp);
        }
    });

}


function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-field error';
    small.innerText = message;
}

function checkRepass() {
    var check = false;
    const new_passValue = new_pass.value.trim();
    const confirm_passValue = confirm_pass.value.trim();
    if (new_passValue === '') {
        setErrorFor(new_pass, 'Password cannot be blank');
    }
    if (confirm_passValue === '') {
        setErrorFor(confirm_pass, 'Confirm Password cannot be blank');
    } else if (confirm_passValue !== new_passValue) {
        setErrorFor(confirm_pass, 'Password does not match');
    } else {
        check = true;
    }
    if (check) {
        const getUser = async() => {
            const response = await fetch(apiUser);
            const data = await response.json();
            return data;
        };

        getUser().then((data) => {
            const user = data.find(
                (user) => user.email == email.value,
            );
            if (user) {
                user.password = new_passValue;
                var id = user.id;
                fetch(apiUser + '/' + id, {
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
btnRepass.addEventListener("click", () => {
    checkRepass();
    //console.log(email.value);
})