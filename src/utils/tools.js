function formatData(obj) {
    let str = "";
    for (let key in obj) {
        str += key + "=" + obj[key] + "&";
    }
    return str.replace(/&$/, "");
}

function randomNum() {
    let num = "";
    for (let i = 0; i < 20; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

// 模板变量替换
function tplReplace(tpl, tplObject) {
    return tpl().replace(/\{\{(.*?)\}\}/g, ($, $1) => tplObject[$1.trim()]);
}

function scrollToTop() {
    if(document.documentElement.scrollTop > 0) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }
}

// 把获取到的新闻数据分页
function setPageData(data, size) {
    const pageData = [];
    let index = 0;
    while(index < data.length) {
        pageData.push(data.slice(index, index += size));
    }
    return pageData;
}

// 获取视口尺寸
function getViewportOffset() {
    let w, h;
    if (window.innerWidth) {
        w = window.innerWidth;
        h = window.innerHeight;
    }else {
        if(document.compatMode === 'CSS1Compat') {
            // document.compatMode 查看当前网页的兼容性情况
            // 返回CSS1Compat 表示标准模式  BackCompat表示向后兼容模式
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
        } else if (document.compatMode === 'BackCompat') {
            w = document.body.clientWidth;
            h = document.body.clientHeight;
        }
    }
    return { w, h };
}

// 获取文档的实际尺寸
function getDocumentOffset() {
    return {
        w: document.body.scrollWidth || document.documentElement.scrollWidth,
        h: document.body.scrollHeight || document.documentElement.scrollHeight
    };
}

// 获取滚动条的距离
function getScrollOffset() {
    let x, y;
    if(window.pageXOffset !== undefined) {
        x = window.pageXOffset;
        y = window.pageYOffset;
    }else {
        x = document.body.scrollLeft + document.documentElement.scrollLeft;
        y = document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {x, y};
}

function reachToBottom(callback) {
    const scrollY = getScrollOffset().y; // 页面滚动的距离
    const viewportH = getViewportOffset().h; // 视口高度
    const documentH = getDocumentOffset().h; // 文档内容实际高度
    if(scrollY + viewportH === documentH) {
        callback();
    }
}

export { formatData, randomNum, tplReplace, scrollToTop, setPageData, reachToBottom };
