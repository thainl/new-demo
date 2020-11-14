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
    bindEvent(setType) {
        const oNavBar = document.querySelector('.nav-bar');
        const oItems = oNavBar.querySelectorAll('.item');
        oNavBar.addEventListener('click', this._setNav.bind(this, oItems, setType));
    }
};