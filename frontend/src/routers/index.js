import SMERouter from 'sme-router'

const router = new SMERouter('root')

import index from '../controllers/index'

import signin from '../controllers/signin'

//路由守卫
router.use((req) => {
    //第一个打开的页面
    $.ajax({
        url: '/api/users/isAuth',
        dataType:'json',
        headers: {
            'X-Access-Token': localStorage.getItem('node-token') || ''
        },
        success(res) {
            if (res.ret) {
                router.go('/index')
            } else {
                router.go('/signin')
            }
            
        }
        
    })
})

router.route('/', () => {})

router.route('/signin', signin(router))

router.route('/index', index(router))


export default router