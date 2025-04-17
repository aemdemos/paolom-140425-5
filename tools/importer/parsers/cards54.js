/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cards = Array.from(element.querySelectorAll('.home-related-items__card'));

  // Remove duplicate cards based on their content
  const uniqueCards = cards.filter((card, index, self) => {
    const imageSrc = card.querySelector('img')?.src;
    const headlineText = card.querySelector('.home-related-items__card-headline')?.textContent;
    return self.findIndex(
      (c) => c.querySelector('img')?.src === imageSrc && c.querySelector('.home-related-items__card-headline')?.textContent === headlineText
    ) === index;
  });

  const rows = uniqueCards.map((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('.home-related-items__card-headline');
    const descriptionItems = card.querySelectorAll('.home-related-items__card-subheadline');

    // Handle edge cases for missing image, title, or description
    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.src || '';
      imageElement.alt = image.alt || '';
    } else {
      imageElement.alt = 'Image not available';
    }

    const textContent = document.createElement('div');

    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title.textContent;
      textContent.appendChild(titleElement);
    }

    if (descriptionItems.length > 0) {
      descriptionItems.forEach((desc) => {
        const descElement = document.createElement('p');
        descElement.innerHTML = desc.innerHTML;
        textContent.appendChild(descElement);
      });
    } else {
      const emptyDescElement = document.createElement('p');
      emptyDescElement.textContent = 'Description not available';
      textContent.appendChild(emptyDescElement);
    }

    return [imageElement, textContent];
  });

  const tableData = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}