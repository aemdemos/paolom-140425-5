/* global WebImporter */
export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll('.footer-module__column'));

  const rows = columns.map((column) => {
    const headline = column.querySelector('h2.footer-module__headline')?.textContent.trim();
    if (!headline) return null;

    const items = column.querySelectorAll('.footer-module__link');

    const links = Array.from(items).map((item) => {
      const text = item.textContent.trim();
      const href = item.getAttribute('href');
      if (!text || !href) return null;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', href);
      linkElement.textContent = text;
      return linkElement;
    }).filter(Boolean);

    return [headline, links.length > 0 ? links : ''];
  }).filter(Boolean);

  // Handle social media section ('follow us')
  const socialMediaColumn = element.querySelector('.footer-module__column-follow-us');
  if (socialMediaColumn) {
    const socialLinks = Array.from(socialMediaColumn.querySelectorAll('.footer-module__social-media a')).map((link) => {
      const href = link.getAttribute('href');
      const icon = link.querySelector('img');
      if (!href || !icon) return null;

      const imgElement = document.createElement('img');
      imgElement.src = icon.src;
      imgElement.alt = icon.alt;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', href);
      linkElement.appendChild(imgElement);

      return linkElement;
    }).filter(Boolean);

    rows.push(['follow us', socialLinks]);
  }

  // Create header row with bold text
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const tableData = [headerRow, ...rows];

  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(tableBlock);
}