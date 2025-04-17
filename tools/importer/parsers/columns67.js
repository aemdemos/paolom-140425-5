/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row
    const headerRow = ['Columns'];

    // Extract project information
    const projectInfoElement = element.querySelector('#project-info .wrap');

    // Extract location
    const locationElement = projectInfoElement?.querySelector('dt');
    const location = locationElement?.textContent.trim() === 'Location' 
        ? locationElement.nextElementSibling?.textContent.trim() 
        : '';

    // Extract offices
    const officesElement = projectInfoElement?.querySelectorAll('dt');
    const offices = [...officesElement]
        .filter(dt => dt.textContent.trim() === 'Offices')[0]?.nextElementSibling;

    const officeLinks = offices ? [...offices.querySelectorAll('a')].map(link => {
        const officeLink = document.createElement('p');
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        officeLink.appendChild(anchor);
        return officeLink;
    }) : [];

    // Extract client
    const clientElement = projectInfoElement?.querySelectorAll('dt');
    const client = [...clientElement]
        .filter(dt => dt.textContent.trim() === 'Client')[0]?.nextElementSibling?.textContent.trim() || '';

    const projectInfoCell = [
        document.createElement('p').appendChild(document.createTextNode(`Location: ${location}`)),
        ...officeLinks,
        document.createElement('p').appendChild(document.createTextNode(`Client: ${client}`))
    ];

    // Extract main content
    const mainContentElement = element.querySelector('.two-column__body');
    const headline = mainContentElement?.querySelector('.project-text__headline')?.textContent || '';
    const paragraphs = [...mainContentElement?.querySelectorAll('p')].map(p => p.cloneNode(true)) || [];

    const mainContentCell = [
        document.createElement('strong').appendChild(document.createTextNode(headline)),
        ...paragraphs
    ];

    // Extract project stats
    const statsElement = element.querySelector('#project-stats .project-stats__stats');
    const stats = [...statsElement?.querySelectorAll('.project-stats__item')].map(stat => {
        const value = stat.querySelector('.project-stats__item-number')?.textContent || '';
        const caption = stat.querySelector('.project-stats__item-caption')?.textContent || '';
        const statElement = document.createElement('p');
        const strongElement = document.createElement('strong');
        strongElement.textContent = value;
        statElement.appendChild(strongElement);
        statElement.appendChild(document.createTextNode(`: ${caption}`));
        return statElement;
    });

    const projectStatsCell = stats;

    // Create table content
    const cells = [
        headerRow,
        [projectInfoCell, mainContentCell, projectStatsCell]
    ];

    // Create table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the element with new table
    element.replaceWith(table);
}