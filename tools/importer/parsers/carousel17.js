/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image
  const imgElement = element.querySelector('.home-related-items__img-wrapper img');
  const img = imgElement ? document.createElement('img') : null;
  if (imgElement) {
    img.src = imgElement.src;
    img.alt = imgElement.alt;
  }

  // Extract headline
  const headlineElement = element.querySelector('.home-related-items__card-headline');
  const headline = headlineElement ? document.createElement('h3') : null;
  if (headlineElement) {
    headline.textContent = headlineElement.textContent;
  }

  // Extract subheadline
  const subheadlineElement = element.querySelector('.home-related-items__card-subheadline');
  const subheadline = subheadlineElement ? document.createElement('p') : null;
  if (subheadlineElement) {
    subheadline.textContent = subheadlineElement.textContent;
  }

  // Extract link
  const linkElement = element.querySelector('.home-related-items__card-inner');
  const link = linkElement ? document.createElement('a') : null;
  if (linkElement) {
    link.href = linkElement.href;
    link.textContent = 'Learn more';
  }

  // Build table rows
  const rows = [];

  // Header row
  rows.push(['Carousel']);

  // Content row
  const content = document.createElement('div');
  if (headline) content.appendChild(headline);
  if (subheadline) content.appendChild(subheadline);
  if (link) content.appendChild(link);
  rows.push([img, content]);

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(table);
}