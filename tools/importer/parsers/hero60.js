/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title (mandatory element)
  const titleElement = element.querySelector('.project-overview-module__description');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the background image (optional element)
  const sliderImageElement = element.querySelector('.project-overview-module__slider-slide');
  const imageUrl = sliderImageElement ? sliderImageElement.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)[1] : '';

  // Create the image element if the URL exists
  const imageElement = imageUrl ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = imageUrl;
  }

  // Prepare the table cells
  const cells = [
    ['Hero'],
    [
      [
        ...(imageElement ? [imageElement] : []),
        (() => {
          const heading = document.createElement('h1');
          heading.textContent = title;
          return heading;
        })(),
      ],
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}