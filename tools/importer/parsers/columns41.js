/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Header row

  // Extract the image
  const imageContainer = element.querySelector('.text-image-block__image-container');
  const imageUrlStyle = imageContainer ? imageContainer.style.backgroundImage : '';
  const imageUrl = imageUrlStyle.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
  const image = document.createElement('img');
  if (imageUrl) {
    image.src = imageUrl;
  }

  // Extract the headline
  const headline = element.querySelector('.text-image-block__headline');
  const headlineText = headline ? headline.textContent.trim() : '';

  // Extract the description
  const description = element.querySelector('.text-image-block__description');
  const descriptionText = description ? description.textContent.trim() : '';

  // Extract the link
  const linkElement = element.querySelector('.text-image-block__link');
  const link = document.createElement('a');
  if (linkElement) {
    link.href = linkElement.href;
    link.textContent = linkElement.textContent.trim().replace('', '').trim(); // Remove unwanted icon
    link.className = linkElement.className; // Preserve class styling
  }

  // Description block with separated paragraph and link
  const descriptionBlock = document.createElement('div');
  const paragraph = document.createElement('p');
  paragraph.textContent = descriptionText;
  descriptionBlock.appendChild(paragraph);
  if (linkElement) {
    descriptionBlock.appendChild(link);
  }

  // Create the block table
  const cells = [
    headerRow, // Header row
    [
      descriptionBlock, // First column content
      image // Second column content
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}