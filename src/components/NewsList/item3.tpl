<div
    class="news-item type-3"
    data-page="{{ pageNum }}"
    data-index="{{ index }}"
>
    <div class="main">
        <div class="title">
            <h4>{{ title }}</h4>
        </div>
        <div class="pic">
            <div class="img-wrapper">
                <img src="{{ pic1 }}" class="news-item-img" alt="{{ title }}" />
            </div>
            <div class="img-wrapper">
                <img src="{{ pic2 }}" class="news-item-img" alt="{{ title }}" />
            </div>
            <div class="img-wrapper last">
                <img src="{{ pic3 }}" class="news-item-img" alt="{{ title }}" />
            </div>
        </div>
    </div>
    <div class="info">
        <span class="source">{{ source }}</span>
        <span class="date">{{ date }}</span>
    </div>
</div>