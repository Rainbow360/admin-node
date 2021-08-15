import usersAddTpl from '../../views/users-add.art'
import page from '../../databus/page'

import { usersAdd as usersAddModel } from '../../models/users-add'
// 添加用户
export const addUser = (router) => {

    const html = usersAddTpl()
    $('#user-lsit-box').after(html)

    //提交表单
    const _save = async  () => {
        const data = $('#users-form').serialize()
        console.log(data);
        let result = await usersAddModel(data)
        if (result.ret) {
            //添加数据后渲染
            page.setCurPage(1)
            // _loadData()
            //告知list页面要重新渲染
            $('body').trigger('addUser')
        }

        //单击关闭模态框
        const $btnClose = $('#users-close')
        $btnClose.click()
    }

    //添加用户点击提交表单
    $('#users-save').on('click', _save)
    
}

