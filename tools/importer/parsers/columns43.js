/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    // Extracting first expert's data
    const firstFigure = element.querySelector('figure#wu-shu-hao');
    const firstQuote = firstFigure?.querySelector('blockquote')?.textContent.trim() || '';
    const firstAuthorName = firstFigure?.querySelector('.experts-module__author-name')?.textContent.trim() || '';
    const firstAuthorJob = firstFigure?.querySelector('.experts-module__author-job')?.textContent.trim() || '';
    const firstLink = firstFigure?.querySelector('a')?.href || '';
    const firstImageAlt = firstFigure?.querySelector('p.visuallyhidden')?.textContent.trim() || '';

    // Extracting second expert's data
    const secondFigure = element.querySelector('figure#laing-james');
    const secondQuote = secondFigure?.querySelector('blockquote')?.textContent.trim() || '';
    const secondAuthorName = secondFigure?.querySelector('.experts-module__author-name')?.textContent.trim() || '';
    const secondAuthorJob = secondFigure?.querySelector('.experts-module__author-job')?.textContent.trim() || '';
    const secondLink = secondFigure?.querySelector('a')?.href || '';
    const secondImageAlt = secondFigure?.querySelector('p.visuallyhidden')?.textContent.trim() || '';

    // First column content
    const firstColumn = document.createElement('div');
    firstColumn.innerHTML = `
        <p>${firstQuote}</p>
        <p><strong>${firstAuthorName}</strong></p>
        <p>${firstAuthorJob}</p>
        <p>${firstImageAlt}</p>
        ${firstLink ? `<a href="${firstLink}">Read More</a>` : ''}
    `;

    // Second column content
    const secondColumn = document.createElement('div');
    secondColumn.innerHTML = `
        <p>${secondQuote}</p>
        <p><strong>${secondAuthorName}</strong></p>
        <p>${secondAuthorJob}</p>
        <p>${secondImageAlt}</p>
        ${secondLink ? `<a href="${secondLink}">Read More</a>` : ''}
    `;

    const contentRows = [
        [firstColumn],
        [secondColumn]
    ];

    const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

    element.replaceWith(table);
}