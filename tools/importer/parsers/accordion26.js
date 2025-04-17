/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with the block type
  const headerRow = ['Accordion'];

  // Extract content from the element
  const tabs = Array.from(element.querySelectorAll('.service-component__tab'));

  // Prepare rows for the table
  const tableRows = tabs.map((tab) => {
    const title = tab.querySelector('.service-component__tab-button')?.textContent.trim();

    // Ensure title exists for the row
    if (!title) {
      return null;
    }

    const contentContainer = tab.querySelector('.service-component__links-container');

    // Extract content
    const content = [];

    // Add the headline
    const headline = contentContainer.querySelector('.service-component__links-headline')?.textContent.trim();
    if (headline) {
      content.push(document.createTextNode(headline));
    }

    // Add read more link
    const readMoreLink = contentContainer.querySelector('.service-component__service-cta');
    if (readMoreLink) {
      const readLinkElement = document.createElement('a');
      readLinkElement.href = readMoreLink.href;
      readLinkElement.textContent = readMoreLink.textContent;
      content.push(readLinkElement);
    }

    // Add view all link
    const viewAllLink = contentContainer.querySelector('.service-component__links-view-cta');
    if (viewAllLink) {
      const viewLinkElement = document.createElement('a');
      viewLinkElement.href = viewAllLink.href;
      viewLinkElement.textContent = viewAllLink.textContent;
      content.push(viewLinkElement);
    }

    // Return the row with title and content
    return [title, content];
  }).filter(Boolean); // Remove rows that don't have valid titles

  // Combine header row and content rows
  const cells = [headerRow, ...tableRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}