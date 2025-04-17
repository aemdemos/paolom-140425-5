/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  cells.push(['Cards']);

  // Process each card tile
  const tiles = element.querySelectorAll('.ideas-tiles-grid__tile-container');
  tiles.forEach(tile => {
    const imageElement = tile.querySelector('img');
    const titleElement = tile.querySelector('.ideas-tile__title');
    const contentTypeElement = tile.querySelector('.ideas-tile__content-type');

    // Check for missing data
    if (!imageElement || !titleElement || !contentTypeElement) {
      return; // Skip this tile if required data is missing
    }

    // Extract image
    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;

    // Extract title
    const title = document.createElement('h3');
    title.textContent = titleElement.textContent.trim();

    // Extract content type
    const contentType = document.createElement('p');
    contentType.textContent = contentTypeElement.textContent.trim();

    // Combine extracted elements
    const textContent = [contentType, title];

    // Add to cells array
    cells.push([image, textContent]);
  });

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}