/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract left column content
  const leftRail = element.querySelector('.three-columns__left-rail article');
  const leftContent = document.createElement('div');

  if (leftRail) {
    const paragraphs = leftRail.querySelectorAll('p');
    paragraphs.forEach((p) => {
      leftContent.appendChild(p.cloneNode(true));
    });
  } else {
    leftContent.textContent = 'No content available';
  }

  // Extract right column content
  const rightRail = element.querySelector('.three-columns__right-rail .person-contact-info');
  const rightContent = document.createElement('div');

  if (rightRail) {
    const wrapper = rightRail.querySelector('.person-contact-info__wrapper');
    if (wrapper) {
      rightContent.appendChild(wrapper.cloneNode(true));
    } else {
      rightContent.textContent = 'No contact information available';
    }
  } else {
    rightContent.textContent = 'No content available';
  }

  // Ensure cells have a fallback for missing content
  const cells = [
    headerRow,
    [leftContent || document.createElement('div'), rightContent || document.createElement('div')],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}