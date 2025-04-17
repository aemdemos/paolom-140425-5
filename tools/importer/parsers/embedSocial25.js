/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the relevant links from the element
    const links = Array.from(element.querySelectorAll('.home-related-items__link')).map(link => link.href);

    // Prepare the table content
    const headerRow = ['Embed'];
    const contentRow = [links.join('<br>')]; // Combine all links into a single cell, separated by line breaks

    const tableContent = [
        headerRow,
        contentRow,
    ];

    // Create the new table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(tableContent, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}