/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  cells.push(['Columns']);

  // Extract left rail content
  const leftRail = element.querySelector('.three-columns__left-rail');
  const servicesSection = leftRail?.querySelector('section[aria-label="Services"]');
  const servicesHeading = servicesSection?.querySelector('.project-tags__heading')?.textContent?.trim() || '';
  const servicesTags = Array.from(servicesSection?.querySelectorAll('.project-tags__tags-wrapper .project-tags__tag') || []).map(tag => {
    const link = document.createElement('a');
    link.href = tag.href || '#';
    link.textContent = tag.textContent.trim();
    return link;
  });

  const servicesCell = document.createElement('div');
  if (servicesHeading) {
    const servicesHeadingElem = document.createElement('h2');
    servicesHeadingElem.textContent = servicesHeading;
    servicesCell.appendChild(servicesHeadingElem);
  }
  servicesCell.append(...servicesTags);

  // Extract right rail content
  const rightRail = element.querySelector('.three-columns__right-rail');
  const marketsSection = rightRail?.querySelector('section[aria-label="Markets"]');
  const marketsHeading = marketsSection?.querySelector('.project-tags__heading')?.textContent?.trim() || '';
  const marketsTags = Array.from(marketsSection?.querySelectorAll('.project-tags__tags-wrapper .project-tags__tag') || []).map(tag => {
    const link = document.createElement('a');
    link.href = tag.href || '#';
    link.textContent = tag.textContent.trim();
    return link;
  });

  const marketsCell = document.createElement('div');
  if (marketsHeading) {
    const marketsHeadingElem = document.createElement('h2');
    marketsHeadingElem.textContent = marketsHeading;
    marketsCell.appendChild(marketsHeadingElem);
  }
  marketsCell.append(...marketsTags);

  // Add the second row with two columns (services and markets)
  cells.push([servicesCell, marketsCell]);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}