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




/***/ }),

/***/ "./_build/scripts/theme/helpers.js":
/*!*****************************************!*\
  !*** ./_build/scripts/theme/helpers.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "getCookie": () => (/* binding */ getCookie),
/* harmony export */   "lockScrolling": () => (/* binding */ lockScrolling),
/* harmony export */   "setCookie": () => (/* binding */ setCookie),
/* harmony export */   "unlockScrolling": () => (/* binding */ unlockScrolling),
/* harmony export */   "updateCanonicalLinks": () => (/* binding */ updateCanonicalLinks)
/* harmony export */ });
// Lock Scrolling

var siteContainerEl = document.querySelector("[data-site-container]");

function lockScrolling() {
  document.body.style.overflowY = "hidden";
}

// Unlock Scrolling
function unlockScrolling() {
  document.body.style.removeProperty("overflow");
}

function setCookie(name, value, days) {
  let expires = "";

  if (days && days !== "") {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = '; expires=""';
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

function getCookie(name) {
  let nameEquals = name + "=";
  let ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(nameEquals) != -1) return c.substring(nameEquals.length, c.length);
  }

  return null;
}

function updateCanonicalLinks(fullUrl) {
  const url = fullUrl.includes("&") ? fullUrl.split("&")[0] : fullUrl;

  const jsonLdScript = document.querySelector('[type="application/ld+json"]');
  const oldJson = jsonLdScript.innerHTML;
  let [preLinkJson, postLinkJson] = oldJson.split('"@id": "');
  postLinkJson = postLinkJson.split(postLinkJson.split('"')[0])[1];
  console.log(`${preLinkJson}"@id": "${url}${postLinkJson}`);
  jsonLdScript.innerHTML = `${preLinkJson}"@id": "${url}${postLinkJson}`;

  const canonicalLink = document.querySelector('[rel="canonical"]');

  canonicalLink.href = theme.url + url;
}

const debounce = (fn, delay) => {
  let timeOutId;
  return function (...args) {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};


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
/*!***************************************************!*\
  !*** ./_build/scripts/sections/ctv-navigation.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inc_theme_section_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inc/theme-section-loader */ "./_build/scripts/inc/theme-section-loader.js");
/* harmony import */ var _theme_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../theme/helpers */ "./_build/scripts/theme/helpers.js");



const selectors = {
  navContainer: "[data-nav-container]",
  navToggle: "[data-nav-open]",
};

const classes = {
  visible: "is-visible",
  active: "is-active",
};

const elements = {};

const sectionEvents = {
  async onLoad() {
    elements.navContainerElement = this.container.querySelector(selectors.navContainer);
    elements.navToggleElement = this.container.querySelector(selectors.navToggle);
    this.initNavigation();
    this.addBreakpointEventListeners();
  },

  // Add event listeners to start or stop the navigation js based on breakpoint.
  addBreakpointEventListeners() {
    window.addEventListener("breakpoint-down:md", this.initNavigation.bind(this));
    window.addEventListener("breakpoint-up:md", this.uninitNavigation.bind(this));
  },

  // Remove event listeners on navigation elements
  uninitNavigation() {
    // Example below
    elements.navOpenElement.removeEventListener("click", this.onClickNavOpen);
    elements.navCloseElement.removeEventListener("click", this.onClickNavClose);
  },

  // Navigation
  initNavigation() {
    const mql = window.matchMedia(`(min-width: ${window.theme.breakpoints.md}px)`);
    if (!mql.matches) {
      if (elements.navToggleElement) {
        elements.navOpenElement.addEventListener("click", this.onClickNavOpen);
      }
    }
  },

  onClickNavOpen() {
    elements.navMobileOverlayElement.classList.add(classes.visible);
    elements.navContainerElement.classList.add(classes.visible);
    (0,_theme_helpers__WEBPACK_IMPORTED_MODULE_1__.lockScrolling)();
  },

  onClickNavClose() {
    elements.navContainerElement.classList.remove(classes.visible);
    elements.navMobileOverlayElement.classList.remove(classes.visible);

    (0,_theme_helpers__WEBPACK_IMPORTED_MODULE_1__.unlockScrolling)();

    let activeNavItems = elements.navContainerElement.querySelectorAll("." + classes.visible);
    activeNavItems.forEach((activeNavItem) => {
      if (activeNavItem) {
        setTimeout(function () {
          elements.navContainerElement.classList.remove(classes.dropdown);
          activeNavItem.classList.remove(classes.visible);
        }, 300);
      }
    });
  },

  onClickMenuItem(e) {
    if (e.target.nextElementSibling) {
      e.preventDefault();
      e.target.nextElementSibling.classList.add(classes.visible);
      elements.navContainerElement.classList.add(classes.dropdown);
    }
  },

  onClickNavInnerBack() {
    elements.navInnerBackElement.parentElement.classList.remove(classes.visible);
  },

  onNavItemEnter() {
    elements.navDesktopOverlayElement.classList.add(classes.visible);
  },

  onNavItemLeave() {
    elements.navDesktopOverlayElement.classList.remove(classes.visible);
  },
};

(0,_inc_theme_section_loader__WEBPACK_IMPORTED_MODULE_0__.loadSection)("section-header", sectionEvents);

})();

/******/ })()
;