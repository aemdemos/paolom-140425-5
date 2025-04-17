/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract headline
  const headlineWrapper = element.querySelector('.three-column__headline-wrapper');
  const headline = headlineWrapper ? headlineWrapper.querySelector('h2') : null;

  // Ensure headline is valid
  const headlineContent = headline ? headline.cloneNode(true) : document.createTextNode('');

  // Extract body text
  const bodyWrapper = element.querySelector('.three-column__body');
  const bodyParagraph = bodyWrapper ? bodyWrapper.querySelector('p') : null;

  // Ensure bodyParagraph is valid
  const bodyContent = bodyParagraph ? bodyParagraph.cloneNode(true) : document.createTextNode('');

  const cells = [
    headerRow,
    [headlineContent, bodyContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}