/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Cards'];
  cells.push(headerRow);

  // Extract cards from HTML
  const cardElements = element.querySelectorAll('.ideas-tiles-grid__tile-container');

  cardElements.forEach((cardElement) => {
    const imageElement = cardElement.querySelector('.ideas-tile__image-container img');
    const titleElement = cardElement.querySelector('.ideas-tile__title');

    // Create image element
    const image = document.createElement('img');
    image.src = imageElement?.src || '';
    image.alt = imageElement?.alt || '';

    // Create title element
    const title = document.createElement('h3');
    title.textContent = titleElement?.textContent || '';

    // Add row with image and title
    cells.push([image, title]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}