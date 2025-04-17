/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Extract card data, ensuring card elements are properly processed
  const cards = Array.from(element.querySelectorAll('.home-related-items__card')).map((card) => {
    const image = card.querySelector('picture img');
    if (!image) return null; // Skip cards without images

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const title = card.querySelector('.home-related-items__card-headline')?.textContent.trim() || '';
    const description = card.querySelector('.home-related-items__card-subheadline')?.textContent.trim() || '';

    const textContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      textContent.appendChild(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textContent.appendChild(descriptionElement);
    }

    return [imageElement, textContent];
  }).filter(Boolean); // Remove null entries

  // Finalize table structure with header row and cards
  const cells = [headerRow, ...cards];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table
  element.replaceWith(blockTable);
}