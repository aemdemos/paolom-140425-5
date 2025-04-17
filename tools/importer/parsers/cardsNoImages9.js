/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];

  const cards = element.querySelectorAll('.work-with-us-module__item');

  cards.forEach((card) => {
    const headline = card.querySelector('.work-with-us-module__item-headline');
    const description = card.querySelector('.work-with-us-module__item-description');
    const button = card.querySelector('.work-with-us-module__item-button .button-primary');

    const cardContent = [];

    if (headline) {
      const h3 = document.createElement('h3');
      h3.textContent = headline.textContent.trim();
      cardContent.push(h3);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      cardContent.push(p);
    }

    if (button) {
      const link = document.createElement('a');
      link.href = card.querySelector('form').action;
      link.textContent = button.textContent.trim();
      cardContent.push(link);
    }

    rows.push([cardContent]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}