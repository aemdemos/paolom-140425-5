/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const figures = Array.from(element.querySelectorAll('figure'));

  const contentRows = figures.map(figure => {
    const imgAltElement = figure.querySelector('.experts-module__img p');
    const imgAlt = imgAltElement ? imgAltElement.textContent.trim() : '';

    const quoteElement = figure.querySelector('.experts-module__quote');
    const quote = quoteElement ? quoteElement.textContent.trim() : '';

    const authorNameElement = figure.querySelector('.experts-module__author-name');
    const authorName = authorNameElement ? authorNameElement.textContent.trim() : '';

    const authorJobElement = figure.querySelector('.experts-module__author-job');
    const authorJob = authorJobElement ? authorJobElement.textContent.trim() : '';

    const readMoreLinkElement = figure.querySelector('a');
    const readMoreLink = readMoreLinkElement ? readMoreLinkElement.getAttribute('href') : '';

    const textContent = document.createElement('div');
    textContent.innerHTML = `<blockquote>${quote}</blockquote><footer><strong>${authorName}</strong><br>${authorJob}<br><a href="${readMoreLink}">Read More</a></footer>`;

    return [
      document.createTextNode(imgAlt),
      textContent
    ];
  });

  const tableData = [
    headerRow,
    ...contentRows
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}