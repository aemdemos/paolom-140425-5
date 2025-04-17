/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Correctly create header row
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Extracting content for columns dynamically and including images as separate elements
  const columns = [...element.querySelectorAll('.experts-module__content')].map((figure) => {
    // Extracting image
    let image = document.createElement('img');
    const imgStyle = figure.querySelector('.experts-module__img')?.getAttribute('style');
    const imgMatch = imgStyle?.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    if (imgMatch) {
      image.src = imgMatch[1];
    } else {
      image = document.createTextNode(''); // Handle missing image
    }

    // Extracting quote
    const quote = document.createElement('p');
    quote.textContent = figure.querySelector('.experts-module__quote')?.textContent.trim() || '';

    // Extracting author name and job
    const authorInfo = document.createElement('p');
    const authorName = figure.querySelector('.experts-module__author-name')?.textContent.trim() || '';
    const authorJob = figure.querySelector('.experts-module__author-job')?.textContent.trim() || '';
    authorInfo.textContent = `${authorName}, ${authorJob}`;

    // Extracting author link
    const authorLink = document.createElement('a');
    const authorHref = figure.querySelector('.experts-module__cta')?.getAttribute('href');
    if (authorHref) {
      authorLink.href = authorHref;
      authorLink.textContent = 'Read More';
    } else {
      authorLink.textContent = ''; // Handle missing link
    }

    return [image, quote, authorInfo, authorLink];
  });

  rows.push(columns);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}