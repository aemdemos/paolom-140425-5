/* global WebImporter */
export default function parse(element, { document }) {
  // Fix the header row to match the example format exactly with bold formatting
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract left rail content
  const leftRail = element.querySelector('.three-columns__left-rail');
  const leftContent = leftRail ? Array.from(leftRail.querySelectorAll('p')) : [];

  // Extract right rail content
  const rightRail = element.querySelector('.three-columns__right-rail');
  const contactInfo = rightRail ? rightRail.querySelector('.person-contact-info') : null;

  const rightContent = [];
  if (contactInfo) {
    const title = contactInfo.querySelector('.person-contact-info__title')?.textContent;
    const items = contactInfo.querySelectorAll('.person-contact-info__items li');

    if (title) {
      const titleElement = document.createElement('p');
      titleElement.textContent = title;
      rightContent.push(titleElement);
    }

    items.forEach((item) => {
      const label = item.querySelector('.person-contact-info__label')?.textContent;
      const value = item.querySelector('a')?.cloneNode(true) || item.querySelector('ul')?.cloneNode(true);

      if (label) {
        const content = document.createElement('p');
        content.innerHTML = `<strong>${label}:</strong>`;
        if (value) {
          content.append(value);
        }
        rightContent.push(content);
      }
    });
  }

  // Create block table structure
  const cells = [
    headerRow,
    [leftContent],
    [rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}