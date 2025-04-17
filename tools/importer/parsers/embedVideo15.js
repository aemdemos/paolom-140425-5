/* global WebImporter */
export default function parse(element, { document }) {
  // Extract video URL dynamically
  const videoAnchor = element.querySelector('a[href*="vimeo"]');
  const videoURL = videoAnchor ? videoAnchor.href : null;

  // Extract image dynamically, if available
  const imageElement = element.querySelector('img');
  let image = null;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  // Validate extracted content and handle edge cases
  if (!videoURL && !image) {
    console.error('No video URL or image found in the element');
    return;
  }

  // Prepare table header row
  const tableHeader = ['Embed'];

  // Prepare table content row
  const tableContent = [];
  if (image) {
    tableContent.push(image);
  }
  if (videoURL) {
    const videoLink = document.createElement('a');
    videoLink.href = videoURL;
    videoLink.textContent = videoURL;
    tableContent.push(videoLink);
  }

  const cells = [
    tableHeader,
    [tableContent],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table
  element.replaceWith(blockTable);
}