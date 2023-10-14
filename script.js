let data = null;

const escapeString = (string) => {
    const symbols = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    }
    return string.replace(/[&<>]/g, (tag) =>{
        return symbols[tag] || tag;
    })
}



const renderNews = (categoryId) => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId: '')).then(response => response.json()).then((responseData) => {
        data = responseData;
        const mainNews = data.items.slice(0 ,3);
        const smallNews = data.items.slice(3, 12);
        mainNews.forEach((item) => {
            const mainNewsContainer = document.querySelector('.articles__big-column');
            const template = document.createElement('template');
            const category = data.categories.find((categoryItem) => categoryItem.id === item.category_id);
            const source = data.sources.find((sourceItem) => sourceItem.id === item.source_id);

            template.innerHTML = `
            <article class="main-article">
                <div class="main-article__image-container">
                    <img class="main-article__image" src="${encodeURI(item.image)}" alt="Фото новости">
                </div>
                <div class="main-article__content">
                    <span class="article-category main-article__category">${escapeString(category.name)}</span>
                    <h2 class="main-article__title">${item.title}</h2>
                    <p class="main-article__text">${item.description}</p>
                    <span class="article-source main-article__source">${escapeString(source.name)}</span>
                </div>
            </article>
            `;

            mainNewsContainer.appendChild(template.content);
        });

        smallNews.forEach((item) => {
            const smallNewsContainer = document.querySelector('.articles__small-column');
            const template = document.createElement('template');
            const source = data.sources.find((sourceItem) => sourceItem.id === item.source_id);
            const date = new Date(item.date).toLocaleDateString('ru-RU', {month:'long', day: 'numeric'});
            template.innerHTML = `
            <article class="small-article">
                <h2 class="small-article__title">${escapeString(item.title)}</h2>
                <p class="small-article__caption">
                    <span class="article-date small-article__date">${date}</span>
                    <span class="article-source small-article__source">${escapeString(source.name)}</span>
                </p>
            </article>
            `;
            smallNewsContainer.appendChild(template.content);
        });
    })
}