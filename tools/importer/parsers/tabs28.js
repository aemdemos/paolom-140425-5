/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the tabs and their content from the provided HTML
  const tabs = Array.from(element.querySelectorAll('.service-component__tab'));
  const contents = Array.from(element.querySelectorAll('.service-component__tab-info'));

  const headerRow = ['Tabs'];

  // Create rows for the table
  const rows = tabs.map((tab, index) => {
    // Extract the tab label dynamically
    const label = tab.querySelector('.service-component__tab-button')?.textContent.trim() || 'Untitled';
    
    // Ensure the corresponding content exists
    const contentElement = contents[index] || null;

    // Extract headline and description dynamically
    const headline = contentElement?.querySelector('.service-component__tab-headline')?.textContent.trim() || '';
    const description = contentElement?.querySelector('.service-component__tab-description')?.textContent.trim() || '';
    const link = contentElement?.querySelector('.service-component__tab-headline')?.getAttribute('href') || '';

    // Build the content block dynamically
    const content = document.createElement('div');
    
    if (headline) {
      const headlineElement = document.createElement('h3');
      headlineElement.textContent = headline;
      content.appendChild(headlineElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      content.appendChild(descriptionElement);
    }
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.textContent = 'Read More';
      content.appendChild(linkElement);
    }

    // Return the row dynamically as [label, content]
    return [label, content];
  });

  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}