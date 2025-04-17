/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const figures = Array.from(element.querySelectorAll('figure'));

  // Map content to rows excluding header
  const tableData = figures.map((figure) => {
    const imageAlt = figure.querySelector('p.visuallyhidden')?.textContent.trim() || '';
    const quote = figure.querySelector('blockquote.experts-module__quote')?.textContent.trim() || '';
    const authorName = figure.querySelector('.experts-module__author-name')?.textContent.trim() || '';
    const authorJob = figure.querySelector('.experts-module__author-job')?.textContent.trim() || '';
    const readMoreLink = figure.querySelector('a.experts-module__cta')?.cloneNode(true) || '';

    // Properly construct cells
    const quoteCell = document.createElement('blockquote');
    quoteCell.textContent = quote;

    const authorCell = document.createElement('div');
    authorCell.innerHTML = `<strong>${authorName}</strong><br>${authorJob}`;

    return [imageAlt, quoteCell, authorCell, readMoreLink];
  });

  // Correct header row
  const headerRow = ['Columns'];
  const rows = [headerRow, ...tableData];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}