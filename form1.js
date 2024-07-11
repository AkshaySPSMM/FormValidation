document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const gender = document.getElementsByName('gender');
    const birthday = document.getElementById('birthday');
    const terms = document.getElementById('terms');
    const consent = document.getElementById('consent');
    const optionalFields = document.querySelectorAll('.optional');
    const requiredFields = [firstName, lastName, address, password, password2, phoneNumber];

    consent.addEventListener('change', () => {
        optionalFields.forEach(field => {
            if (consent.checked) {
                field.classList.add('required');
                field.classList.remove('optional');
            }
            else {
                field.classList.remove('required');
                field.classList.add('optional');
            }
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });

    const setErrorMsg = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidName = name => {
        const re = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        return re.test(name);
    }

    const isValidEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidPassword = password => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };

    const isValidBirthday = birthday => {
        const mindate = new Date('2000-01-01');
        const birthDate = new Date(birthday);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && birthDate >= mindate;
    };



    const validateRequiredField = (field, message) => {
        if (field.value.trim() === '') {
            setErrorMsg(field, message);
            return false;
        } else {
            setSuccess(field);
            return true;
        }
    };

    const validateInputs = () => {
        let firstErrorElement = null;

        const allRequiredFieldsValid = requiredFields.every(field => {
            const isValid = validateRequiredField(field, `${field.previousElementSibling.innerHTML.replace('*', '')} is required`);
            if (!isValid && !firstErrorElement) {
                firstErrorElement = field;
            }
            return isValid;
        });

        const validateAdditionalFields = () => {
            let flag = true;

            const fname = firstName.value;
            const lname = lastName.value;
            const passwordValue = password.value;
            const password2Value = password2.value;
            const phoneNumberValue = phoneNumber.value;
            const emailValue = email.value;
            const birthdayValue = birthday.value;
            const personalDetailsChecked = consent.checked;

            if (!isValidName(fname)) {
                setErrorMsg(firstName, 'Invalid Entry');
                if (!firstErrorElement)
                    firstErrorElement = firstName;
                flag = false;
            } else {
                setSuccess(firstName);
            }

            if (!isValidName(lname)) {
                setErrorMsg(lastName, 'Invalid Entry');
                if (!firstErrorElement)
                    firstErrorElement = lastName;
                flag = false;
            } else {
                setSuccess(lastName);
            }

            if (!isValidPassword(passwordValue)) {
                setErrorMsg(password, 'Password must be at least 8 characters long and contain at least one letter and one number');
                if (!firstErrorElement)
                    firstErrorElement = password;
                flag = false;
            } else {
                setSuccess(password);
            }

            if (passwordValue !== password2Value) {
                setErrorMsg(password2, "Passwords don't match");
                if (!firstErrorElement)
                    firstErrorElement = password2;
                flag = false;
            } else {
                setSuccess(password2);
            }

            const phoneRe = /^\d{10,11}$/;
            if (!phoneRe.test(phoneNumberValue)) {
                setErrorMsg(phoneNumber, 'Phone Number must be 10 or 11 digits');
                if (!firstErrorElement)
                    firstErrorElement = phoneNumber;
                flag = false;
            } else {
                setSuccess(phoneNumber);
            }

            if (personalDetailsChecked) {
                if (!isValidEmail(emailValue)) {
                    setErrorMsg(email, 'Provide a valid email address');
                    if (!firstErrorElement)
                        firstErrorElement = email;
                    flag = false;
                } else {
                    setSuccess(email);
                }

                if (!isValidBirthday(birthdayValue)) {
                    setErrorMsg(birthday, 'Invalid entry');
                    if (!firstErrorElement)
                        firstErrorElement = birthday;
                    flag = false;
                } else {
                    setSuccess(birthday);
                }

                const genderChecked = Array.from(gender).some(radio => radio.checked);
                if (!genderChecked) {
                    setErrorMsg(gender[0], 'Gender is required');
                    if (!firstErrorElement)
                        firstErrorElement = gender[0];
                    flag = false;
                } else {
                    setSuccess(gender[0]);
                }
            }

            return flag;
        };

        const termsChecked = terms.checked;
        if (!termsChecked) {
            setErrorMsg(terms, 'You must accept the Terms and Conditions');
            if (!firstErrorElement)
                firstErrorElement = terms;
        } else {
            setSuccess(terms);
        }

        if (allRequiredFieldsValid && termsChecked) {
            const additionalFieldsValid = validateAdditionalFields();

            if (additionalFieldsValid) {
                window.location.href = 'dashboard.html';
            }
        }

        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorElement.focus();
        }
    };
});
