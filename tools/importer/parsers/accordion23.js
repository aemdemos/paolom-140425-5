/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  // Extract title
  const title = element.querySelector('.service-component__tab-button')?.textContent.trim() || 'No Title';

  // Extract content headline and links
  const contentContainer = element.querySelector('.service-component__links-container');
  const contentHeadline = contentContainer?.querySelector('.service-component__links-headline')?.textContent.trim() || '';

  const links = Array.from(contentContainer?.querySelectorAll('a') || []).map((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    return a;
  });

  // Create paragraph element for the headline
  const paragraph = document.createElement('p');
  paragraph.textContent = contentHeadline;

  // Create the block table
  const cells = [
    headerRow,
    [title, [paragraph, ...links]]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}