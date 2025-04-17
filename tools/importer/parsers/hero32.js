/* global WebImporter */
export default function parse(element, { document }) {
  // Validate background image extraction
  const imageContainer = element.querySelector('.ideas-article-header.image');
  const backgroundImage = imageContainer?.style.backgroundImage || '';
  const imageUrl = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1]?.trim();
  let imageElement = null;
  if (imageUrl) {
    imageElement = document.createElement('img');
    imageElement.src = imageUrl;
  }

  // Validate title extraction
  const titleElement = element.querySelector('.ideas-article-header__title');
  const title = document.createElement('h1');
  title.textContent = titleElement?.textContent.trim() || '';

  // Validate subheading extraction
  const dateLocationElement = element.querySelector('.ideas-article-header__date-location');
  const subheading = document.createElement('p');
  subheading.textContent = dateLocationElement?.textContent.trim() || '';

  // Building the table structure dynamically
  const headerRow = ['Hero'];
  const contentRow = [[imageElement, title, subheading].filter(Boolean)]; // Combine elements into a single cell

  const cells = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element only if block was created successfully
  if (block) {
    element.replaceWith(block);
  }
}