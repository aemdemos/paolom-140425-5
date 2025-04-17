/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example structure
  const headerRow = ['Accordion'];

  // Extract rows dynamically from the provided HTML structure
  const rows = Array.from(element.querySelectorAll('.service-component__tab')).map(tab => {
    // Extract the title dynamically
    const titleButton = tab.querySelector('.service-component__tab-button');
    const title = titleButton ? titleButton.textContent.trim() : '';

    // Prepare a container for content dynamically
    const contentContainer = document.createElement('div');

    // Extract headline and append to content
    const headline = tab.querySelector('.service-component__links-headline');
    if (headline) {
      contentContainer.appendChild(headline.cloneNode(true));
    }

    // Extract the list of links and append to content
    const linkList = tab.querySelector('.service-component__links-list-container');
    if (linkList) {
      contentContainer.appendChild(linkList.cloneNode(true));
    }

    // Extract the "View All" link and append to content
    const viewAll = tab.querySelector('.service-component__links-view-cta');
    if (viewAll) {
      contentContainer.appendChild(viewAll.cloneNode(true));
    }

    // Extract the description dynamically from the detail box
    const detailId = `content-${tab.id}`;
    const detailBox = document.querySelector(`#${detailId}`);
    if (detailBox) {
      const description = detailBox.querySelector('.service-component__tab-description');
      if (description) {
        contentContainer.appendChild(description.cloneNode(true));
      }
    }

    // Return the row as an array of [Title, Content]
    return [title, contentContainer];
  });

  // Combine header and rows into a table structure
  const tableData = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}