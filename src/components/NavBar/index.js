import wrapperTpl from './index.tpl';
import itemTpl from './item.tpl';
import './index.scss';
import { tplReplace, scrollToTop } from '../../utils/tools';

export default {
    name: 'NavBar',
    tpl(data) {
        let itemList = '';
        data.map(({type, title}, i) => {
            itemList += tplReplace(itemTpl, {
                isCurrent: i ? '' : 'current',
                type,
                title
            })
        })
        return tplReplace(wrapperTpl, {
            wrapperWidth: 2.4 * data.length,
            itemList
        })
    },
    _curIndex: 0,
    _setNav(items, setType, e) {
        const tar = e.target;
        const className = tar.className.trim();
        const type = tar.dataset.type;
        if(className === 'item') {
            items[this._curIndex].classList.remove('current');
            setType(type);
            scrollToTop();
            this._curIndex = [].indexOf.call(items, tar);
            items[this._curIndex].classList.add('current');
        }
    },
    _handleShadow(oNavBar) {
        const oApp = document.querySelector('#app');
        const classList = oNavBar.classList;
        if(this.scrollWidth <= this.scrollLeft + oApp.scrollWidth) {
            classList.add('no-shadow');
        }else {
            if([...classList].indexOf('no-shadow') !== -1) {
                classList.remove('no-shadow');
            }
        }
    },
    bindEvent(setType) {
        const oNavBar = document.querySelector('.nav-bar');
        const oItems = oNavBar.querySelectorAll('.item');
        const oScroll = document.querySelector('.nav-bar .scroll');
        oNavBar.addEventListener('click', this._setNav.bind(this, oItems, setType));
        oScroll.addEventListener('scroll', this._handleShadow.bind(oScroll, oNavBar));
    }
};