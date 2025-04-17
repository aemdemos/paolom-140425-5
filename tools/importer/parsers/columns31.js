/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const container = element.querySelector('.service-overview__container');
  const infoSection = container.querySelector('.service-overview__info');
  const heading = infoSection?.querySelector('.service-overview__heading') || document.createElement('div');
  const description = infoSection?.querySelector('.service-overview__description') || document.createElement('div');

  const quoteSection = container.querySelector('.service-overview__quote-inner');
  const quoteText = quoteSection?.querySelector('.service-overview__quote-text') || document.createElement('div');
  const authorName = quoteSection?.querySelector('.service-overview__author-name') || document.createElement('div');
  const authorTitle = quoteSection?.querySelector('.service-overview__author-title') || document.createElement('div');

  // Build table cells
  const headerRow = ['Columns'];

  const contentRow = [
    [heading, description, quoteText, authorName, authorTitle],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the element
  element.replaceWith(block);
}