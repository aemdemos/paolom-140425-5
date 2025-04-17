/* global WebImporter */
export default function parse(element, { document }) {
  // Extract menu items dynamically from the provided HTML
  const navItems = Array.from(element.querySelectorAll('.sub-nav-module__nav-link'));

  const columns = navItems.map(navItem => {
    const title = navItem.textContent.trim();

    // Extract submenu links for each column dynamically
    const subMenu = navItem.nextElementSibling;
    const links = subMenu ? Array.from(subMenu.querySelectorAll('a')).map(link => {
      const text = link.textContent.trim();
      const href = link.href;
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = text;
      return anchor;
    }) : [];

    // Create a container element for title and links
    const container = document.createElement('div');
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    container.appendChild(titleElement);
    links.forEach(link => container.appendChild(link));
    return container;
  });

  // Create the block table using WebImporter.DOMUtils.createTable
  const cells = [
    ['Columns'],
    columns,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}