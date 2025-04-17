/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const contentRows = [];

  // Extract content from the provided HTML element
  const paragraphs = element.querySelectorAll('.cq-text.section p');

  paragraphs.forEach((para) => {
    const heading = para.querySelector('b');
    const link = para.querySelector('a');

    const rowContent = [];

    // Add heading if exists
    if (heading) {
      const headingText = document.createElement('p');
      headingText.textContent = heading.textContent;
      rowContent.push(headingText.textContent); // Push plain text for heading
    }

    // Add description (content below the heading)
    const descriptionClone = para.cloneNode(true);
    if (heading) {
      descriptionClone.removeChild(descriptionClone.querySelector('b'));
    }
    if (link) {
      descriptionClone.removeChild(descriptionClone.querySelector('a'));
    }

    const descriptionText = descriptionClone.textContent.trim();
    if (descriptionText) {
      rowContent.push(descriptionText); // Push plain text for description
    }

    // Add link if exists
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      rowContent.push(anchor); // Push the proper anchor element
    }

    // Ensure proper separation between heading, description, and link
    if (rowContent.length > 0) {
      contentRows.push(rowContent);
    }
  });

  // Create table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, ...contentRows.map(row => [row])];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}