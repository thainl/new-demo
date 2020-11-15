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

export { formatData, randomNum, tplReplace, scrollToTop };
