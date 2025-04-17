/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import cardsNoImages9Parser from './parsers/cardsNoImages9.js';
import embedVideo1Parser from './parsers/embedVideo1.js';
import columns10Parser from './parsers/columns10.js';
import carousel3Parser from './parsers/carousel3.js';
import columns6Parser from './parsers/columns6.js';
import cardsNoImages13Parser from './parsers/cardsNoImages13.js';
import video12Parser from './parsers/video12.js';
import cards11Parser from './parsers/cards11.js';
import columns8Parser from './parsers/columns8.js';
import carousel17Parser from './parsers/carousel17.js';
import columns18Parser from './parsers/columns18.js';
import cardsNoImages2Parser from './parsers/cardsNoImages2.js';
import cards21Parser from './parsers/cards21.js';
import cards20Parser from './parsers/cards20.js';
import cardsNoImages22Parser from './parsers/cardsNoImages22.js';
import cards7Parser from './parsers/cards7.js';
import cardsNoImages19Parser from './parsers/cardsNoImages19.js';
import embedVideo15Parser from './parsers/embedVideo15.js';
import tabs28Parser from './parsers/tabs28.js';
import hero27Parser from './parsers/hero27.js';
import hero30Parser from './parsers/hero30.js';
import hero32Parser from './parsers/hero32.js';
import columns31Parser from './parsers/columns31.js';
import columns5Parser from './parsers/columns5.js';
import embedSocial25Parser from './parsers/embedSocial25.js';
import cards37Parser from './parsers/cards37.js';
import carousel33Parser from './parsers/carousel33.js';
import columns39Parser from './parsers/columns39.js';
import columns36Parser from './parsers/columns36.js';
import columns24Parser from './parsers/columns24.js';
import columns34Parser from './parsers/columns34.js';
import hero46Parser from './parsers/hero46.js';
import columns42Parser from './parsers/columns42.js';
import columns43Parser from './parsers/columns43.js';
import cards35Parser from './parsers/cards35.js';
import columns49Parser from './parsers/columns49.js';
import accordion23Parser from './parsers/accordion23.js';
import accordion26Parser from './parsers/accordion26.js';
import columns41Parser from './parsers/columns41.js';
import cards53Parser from './parsers/cards53.js';
import columns51Parser from './parsers/columns51.js';
import cards54Parser from './parsers/cards54.js';
import cards52Parser from './parsers/cards52.js';
import columns55Parser from './parsers/columns55.js';
import hero60Parser from './parsers/hero60.js';
import cards48Parser from './parsers/cards48.js';
import cards57Parser from './parsers/cards57.js';
import accordion61Parser from './parsers/accordion61.js';
import columns62Parser from './parsers/columns62.js';
import columns29Parser from './parsers/columns29.js';
import tabs59Parser from './parsers/tabs59.js';
import columns45Parser from './parsers/columns45.js';
import columns67Parser from './parsers/columns67.js';
import cards50Parser from './parsers/cards50.js';
import cards56Parser from './parsers/cards56.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cardsNoImages9: cardsNoImages9Parser,
  embedVideo1: embedVideo1Parser,
  columns10: columns10Parser,
  carousel3: carousel3Parser,
  columns6: columns6Parser,
  cardsNoImages13: cardsNoImages13Parser,
  video12: video12Parser,
  cards11: cards11Parser,
  columns8: columns8Parser,
  carousel17: carousel17Parser,
  columns18: columns18Parser,
  cardsNoImages2: cardsNoImages2Parser,
  cards21: cards21Parser,
  cards20: cards20Parser,
  cardsNoImages22: cardsNoImages22Parser,
  cards7: cards7Parser,
  cardsNoImages19: cardsNoImages19Parser,
  embedVideo15: embedVideo15Parser,
  tabs28: tabs28Parser,
  hero27: hero27Parser,
  hero30: hero30Parser,
  hero32: hero32Parser,
  columns31: columns31Parser,
  columns5: columns5Parser,
  embedSocial25: embedSocial25Parser,
  cards37: cards37Parser,
  carousel33: carousel33Parser,
  columns39: columns39Parser,
  columns36: columns36Parser,
  columns24: columns24Parser,
  columns34: columns34Parser,
  hero46: hero46Parser,
  columns42: columns42Parser,
  columns43: columns43Parser,
  cards35: cards35Parser,
  columns49: columns49Parser,
  accordion23: accordion23Parser,
  accordion26: accordion26Parser,
  columns41: columns41Parser,
  cards53: cards53Parser,
  columns51: columns51Parser,
  cards54: cards54Parser,
  cards52: cards52Parser,
  columns55: columns55Parser,
  hero60: hero60Parser,
  cards48: cards48Parser,
  cards57: cards57Parser,
  accordion61: accordion61Parser,
  columns62: columns62Parser,
  columns29: columns29Parser,
  tabs59: tabs59Parser,
  columns45: columns45Parser,
  columns67: columns67Parser,
  cards50: cards50Parser,
  cards56: cards56Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
