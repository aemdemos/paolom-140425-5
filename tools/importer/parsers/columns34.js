/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const columnsData = [];

  // Extracting columns from the footer module
  const columns = element.querySelectorAll('.footer-module__column');
  columns.forEach((column) => {
    const columnContent = [];

    // Extract headline
    const headline = column.querySelector('.footer-module__headline');
    if (headline) {
      const headlineText = document.createElement('strong');
      headlineText.textContent = headline.textContent.trim();
      columnContent.push(headlineText);
    }

    // Extract list items
    const listItems = column.querySelectorAll('.footer-module__collapsible-items > .footer-module__li');
    if (listItems.length > 0) {
      const ul = document.createElement('ul');
      listItems.forEach((item) => {
        const li = document.createElement('li');
        const link = item.querySelector('a');
        if (link) {
          const linkElement = document.createElement('a');
          linkElement.href = link.href;
          linkElement.textContent = link.textContent.trim();
          li.appendChild(linkElement);
        }
        ul.appendChild(li);
      });
      columnContent.push(ul);
    }

    // Extract social media links for the 'follow us' column
    const socialMedia = column.querySelector('.footer-module__social-media');
    if (socialMedia) {
      const socialMediaList = document.createElement('ul');
      socialMedia.querySelectorAll('.footer-module__li').forEach((item) => {
        const socialLink = item.querySelector('a');
        const socialImage = item.querySelector('img');
        if (socialLink && socialImage) {
          const socialLinkElement = document.createElement('a');
          socialLinkElement.href = socialLink.href;
          const imgElement = document.createElement('img');
          imgElement.src = socialImage.src;
          imgElement.alt = socialImage.alt;
          socialLinkElement.appendChild(imgElement);
          const li = document.createElement('li');
          li.appendChild(socialLinkElement);
          socialMediaList.appendChild(li);
        }
      });
      columnContent.push(socialMediaList);
    }

    columnsData.push(columnContent);
  });

  const blockContent = [headerRow, columnsData];

  const blockTable = WebImporter.DOMUtils.createTable(blockContent, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}