/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the background image from the style block
  const styleBlock = element.querySelector('style');
  const styleContent = styleBlock ? styleBlock.textContent : '';
  const backgroundImageMatch = styleContent.match(/background-image: url\(([^)]+)\)/);
  const backgroundImage = backgroundImageMatch ? backgroundImageMatch[1] : '';

  // Create the image element
  const imageElement = backgroundImage ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = backgroundImage;
  }

  // Extract breadcrumbs
  const breadcrumbsContainer = element.querySelector('.filtered-index-header__breadcrumbs');
  const breadcrumbs = breadcrumbsContainer ? Array.from(breadcrumbsContainer.querySelectorAll('span[itemprop="name"]')).map(breadcrumb => breadcrumb.textContent).join(' | ') : '';

  const breadcrumbsElement = breadcrumbs ? document.createElement('p') : null;
  if (breadcrumbsElement) {
    breadcrumbsElement.textContent = breadcrumbs;
  }

  // Extract the title
  const titleElement = element.querySelector('.filtered-index-header__title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const headingElement = title ? document.createElement('h1') : null;
  if (headingElement) {
    headingElement.textContent = title;
  }

  // Combine breadcrumbs and title into a single cell
  const combinedContent = document.createElement('div');
  if (breadcrumbsElement) {
    combinedContent.appendChild(breadcrumbsElement);
  }
  if (headingElement) {
    combinedContent.appendChild(headingElement);
  }

  // Assemble the block content
  const blockContent = [];
  if (imageElement) {
    blockContent.push(imageElement);
  }
  if (combinedContent.childNodes.length > 0) {
    blockContent.push(combinedContent);
  }

  const cells = [
    headerRow,
    [blockContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}