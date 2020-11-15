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

export { formatData, randomNum, tplReplace, scrollToTop, setPageData };
