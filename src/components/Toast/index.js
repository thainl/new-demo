import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

let timerShow = null;
let timerHide = null;

export default {
    name: 'Toast',
    _tpl(text) {
        return tplReplace(tpl, {text});
    },
    toast(text, duration=1000, callback){
        this._add(text); // 添加dom
        const oToast = document.querySelector('.toast');
        this._bindEvent(oToast, duration, callback); // 绑定监听过渡结束事件
    },
    _add(text) {
        this._remove();
        const oApp = document.querySelector('#app');
        const child = document.createElement('div');
        child.innerHTML = this._tpl(text);
        oApp.appendChild(child);
        const oToast = document.querySelector('.toast');
        clearTimeout(timerShow);
        // 为了显示过渡效果加入定时器
        timerShow = setTimeout(()=> {
            oToast.style.opacity = '1';
            oToast.style.transform = 'scale(1)';
        }, 50)
    }
    ,_remove() {
        const oToast = document.querySelector('.toast');
        if(oToast) {
            oToast.parentNode.remove();
        }
    },
    _bindEvent(dom, duration, callback) {
        dom.addEventListener('transitionend', this._handleTransitioned.bind(this, dom, duration, callback));
    },
    _handleTransitioned(dom, duration, callback) {
        if(dom.style.opacity == '0'){
            this._remove();
        }else if(dom.style.opacity == '1') {
            clearTimeout(timerHide)
            timerHide = setTimeout(()=>{
                dom.style.opacity = '0';
                dom.style.transform = 'scale(.6)';
                typeof callback == 'function' && callback();
            }, duration)
        }
    }
};