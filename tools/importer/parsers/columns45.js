/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the headline
  const headline = element.querySelector('.text-image-block__headline')?.textContent?.trim();

  // Extract the description
  const description = element.querySelector('.text-image-block__description')?.textContent?.trim();

  // Extract the image URL from computed styles
  const imageContainer = element.querySelector('.text-image-block__image-container');
  let imageUrl = '';
  if (imageContainer) {
    const computedStyles = document.defaultView.getComputedStyle(imageContainer);
    const backgroundImage = computedStyles.backgroundImage;
    imageUrl = backgroundImage.replace(/url\("?|"?\)/g, '').trim();
  }

  // Handle missing data gracefully
  const columnText = [headline, description].filter(Boolean).join('<br>');

  // Create an image element for the extracted URL, if valid
  const imageElement = document.createElement('img');
  if (imageUrl) {
    imageElement.src = imageUrl;
  }

  // Create the header row
  const headerRow = ['Columns'];

  // Create the table rows and columns
  const cells = [
    headerRow, // Header row with exact format
    [
      columnText || 'Content missing',
      imageUrl ? imageElement : 'Image missing'
    ] // Content row
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}