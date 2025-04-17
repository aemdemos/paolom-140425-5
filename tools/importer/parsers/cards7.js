/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Cards'];

  // Extract card elements and filter out duplicates
  const cards = element.querySelectorAll('.home-related-items__card');
  const uniqueCards = new Set();
  const filteredCards = Array.from(cards).filter((card) => {
    const headline = card.querySelector('.home-related-items__card-headline');
    const cardID = headline ? headline.textContent : ''; // Use headline text as unique identifier
    if (!uniqueCards.has(cardID)) {
      uniqueCards.add(cardID);
      return true;
    }
    return false;
  });

  // Map extracted data to rows
  const rows = filteredCards.map((card) => {
    const imageWrapper = card.querySelector('.home-related-items__img-wrapper img');
    const headline = card.querySelector('.home-related-items__card-headline');
    const subheadline = card.querySelector('.home-related-items__card-subheadline');

    const image = document.createElement('img');
    image.src = imageWrapper?.src || ''; // Handle missing image
    image.alt = imageWrapper?.alt || 'Image'; // Default alt text if missing

    const content = document.createElement('div');
    if (headline) {
      const title = document.createElement('h3');
      title.textContent = headline.textContent;
      content.appendChild(title);
    }
    if (subheadline) {
      const description = document.createElement('p');
      description.textContent = subheadline.textContent;
      content.appendChild(description);
    }

    return [image, content];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}