/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header Row
  const headerRow = ['Columns'];  // Ensure the header matches the example exactly
  cells.push(headerRow);

  // Content Rows
  const figures = element.querySelectorAll('.experts-module__content');
  const contentRow = [];

  figures.forEach(figure => {
    const authorName = figure.querySelector('.experts-module__author-name')?.textContent?.trim() || '';
    const authorJob = figure.querySelector('.experts-module__author-job')?.textContent?.trim() || '';
    const quote = figure.querySelector('.experts-module__quote')?.textContent?.trim() || '';
    const readMoreLink = figure.querySelector('.experts-module__cta')?.href || '';

    const contentElement = document.createElement('div');
    const nameJobElement = document.createElement('p');
    nameJobElement.textContent = `${authorName}, ${authorJob}`;  // Use plain text instead of markdown-style formatting

    const quoteElement = document.createElement('p');
    quoteElement.textContent = quote;

    const readMoreElement = document.createElement('a');
    readMoreElement.href = readMoreLink;
    readMoreElement.textContent = 'Read More';

    contentElement.append(nameJobElement, quoteElement, readMoreElement);
    contentRow.push(contentElement);
  });

  cells.push(contentRow);

  // Create Table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}