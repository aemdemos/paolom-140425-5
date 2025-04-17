/* global WebImporter */
export default function parse(element, { document }) {
    const slides = element.querySelectorAll('.market-hero__item-media-wrapper');
    const cells = [['Carousel']];

    slides.forEach(slide => {
        const imageUrl = slide.style.backgroundImage.match(/url\(("|')?(.*?)\1\)/)?.[2];
        const title = slide.dataset.title;
        const description = slide.dataset.tabdescription;
        const linkText = slide.dataset.linktext;
        const linkUrl = slide.dataset.link;

        const image = document.createElement('img');
        image.src = imageUrl;

        const content = document.createElement('div');
        if (title) {
            const h2 = document.createElement('h2');
            h2.textContent = title;
            content.appendChild(h2);
        }
        if (description) {
            const p = document.createElement('p');
            p.textContent = description;
            content.appendChild(p);
        }
        if (linkText && linkUrl) {
            const a = document.createElement('a');
            a.href = linkUrl;
            a.textContent = linkText;
            content.appendChild(a);
        }

        cells.push([image, content]);
    });

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
}