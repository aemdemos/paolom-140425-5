/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel'];

  // Extract carousel items
  const items = element.querySelectorAll('.market-hero__slider .market-hero__item');

  const rows = Array.from(items).map(item => {
    const mediaWrapper = item.querySelector('.market-hero__item-media-wrapper');

    if (!mediaWrapper) return null;

    // Extract image from background-image style
    const backgroundStyle = mediaWrapper.style.backgroundImage;
    const imageUrl = backgroundStyle && backgroundStyle.match(/url\((.*?)\)/)?.[1].replace(/"/g, '');
    const imgElement = document.createElement('img');
    if (imageUrl) {
      imgElement.src = imageUrl;
    } else {
      imgElement.setAttribute('alt', 'Image not available');
    }

    // Extract text content
    const title = mediaWrapper.getAttribute('data-title');
    const description = mediaWrapper.getAttribute('data-tabdescription');
    const linkText = mediaWrapper.getAttribute('data-linktext');
    const linkHref = mediaWrapper.getAttribute('data-link');

    const content = document.createElement('div');

    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      content.appendChild(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      content.appendChild(descriptionElement);
    }

    if (linkText && linkHref) {
      const linkElement = document.createElement('a');
      linkElement.textContent = linkText;
      linkElement.href = linkHref;
      content.appendChild(linkElement);
    }

    return [imgElement, content];
  }).filter(row => row !== null);

  // Insert header row
  rows.unshift(headerRow);

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(blockTable);
}