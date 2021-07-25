class Page {
    // 属性
    constructor() {
        this.curPage = 1
        this.pageSize = 10
    }

    setCurPage(curPage) {
        this.curPage = curPage
    }

    //静态
    // static pageSize = 10
    // static curPage = 1
}

export default new Page()