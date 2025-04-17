/* global WebImporter */

export default function parse(element, { document }) {
  // Extract all unique cards by filtering cloned ones and ensuring no duplicates
  const cards = Array.from(element.querySelectorAll('.home-related-items__card')).filter((card, index, self) => 
    self.indexOf(card) === index && !card.classList.contains('slick-cloned')
  );

  // Header row exactly as specified in the example
  const tableData = [
    ['Cards'],
    ...cards.map((card) => {
      const image = card.querySelector('img');
      const headline = card.querySelector('.home-related-items__card-headline');
      const subheadline = card.querySelector('.home-related-items__card-subheadline');

      const imageElement = image ? document.createElement('img') : null;
      if (imageElement) {
        imageElement.src = image.src;
        imageElement.alt = image.alt;
      }
      
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

      return [imageElement, content];
    })
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created table
  element.replaceWith(blockTable);
}