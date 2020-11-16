import tpl from "./index.tpl";
import "./index.scss";
import { tplReplace } from "../../utils/tools";

export default {
    name: "MoreLoading",
    _tpl(isLoadingMore) {
        return tplReplace(tpl, {
            isLoadingMore: isLoadingMore ? "loading" : "",
            text: isLoadingMore ? '正在加载更多' : '已经到底了~'
        });
    },
    remove(oListWrapper) {
        const oLoading = oListWrapper.querySelector('.more-loading');
        oLoading && oLoading.remove();
    },
    add(oListWrapper, isLoadingMore) {
        const oLoading = oListWrapper.querySelector('.more-loading');
        if(!oLoading) { // loading 不存在才添加
            oListWrapper.innerHTML += this._tpl(isLoadingMore)
        }else {
            return;
        }
    }
};
