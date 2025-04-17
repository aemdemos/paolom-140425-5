/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements from the HTML
  const items = Array.from(element.querySelectorAll('.experts-module__content'));

  const columns = items.map((item) => {
    const imgDiv = item.querySelector('.experts-module__img');
    const altText = imgDiv.querySelector('p.visuallyhidden')?.textContent.trim();

    const quote = item.querySelector('.experts-module__quote')?.textContent.trim();

    const name = item.querySelector('.experts-module__author-name')?.textContent.trim();
    const jobTitle = item.querySelector('.experts-module__author-job')?.textContent.trim();

    const readMoreLink = item.querySelector('a.experts-module__cta');

    const footerContent = document.createElement('div');
    if (name && jobTitle) {
      footerContent.appendChild(document.createTextNode(`${name} — ${jobTitle}`));
    }

    if (readMoreLink) {
      const link = document.createElement('a');
      link.href = readMoreLink.href;
      link.textContent = 'Read More';
      footerContent.appendChild(document.createElement('br'));
      footerContent.appendChild(link);
    }

    const cellContent = [];
    if (altText) {
      cellContent.push(document.createTextNode(altText));
    }
    cellContent.push(document.createElement('hr'));
    if (quote) {
      cellContent.push(document.createTextNode(quote));
    }
    cellContent.push(document.createElement('hr'));
    if (footerContent.childNodes.length > 0) {
      cellContent.push(footerContent);
    }

    return cellContent;
  });

  const cells = [
    ['Columns'],
    columns,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}