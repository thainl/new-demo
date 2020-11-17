import tpl from './index.tpl';
import './index.scss';

export default {
    name: 'ClearFollow',
    tpl,
    bindEvent(clearFollowedList) {
        const oClearFollow = document.querySelector('.clear-follow');
        if(oClearFollow) {
            oClearFollow.addEventListener('click', clearFollowedList);
        }
    }
};