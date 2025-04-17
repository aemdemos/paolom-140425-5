/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Hero'];

    // Extract title
    const titleElement = element.querySelector('.home-related-items__heading');
    let title;
    if (titleElement) {
        title = document.createElement('h1');
        title.innerHTML = titleElement.textContent.trim();
    } else {
        title = document.createElement('div');
        title.innerHTML = 'No title available';
    }

    // Add separator
    const separator = document.createElement('hr');

    // Extract call-to-action
    const ctaElement = element.querySelector('.home-related-items__cta-2');
    let ctaLink;
    if (ctaElement) {
        ctaLink = document.createElement('a');
        ctaLink.href = ctaElement.href;
        ctaLink.textContent = ctaElement.textContent.replace(/\s+/, '').trim();
    } else {
        ctaLink = document.createElement('div');
        ctaLink.innerHTML = 'No CTA available';
    }

    const contentRow = [title, separator, ctaLink];

    const cells = [
        headerRow,
        [contentRow]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}