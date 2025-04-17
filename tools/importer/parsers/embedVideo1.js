/* global WebImporter */
export default function parse(element, { document }) {
  const tableData = [];

  // Header row for 'Embed'
  const headerRow = ['Embed'];
  tableData.push(headerRow);

  // Extract dynamic content from the element
  const embedLink = element.querySelector('a.service-component__service-cta');

  // Handle edge cases for missing elements
  const linkElement = embedLink ? embedLink.cloneNode(true) : document.createTextNode('No video available');

  // Single cell containing the dynamic link
  const contentRow = [linkElement];

  tableData.push([contentRow]);

  // Create table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}