/* global WebImporter */
export default function parse(element, { document }) {
  const cardsData = [];

  // Extract all items from the list
  const items = element.querySelectorAll('li.filter-index-item');

  items.forEach(item => {
    const link = item.querySelector('.tile-container');
    const imageDiv = item.querySelector('.image-column');
    const infoBox = item.querySelector('.information-column__info-box');

    // Extract image
    const imageUrl = imageDiv?.style.backgroundImage.match(/url\("(.*)"\)/)?.[1];
    const image = imageUrl ? document.createElement('img') : null;
    if (image) {
      image.src = imageUrl;
    }

    // Extract text content
    const title = infoBox?.querySelector('.information-column__link')?.textContent;
    const location = infoBox?.querySelector('.information-column__location')?.textContent;
    const architect = infoBox?.querySelector('.information-column__aor')?.textContent;

    const textContainer = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      textContainer.appendChild(titleElement);
    }
    if (location) {
      const locationElement = document.createElement('p');
      locationElement.textContent = location;
      textContainer.appendChild(locationElement);
    }
    if (architect) {
      const architectElement = document.createElement('p');
      architectElement.textContent = architect;
      textContainer.appendChild(architectElement);
    }

    // Push card data if both image and text content exist
    if (image || textContainer.hasChildNodes()) {
      cardsData.push([image, textContainer]);
    }
  });

  // Create table with header row and data rows
  const headerRow = ['Cards'];
  const tableData = [headerRow, ...cardsData];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new table
  element.replaceWith(table);
}