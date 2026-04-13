/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./_build/scripts/components/theme-section-loader.js":
/*!***********************************************************!*\
  !*** ./_build/scripts/components/theme-section-loader.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addThemeLoadEvent": () => (/* binding */ addThemeLoadEvent),
/* harmony export */   "delayedLoadSection": () => (/* binding */ delayedLoadSection),
/* harmony export */   "loadSection": () => (/* binding */ loadSection)
/* harmony export */ });
//
// Theme Section Loader for Herd themes
//
function loadSection(name, events) {
  console.log('loadsection function for ', name);
  if (!Shopify.theme.sections || !Shopify.theme.sections.register) {
    delayedLoadSection(name, events);
    return;
  }
  const sectionInstances = Shopify.theme.sections.getInstances(name);
  if (sectionInstances.length === 0) {
    Shopify.theme.sections.register(name, events);
  }
  Shopify.theme.sections.load(name);
}

function delayedLoadSection(name, events) {
  var sectionTemplate = { name, events };
  console.log('push section template to theme.liquid var for later loading: ', sectionTemplate);
  theme.sections.push(sectionTemplate);
}

function addThemeLoadEvent() {
  window.addEventListener('load', () => {
    console.log('Theme: Load event fired with sections: ', theme.sections);

    theme.sections.forEach((sectionTemplate) => {
      const sectionInstances = Shopify.theme.sections.getInstances(sectionTemplate.name);
      if (Shopify.theme.sections && sectionInstances.length === 0) {
        Shopify.theme.sections.register(sectionTemplate.name, sectionTemplate.events);
      }
      Shopify.theme.sections.load(sectionTemplate.name);
    });
  });
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./_build/scripts/sections/product-media.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_theme_section_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/theme-section-loader */ "./_build/scripts/components/theme-section-loader.js");


const selectors = {
  featuredImagesSlider: '[data-product-media-feature-slider]',
  featuredImagesSliderPrev: '[data-product-media-feature-slider-prev]',
  featuredImagesSliderNext: '[data-product-media-feature-slider-next]',
  featuredImagesSliderPagination: '[data-product-media-feature-slider-pagination]',
  thumbnailImagesSlider: '[data-product-media-thumbs-slider]',
};

const sectionEvents = {
  async onLoad() {
    this.initSlider();
  },

  initSlider() {
    const featuredImagesSliderElement = this.container.querySelector(selectors.featuredImagesSlider),
      featuredImagesSliderPaginationElement = this.container.querySelector(selectors.featuredImagesSliderPagination),
      featureImagesSliderPrevEl = this.container.querySelector(selectors.featuredImagesSliderPrev),
      featureImagesSliderNextEl = this.container.querySelector(selectors.featuredImagesSliderNext),
      thumbnailImagesSliderElement = this.container.querySelector(selectors.thumbnailImagesSlider);

    if (!thumbnailImagesSliderElement) {
      var swiper = new Swiper(featuredImagesSliderElement, {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 8,
        hashNavigation: {
          watchState: true,
        },
        navigation: {
          nextEl: featureImagesSliderNextEl,
          prevEl: featureImagesSliderPrevEl,
        },
        pagination: {
          el: featuredImagesSliderPaginationElement,
          clickable: true,
        },
      });
    } else {
      var thumbSwiper = new Swiper(thumbnailImagesSliderElement, {
        slidesPerView: '4',
        spaceBetween: 16,
        // loop: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      var swiper = new Swiper(featuredImagesSliderElement, {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        simulateTouch: false,
        spaceBetween: 8,
        hashNavigation: {
          watchState: true,
        },
        navigation: {
          nextEl: featureImagesSliderNextEl,
          prevEl: featureImagesSliderPrevEl,
        },
        pagination: {
          el: featuredImagesSliderPaginationElement,
          clickable: true,
        },
        thumbs: {
          swiper: thumbSwiper,
        },
      });

      if (thumbSwiper.slides.length == 0) {
        setTimeout(() => {
          thumbSwiper.update();
          console.log("Thumbnail swiper wasn't initialised - re-initialised it..");
        }, 1000);
      }
    }

    console.log('Slider initialised', swiper);
  },
};

(0,_components_theme_section_loader__WEBPACK_IMPORTED_MODULE_0__.loadSection)('section-product-media', sectionEvents);

})();

/******/ })()
;