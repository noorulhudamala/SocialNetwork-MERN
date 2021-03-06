module.exports.validateRegisterInput = (
    userName,
    email,
  password,
  confirmPassword
 
) => {
    const errors = {};
    console.log(userName, password, confirmPassword, email)
    if (userName.trim() === '') {
        errors.userName = "Username is required"
    }
    if (email.trim() === '') {
        errors.email = "Email is required"
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-z-A-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "Please enter valid email"
        }
    }
    if (password === "") {
        errors.password = "Password is required"
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Password must match"
    }

    return {
        errors,
        valid : Object.keys(errors).length < 1
    }
};

module.exports.validatorLoginInput = (userName, password) => {
    const errors = {};
    if (userName.trim() === '') {
        errors.userName = "Username is required"
    } 
    if (password === "") {
        errors.password = "Password is required"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}