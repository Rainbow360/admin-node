const { json } = require('express')
const { hash, compare, sign, verify  } = require('../utils/tools')
const userModel = require('../models/users')


const e = require('express')
const randomstring = require("randomstring")

//注册用户
const signup =  async(req, res, next) => {

    res.set('content-type','application/json;charset=utf-8')

    const { username, password } = req.body
  
    //密码加密
    const bcrypthPassword = await hash(password)
    //判断用户是否存在
    let findResult = await userModel.findUser(username)
    
    if (findResult) {
        res.render('fail',{
            data: JSON.stringify({
                message: '用户名已存在'
            })
        })
    } else {
        //数据库没有这个用户 开始添加用户
        let result = await userModel.singup({
            username,
            password: bcrypthPassword
        })

        res.render('success', {
            data: JSON.stringify({
                message: '注册成功'
            })
        })
    }
}

//用户登录
const signin = async (req, res) => {

    res.set('content-type','application/json;charset=utf-8')

    const { username, password } = req.body

    let result = await userModel.findUser(username)
    
    // 验证用户是否合法用户
    if (result) {
        let { password: hash } = result
        let compareResult = await compare(password, hash)
        console.log(1);
        if (compareResult) {
           
            // req.session.username = username
            // const sessionId = randomstring.generate()
            // res.set('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly`)
            // console.log(username);
            const token = sign(username)
            console.log(token)
            //自定义守护字段开头以x
            res.set('X-Access-Token', token)
            res.render('success', {
                data: JSON.stringify({
                    message: '登录成功',
                    username,
                })
            })
            
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '密码错误。'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码错误。'
            })
        })
    }

    // console.log(result);
    // const listResult = await userModel.findList()
    // res.render('success', {
    //     data: JSON.stringify(listResult)
    // })
} 

//退出登录
const signout = async (req, res) => {
    req.session = null
    res.render('success', {
        data: JSON.stringify({
            message: '用户退出成功'
        })
    })
} 
//用户列表
const list = async (req, res) => {

    res.set('content-type','application/json;charset=utf-8')

    const listResult = await userModel.findList()
    res.render('success', {
        data: JSON.stringify(listResult)
    })
}

//删除用户
const remove = async (req, res, next) => {
    const { id } = req.body
    let result = await userModel.remove(id)
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '用户删除成功'
            })
        })
    }else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户删除失败'
            })
        })
    }
   
}

//权鉴
const isAuth = async (req, res) => {
    let token = req.get('X-Access-Token')
    console.log(req);
    try {
        let result = verify(token)
        res.render('success', {
            data: JSON.stringify({
                username: req.username
            })
        })
    } catch (error) {
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录'
            })
        })
    }

    //session判断方式
    // if (req.session.username) {
    //     res.render('success', {
    //         data: JSON.stringify({
    //             username: req.session.username
    //         })
    //     })
    // } else {
    //     res.render('fail', {
    //         data: JSON.stringify({
    //             message: '请登录'
    //         })
    //     })
    // }
}
exports.signup = signup
exports.signin = signin
exports.list = list
exports.remove = remove
exports.signout = signout
exports.isAuth = isAuth