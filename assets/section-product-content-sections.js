/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./_build/scripts/inc/theme-section-loader.js":
/*!****************************************************!*\
  !*** ./_build/scripts/inc/theme-section-loader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addThemeLoadEvent: () => (/* binding */ addThemeLoadEvent),
/* harmony export */   delayedLoadSection: () => (/* binding */ delayedLoadSection),
/* harmony export */   loadSection: () => (/* binding */ loadSection)
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
/*!*************************************************************!*\
  !*** ./_build/scripts/sections/product-content-sections.js ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inc_theme_section_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inc/theme-section-loader */ "./_build/scripts/inc/theme-section-loader.js");


const selectors = {
	slider: '[data-pcp-slider]',
	pagination: '[data-pcp-pagination]',
};

const sectionEvents = {
	async onLoad() {
		const mql = window.matchMedia(`(max-width: 1023.9px)`);

		if (mql.matches) {
			this.loadSlider();
		}
	},

	loadSlider() {
		if (window.theme.Swiper) {
			this.initSlider();
		} else {
			document.addEventListener(
				'theme:inititialised',
				() => {
					this.initSlider();
				},
				{ once: true }
			);
		}
	},

	initSlider() {
		const sliderElement = document.querySelector(selectors.slider);
		const pagination = sliderElement.querySelector(selectors.pagination);
		if (sliderElement) {
			new window.theme.Swiper(sliderElement, {
				slidesPerView: 1,
				loop: true,
				speed: 800,
				spaceBetween: 16,
				simulateTouch: true,
				autoplay: {
					delay: 6000,
				},
				pagination: {
					el: pagination,
					clickable: true,
				},
				breakpoints: {
					[theme.breakpoints.md]: {
						slidesPerView: 2,
					},
					[theme.breakpoints.lg]: {
						slidesPerView: 3,
					},
					[theme.breakpoints.xl]: {
						slidesPerView: 4,
					},
				},
			});
		}
	},
};

(0,_inc_theme_section_loader__WEBPACK_IMPORTED_MODULE_0__.delayedLoadSection)('section-product-content-points', sectionEvents);

})();

/******/ })()
;