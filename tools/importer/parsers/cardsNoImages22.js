/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table, exactly as specified
  const headerRow = ['Cards (no images)'];

  // Collect all relevant heading and paragraph elements within the content
  const cards = [];
  let currentCard = null;

  [...element.querySelectorAll('h3, p')].forEach((node) => {
    if (node.tagName.toLowerCase() === 'h3') {
      // Push the previous card to the array and start a new card
      if (currentCard) {
        cards.push(currentCard);
      }
      currentCard = [node.cloneNode(true)]; // Start the new card with the heading
    } else if (currentCard) {
      // Add paragraph content to the current card
      currentCard.push(node.cloneNode(true));
    }
  });

  // Push the last card if available
  if (currentCard) {
    cards.push(currentCard);
  }

  // Convert each card into a single table row
  const rows = cards.map((card) => {
    const combinedContent = document.createElement('div');
    card.forEach((content) => combinedContent.append(content));
    return [combinedContent];
  });

  // Prepend the header row to the rows
  rows.unshift(headerRow);

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}