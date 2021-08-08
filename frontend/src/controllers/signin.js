import signinTpl from '../views/signin.art'
const htmlSignin = signinTpl({})

///登录按钮
const _handleSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        //提交表单
        const data = $('#signin').serialize()
        $.ajax({
            url: '/api/users/signin',
            type: 'post',
            dataType:'json',
            data,
            success (res, textStatus, jqXHR){
                const token = jqXHR.getResponseHeader('X-Access-Token')
                localStorage.setItem('node-token',token)
                if (res.ret) {
                    router.go('/index')
                }else {
                    alert(res.data.message)
                    router.go('/signin')
                }
            }
        })
    }
}

// 登录模块
const signin = (router) => {
    return (req, res, next) => {
        res.render(htmlSignin)
        $('#signin').on('submit',_handleSubmit(router))
    }
}

export default signin