/* global WebImporter */
export default function parse(element, { document }) {
    // Array to hold table rows
    const rows = [];

    // Add the header row
    rows.push(['Cards']);

    // Process each card
    const cards = element.querySelectorAll('.home-related-items__card');
    cards.forEach((card) => {
        // Extract image
        const imgElement = card.querySelector('img');
        const image = imgElement ? document.createElement('img') : null;
        if (image) {
            image.src = imgElement.src;
            image.alt = imgElement.alt;
        }

        // Extract text content
        const headline = card.querySelector('.home-related-items__card-headline')?.textContent || '';
        const subheadline = card.querySelector('.home-related-items__card-subheadline')?.textContent || '';

        const textContent = document.createElement('div');
        if (headline) {
            const headingElement = document.createElement('h3');
            headingElement.textContent = headline;
            textContent.appendChild(headingElement);
        }
        if (subheadline) {
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = subheadline;
            textContent.appendChild(paragraphElement);
        }

        // Add row to table
        rows.push([image, textContent]);
    });

    // Create the block table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}