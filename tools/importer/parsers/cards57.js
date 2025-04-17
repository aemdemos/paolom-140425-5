/* global WebImporter */
export default function parse(element, { document }) {
  // Filter unique cards based on their attributes to handle duplicate entries
  const cards = Array.from(element.querySelectorAll('.home-related-items__card')).filter((card, index, self) => {
    const headline = card.querySelector('.home-related-items__card-headline')?.textContent.trim();
    return self.findIndex(c => c.querySelector('.home-related-items__card-headline')?.textContent.trim() === headline) === index;
  });

  const rows = cards.map((card) => {
    const imageWrapper = card.querySelector('.home-related-items__img-wrapper img');
    const image = document.createElement('img');
    image.src = imageWrapper?.src || '';
    image.alt = imageWrapper?.alt || '';

    const headline = card.querySelector('.home-related-items__card-headline');
    const subheadlines = Array.from(card.querySelectorAll('.home-related-items__card-subheadline'));

    const textContent = document.createElement('div');
    if (headline) {
      const heading = document.createElement('h3');
      heading.textContent = headline.textContent.trim();
      textContent.appendChild(heading);
    }

    subheadlines.forEach((subheadline) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = subheadline.textContent.trim();
      textContent.appendChild(paragraph);
    });

    return [image, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    ['Cards'],
    ...rows
  ], document);

  element.replaceWith(table);
}