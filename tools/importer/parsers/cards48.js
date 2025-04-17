/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content dynamically
  const headerRow = ['Cards'];

  const imageDiv = element.querySelector('.experts-module__img');
  let imageUrl = '';
  if (imageDiv && imageDiv.style.backgroundImage) {
    const match = imageDiv.style.backgroundImage.match(/url\("(.*?)"\)/);
    imageUrl = match ? match[1] : '';
  }

  const imageElement = document.createElement('img');
  if (imageUrl) {
    imageElement.src = imageUrl;
  }

  const quoteElement = element.querySelector('.experts-module__quote');
  const quote = quoteElement ? quoteElement.textContent.trim() : '';

  const authorNameElement = element.querySelector('.experts-module__author-name');
  const authorName = authorNameElement ? authorNameElement.textContent.trim() : '';

  const authorJobElement = element.querySelector('.experts-module__author-job');
  const authorJob = authorJobElement ? authorJobElement.textContent.trim() : '';

  const readMoreLinkElement = element.querySelector('.experts-module__cta');
  const linkElement = document.createElement('a');
  if (readMoreLinkElement) {
    linkElement.href = readMoreLinkElement.href;
    linkElement.textContent = 'Read More';
  }

  const contentCell = [];
  if (authorName || authorJob) {
    const headingElement = document.createElement('h3');
    headingElement.textContent = `${authorName}${authorJob ? ', ' + authorJob : ''}`;
    contentCell.push(headingElement);
  }
  if (quote) {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = quote;
    contentCell.push(paragraphElement);
  }
  if (readMoreLinkElement) {
    contentCell.push(linkElement);
  }

  const tableData = [
    headerRow,
    [imageElement, contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}