import wrapperTpl from "./wrapper.tpl";
import item0Tpl from "./item0.tpl";
import item1Tpl from "./item1.tpl";
import item2Tpl from "./item2.tpl";
import item3Tpl from "./item3.tpl";
import "./index.scss";

import { tplReplace } from "../../utils/tools";

export default {
    name: "NewsList",
    wrapperTpl(top) {
        return tplReplace(wrapperTpl, { top });
    },
    listTpl({ data, pageNum }) {
        let tpl = item0Tpl;
        let list = "";
        data.map((v, index) => {
            // 筛选用哪个列表模板
            if (v.thumbnail_pic_s && !v.thumbnail_pic_s02) {
                tpl = item1Tpl;
            } else if (v.thumbnail_pic_s02 && !v.thumbnail_pic_s03) {
                tpl = item2Tpl;
            } else if (v.thumbnail_pic_s03) {
                tpl = item3Tpl;
            }
            list += tplReplace(tpl, {
                title: v.title,
                pageNum,
                index,
                pic1: v.thumbnail_pic_s,
                pic2: v.thumbnail_pic_s02,
                pic3: v.thumbnail_pic_s03,
                source: v.author_name,
                date: v.date,
                category: v.category,
            });
        });
        return list;
    },
    imgShow() {
        const oImgs = document.querySelectorAll(".news-list img");
        [...oImgs].forEach((img) => {
            img.onload = function () {
                img.style.opacity = "1";
            };
        });
    },
};
