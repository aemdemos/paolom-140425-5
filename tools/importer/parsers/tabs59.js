/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];

  // Extract tabs and their content dynamically
  const navLinks = element.querySelectorAll('nav .sub-nav-module__inner > ul > li > a');
  const menuSections = element.querySelectorAll('.sub-navigation-item');

  const rows = Array.from(navLinks).map((link, index) => {
    const label = link.textContent.trim();

    // Get corresponding content for the tab
    const section = menuSections[index];
    const contentList = section?.querySelectorAll('li > a');

    const contentItems = Array.from(contentList || []).map((item) => {
      const contentText = item.textContent.trim();
      const href = item.getAttribute('href');
      const linkElement = document.createElement('a');
      linkElement.href = href || '#';
      linkElement.textContent = contentText;
      return linkElement;
    });

    return [label, contentItems];
  });

  const cells = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}