/* global WebImporter */

export default function parse(element, { document }) {
    // Extract content
    const headerRow = ['Cards (no images)'];

    const items = element.querySelectorAll('.work-with-us-module__item');

    const rows = Array.from(items).map((item) => {
        const headline = item.querySelector('.work-with-us-module__item-headline');
        const description = item.querySelector('.work-with-us-module__item-description');
        const button = item.querySelector('.work-with-us-module__item-button button');

        const cellContent = [];

        if (headline) {
            const strongElement = document.createElement('strong');
            strongElement.textContent = headline.textContent;
            cellContent.push(strongElement);
        }

        if (description) {
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = description.textContent;
            cellContent.push(paragraphElement);
        }

        if (button) {
            const link = document.createElement('a');
            link.href = item.querySelector('form').action;
            link.textContent = button.textContent;
            cellContent.push(link);
        }

        return [cellContent];
    });

    // Create the table
    const tableData = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element
    element.replaceWith(block);
}