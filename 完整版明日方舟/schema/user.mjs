import joi from "joi"

const telephone = joi.string().alphanum().pattern(/^1{1}[3-9]{1}\d{9}$/).required()

const code = joi.string().pattern(/^\d{4}$/).required()

const password = joi.string().pattern(/^[\S]{8,16}$/).required()

const userId = joi.string().required()

const email = joi.string().pattern(/^\w{1,}(@qq.com)?(@163.com)?(@foxmail.com)?(@sina.com)?(@outlook.com)?(@zohomail.com)?(@protonmail.com)?$/).required()

const idNumber = joi.string().required()

const newPassword = joi.string().pattern(/^[\S]{8,16}$/).required()

const oldPassword = joi.string().pattern(/^[\S]{8,16}$/).required()

// 注册的表单验证规则对象
export const reg_register_schema = {
    body:{
        telephone,
        password,
        code,
    }
}

// 登录的表单验证规则对象
export const reg_passLogin_schema = {
    body:{
        telephone,
        password,
        userId
    }
}

// 登录的表单验证规则对象
export const reg_codeLogin_schema = {
    body:{
        telephone,
        code,
        userId
    }
}

// 邮箱的表单验证规则对象
export const reg_email_schema = {
    body:{
        email,
        userId,
        telephone,
        code
    }
}

// 身份证的表单验证规则对象
export const reg_ID_schema = {
    body:{
        idNumber,
        userId,
        telephone,
        code
    }
}


// 新老密码的表单验证规则对象
export const reg_password_schema = {
    body:{
        newPassword,
        userId,
        oldPassword,
        code
    }
}