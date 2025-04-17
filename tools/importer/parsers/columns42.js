/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const blocks = Array.from(element.querySelectorAll('.experts-module__content')).map((content) => {
    const imageAlt = content.querySelector('.visuallyhidden')?.textContent.trim();

    const quote = content.querySelector('.experts-module__quote')?.textContent.trim();

    const authorName = content.querySelector('.experts-module__author-name')?.textContent.trim();

    const authorJob = content.querySelector('.experts-module__author-job')?.textContent.trim();

    const readMoreLink = content.querySelector('.experts-module__cta')?.getAttribute('href');

    const imageDescription = document.createElement('p');
    imageDescription.textContent = imageAlt;

    const quoteBlock = document.createElement('blockquote');
    quoteBlock.textContent = quote;

    const authorInfo = document.createElement('div');
    authorInfo.innerHTML = `<strong>${authorName}</strong><br>${authorJob}`;

    const link = document.createElement('a');
    link.setAttribute('href', readMoreLink);
    link.textContent = 'Read More';
    
    const contentRow = document.createElement('div');
    contentRow.append(imageDescription, quoteBlock, authorInfo, link);

    return [contentRow];
  });

  const cells = [headerRow, ...blocks];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}