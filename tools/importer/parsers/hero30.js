/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the background image
  const iframeWrapper = element.querySelector('.video-embed-module__iframe-wrapper');
  const backgroundImageUrl = iframeWrapper.style.backgroundImage
    .replace('url(', '')
    .replace(')', '')
    .replace(/['"]+/g, '');
  const backgroundImage = document.createElement('img');
  backgroundImage.src = backgroundImageUrl;

  // Extract the title
  const titleElement = element.querySelector('.video-embed-module__content-title');
  const title = document.createElement('h1');
  title.textContent = titleElement.textContent.trim();

  // Extract the description
  const descriptionElement = element.querySelector('.video-embed-module__content-description');
  const description = document.createElement('p');
  description.textContent = descriptionElement.textContent.trim();

  // Combine content into a single cell
  const contentCell = document.createElement('div');
  contentCell.append(backgroundImage, title, description);

  const contentRow = [contentCell];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}