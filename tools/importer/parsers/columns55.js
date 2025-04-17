/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the input element
  const imageContainer = element.querySelector('.text-image-block__image-container');
  const imageUrlMatch = imageContainer ? imageContainer.style.backgroundImage.match(/url\("(.*?)"\)/) : null;
  const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';

  const headline = element.querySelector('.text-image-block__headline')?.textContent.trim() || 'Missing headline';
  const description = element.querySelector('.text-image-block__description')?.textContent.trim() || 'Missing description';

  // Handle edge cases where data is missing
  const image = document.createElement('img');
  if (imageUrl) {
    image.src = imageUrl;
  } else {
    image.alt = 'Image missing';
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = headline;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;

  // Ensure header matches example
  const headerRow = ['Columns'];

  // Create table structure dynamically
  const cells = [
    headerRow,
    [image, [titleElement, descriptionElement]],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}