/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row based on the block type
    const headerRow = ['Cards'];

    // Extract cards from the element
    const cards = Array.from(element.querySelectorAll('.home-related-items__card')).map((card) => {
        const imageElement = card.querySelector('img');
        const image = document.createElement('img');
        image.src = imageElement ? imageElement.src : '';
        image.alt = imageElement ? imageElement.alt : '';

        const titleElement = card.querySelector('.home-related-items__card-headline');
        const title = document.createElement('h3');
        title.textContent = titleElement ? titleElement.textContent : '';

        const descriptionElement = card.querySelector('.home-related-items__card-subheadline');
        const description = document.createElement('p');
        description.textContent = descriptionElement ? descriptionElement.textContent : '';

        return [image, [title, description]];
    });

    // Create the table using the helper function
    const table = WebImporter.DOMUtils.createTable([headerRow, ...cards], document);

    // Replace the original element with the new block table
    element.replaceWith(table);
}