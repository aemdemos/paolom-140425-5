/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the example exactly
  const headerRow = ['Columns'];

  // Extract stats data dynamically from the provided HTML
  const stats = Array.from(element.querySelectorAll('.stats__data')).map((stat) => {
    // Ensure the stat element exists
    if (!stat) return document.createTextNode('No Data');

    // Extract the main value and caption elements
    const value = stat.querySelector('.stats__value');
    const caption = stat.querySelector('.stats__caption');

    // Clone the text content for proper inclusion in the table
    const valueElement = value ? document.createTextNode(value.textContent.trim()) : document.createTextNode('Missing Value');
    const captionElement = caption ? document.createTextNode(caption.textContent.trim()) : document.createTextNode('Missing Caption');

    // Create a div to structure the cell content
    const cellContent = document.createElement('div');
    cellContent.appendChild(valueElement);
    if (captionElement.textContent.trim()) {
      cellContent.appendChild(document.createElement('br'));
    }
    cellContent.appendChild(captionElement);

    return cellContent;
  });

  // Construct the table rows
  const tableData = [
    headerRow, // Header row
    stats, // Second row containing stats extracted from the HTML
  ];

  // Create the structured table using WebImporter
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}