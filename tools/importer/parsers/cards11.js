/* global WebImporter */
export default function parse(element, { document }) {
  // Correcting header row to match example exactly
  const headerRow = ['Cards'];

  // Extracting unique cards only (avoiding duplicates and handling missing attributes)
  const seenCards = new Set();
  const rows = Array.from(element.querySelectorAll('.home-related-items__card')).filter(card => {
    const cardId = card.getAttribute('aria-label');
    if (cardId && !seenCards.has(cardId)) {
      seenCards.add(cardId);
      return true;
    }
    return false;
  }).map(card => {
    const pictureImg = card.querySelector('picture img');
    const headline = card.querySelector('.home-related-items__card-headline');
    const subheadline = card.querySelector('.home-related-items__card-subheadline');

    // Handling missing image attributes dynamically
    const imgElement = document.createElement('img');
    if (pictureImg) {
      imgElement.src = pictureImg.src || '';
      imgElement.alt = pictureImg.alt || 'No alt text available';
    } else {
      imgElement.alt = 'No alt text available';
    }

    // Ensuring headline and subheadline are dynamically fetched and non-empty
    const textContent = [];
    if (headline) {
      const headlineElement = document.createElement('h3');
      headlineElement.textContent = headline.textContent.trim();
      textContent.push(headlineElement);
    }
    if (subheadline) {
      const subheadlineElement = document.createElement('p');
      subheadlineElement.textContent = subheadline.textContent.trim();
      textContent.push(subheadlineElement);
    }

    return [imgElement, textContent];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}