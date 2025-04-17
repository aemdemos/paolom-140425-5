/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Extract content from the element
  const cards = Array.from(element.querySelectorAll('.work-with-us-module__item')).map((card) => {
    const titleElement = card.querySelector('.work-with-us-module__item-headline');
    const descriptionElement = card.querySelector('.work-with-us-module__item-description');
    const buttonElement = card.querySelector('.work-with-us-module__item-button button');
    const buttonForm = card.querySelector('.work-with-us-module__item-button');

    // Handle edge cases
    const title = titleElement ? titleElement.textContent.trim() : '';
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';
    const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
    const buttonLink = buttonForm ? buttonForm.getAttribute('action') : '';

    const textContent = [
      document.createElement('h3'),
      document.createElement('p'),
    ];

    textContent[0].textContent = title;
    textContent[1].textContent = description;

    if (buttonText && buttonLink) {
      const linkElement = document.createElement('a');
      linkElement.textContent = buttonText;
      linkElement.setAttribute('href', buttonLink);
      textContent.push(linkElement);
    }

    const imageDiv = element.querySelector('.work-with-us-module-work_with_us_img');
    const backgroundImageMatch = imageDiv && imageDiv.style.backgroundImage.match(/url\("(.*)"\)/);
    const backgroundImage = backgroundImageMatch ? backgroundImageMatch[1] : '';

    const imageElement = document.createElement('img');
    if (backgroundImage) {
      imageElement.src = backgroundImage;
    }

    return [imageElement, textContent];
  });

  const cells = [headerRow, ...cards];

  // Create table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}