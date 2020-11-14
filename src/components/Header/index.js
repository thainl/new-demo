import template from './index.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

export default {
    name: 'Header',
    tpl(options) {
        const { url, title, showLeftIcon, showRightIcon } = options;
        return tplReplace(template, {
            url,
            title,
            showLeftIcon: showLeftIcon ? 'block' : 'none',
            showRightIcon: showRightIcon ? 'block' : 'none',
        })
    }
};