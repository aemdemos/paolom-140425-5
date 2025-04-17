/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];

  const authors = element.querySelectorAll('.ideas-article-page__author');
  authors.forEach((author) => {
    const titleElement = author.querySelector('a');
    const descriptionElement = author.querySelector('.ideas-article-page__author-bio');
    const ctaElement = author.querySelector('.ideas-article-page__author-cta');

    const cardContent = [];

    if (titleElement && titleElement.textContent.trim()) {
      const strongTitle = document.createElement('strong');
      strongTitle.textContent = titleElement.textContent.trim();
      cardContent.push(strongTitle);
    }

    if (descriptionElement && descriptionElement.textContent.trim()) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = descriptionElement.textContent.trim();
      cardContent.push(descriptionParagraph);
    }

    if (ctaElement && ctaElement.href && ctaElement.textContent.trim()) {
      const linkElement = document.createElement('a');
      linkElement.href = ctaElement.href;
      linkElement.textContent = ctaElement.textContent.trim();
      cardContent.push(linkElement);
    }

    rows.push([cardContent]);
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}