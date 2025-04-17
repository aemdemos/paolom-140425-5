/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image URL from the background-image style
  const iframeWrapper = element.querySelector('.video-embed-module__iframe-wrapper');
  const backgroundImage = iframeWrapper.style.backgroundImage;
  const imageUrl = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1];

  // Extract video URL from iframe src
  const iframe = element.querySelector('.video-embed-module__iframe');
  const videoUrl = iframe?.src;

  // Extract title and description
  const titleElement = element.querySelector('.video-embed-module__content-title');
  const title = titleElement?.textContent?.trim() || '';

  const descriptionElement = element.querySelector('.video-embed-module__content-description');
  const description = descriptionElement?.textContent?.trim() || '';

  // Handle missing image or video URL
  if (!imageUrl || !videoUrl) {
    console.error('Required image or video URL is missing!');
    return;
  }

  // Construct header row
  const headerRow = ['Video'];

  // Construct content row
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = title; // Adding alt text for accessibility

  const link = document.createElement('a');
  link.href = videoUrl;
  link.textContent = videoUrl;

  const contentRow = [image, link];

  // Create table block
  const cells = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block
  element.replaceWith(block);
}