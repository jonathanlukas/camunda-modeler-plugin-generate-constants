/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/bpmn-js-extension/ExampleBpmnJsExtension.js":
/*!************************************************************!*\
  !*** ./client/bpmn-js-extension/ExampleBpmnJsExtension.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExampleBpmnJsExtension)
/* harmony export */ });
/* harmony import */ var _messageHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageHandler.js */ "./client/bpmn-js-extension/messageHandler.js");
/* harmony import */ var _signalHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signalHandler.js */ "./client/bpmn-js-extension/signalHandler.js");
/* harmony import */ var _bpmnErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bpmnErrorHandler.js */ "./client/bpmn-js-extension/bpmnErrorHandler.js");
/* harmony import */ var _taskHandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskHandler.js */ "./client/bpmn-js-extension/taskHandler.js");
/* harmony import */ var _escalationHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./escalationHandler.js */ "./client/bpmn-js-extension/escalationHandler.js");
/* harmony import */ var _idHandler_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./idHandler.js */ "./client/bpmn-js-extension/idHandler.js");
/* harmony import */ var _javaGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./javaGenerator.js */ "./client/bpmn-js-extension/javaGenerator.js");








const handlers = [
  _messageHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  _signalHandler_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _bpmnErrorHandler_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  _taskHandler_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  _escalationHandler_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  _idHandler_js__WEBPACK_IMPORTED_MODULE_5__["default"],
];

const generators = {
  java: _javaGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"],
};

function ExampleBpmnJsExtension(
  elementRegistry,
  editorActions,
  canvas,
  modeling
) {
  editorActions.register({
    "generateConstants:java": function () {
      generateConstants("java");
    },
    "generateConstants:python": function () {
      generateConstants("python");
    },
  });

  const generateConstants = (language) => {
    const result = parse();
    const generated = generators[language](result);
  };

  const parse = () => {
    const result = {
      messages: [],
      signals: [],
      bpmnErrorCodes: [],
      bpmnEscalationCodes: [],
      externalTaskTopics: [],
      delegateExpressions: [],
      javaClasses: [],
      jobTypes: [],
      elementIds: {},
    };
    var elements = elementRegistry._elements;
    Object.keys(elements).forEach(function (key) {
      var businessObject = elements[key].element.businessObject;
      const context = {
        element: businessObject,
        result: result,
      };
      handlers.forEach((h) => h(context));
    });
    console.log(result);
    return result;
  };
}

ExampleBpmnJsExtension.$inject = [
  "elementRegistry",
  "editorActions",
  "canvas",
  "modeling",
];


/***/ }),

/***/ "./client/bpmn-js-extension/bpmnErrorHandler.js":
/*!******************************************************!*\
  !*** ./client/bpmn-js-extension/bpmnErrorHandler.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].errorRef
  ) {
    const bpmnErrorCode =
      context.element.eventDefinitions[0].errorRef.errorCode;
    console.log(`BPMN Error found: ${bpmnErrorCode}`);
    if (!context.result.bpmnErrorCodes.includes(bpmnErrorCode)) {
      context.result.bpmnErrorCodes.push(bpmnErrorCode);
    }
  }
}


/***/ }),

/***/ "./client/bpmn-js-extension/escalationHandler.js":
/*!*******************************************************!*\
  !*** ./client/bpmn-js-extension/escalationHandler.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].escalationRef
  ) {
    const bpmnEscalationCode =
      context.element.eventDefinitions[0].escalationRef.escalationCode;
    console.log(`BPMN Escalation found: ${bpmnEscalationCode}`);
    if (!context.result.bpmnEscalationCodes.includes(bpmnEscalationCode)) {
      context.result.bpmnEscalationCodes.push(bpmnEscalationCode);
    }
  }
}


/***/ }),

/***/ "./client/bpmn-js-extension/idHandler.js":
/*!***********************************************!*\
  !*** ./client/bpmn-js-extension/idHandler.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  // find relevant data from process element
  const type = context.element.$type.substring(
    context.element.$type.indexOf(":") + 1
  );
  const name = context.element.name;
  const id = context.element.id;
  // check if type already exists
  let names = context.result.elementIds[type];
  if (!names) {
    // if not, create it on results
    context.result.elementIds[type] = {};
    names = context.result.elementIds[type];
  }
  // create name to insert
  let counter = 0;
  let nameToInsert = name || id;
  while (names[nameToInsert] && names[nameToInsert] !== id) {
    nameToInsert = `${name}_${counter}`;
    counter++;
  }
  // insert id to result
  names[nameToInsert] = id;
}


/***/ }),

/***/ "./client/bpmn-js-extension/index.js":
/*!*******************************************!*\
  !*** ./client/bpmn-js-extension/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ExampleBpmnJsExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExampleBpmnJsExtension */ "./client/bpmn-js-extension/ExampleBpmnJsExtension.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __init__: ["GENERATE_CONSTANTS"],
  GENERATE_CONSTANTS: ["type", _ExampleBpmnJsExtension__WEBPACK_IMPORTED_MODULE_0__["default"]],
});


/***/ }),

/***/ "./client/bpmn-js-extension/javaGenerator.js":
/*!***************************************************!*\
  !*** ./client/bpmn-js-extension/javaGenerator.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(result) {}


/***/ }),

/***/ "./client/bpmn-js-extension/messageHandler.js":
/*!****************************************************!*\
  !*** ./client/bpmn-js-extension/messageHandler.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  let messageName = undefined;
  if (context.element.messageRef) {
    messageName = context.element.messageRef.name;
  }
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].messageRef
  ) {
    messageName = context.element.eventDefinitions[0].messageRef.name;
  }
  if (messageName) {
    console.log(`Message found: ${messageName}`);
    if (!context.result.messages.includes(messageName)) {
      context.result.messages.push(messageName);
    }
  }
}


/***/ }),

/***/ "./client/bpmn-js-extension/signalHandler.js":
/*!***************************************************!*\
  !*** ./client/bpmn-js-extension/signalHandler.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  if (
    context.element.eventDefinitions &&
    context.element.eventDefinitions[0] &&
    context.element.eventDefinitions[0].signalRef
  ) {
    const signalName = context.element.eventDefinitions[0].signalRef.name;
    console.log(`Signal found: ${signalName}`);
    if (!context.result.signals.includes(signalName)) {
      context.result.signals.push(signalName);
    }
  }
}


/***/ }),

/***/ "./client/bpmn-js-extension/taskHandler.js":
/*!*************************************************!*\
  !*** ./client/bpmn-js-extension/taskHandler.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  if (context.element.topic) {
    const externalTaskTopic = context.element.topic;
    console.log(`External Task Topic found: ${externalTaskTopic}`);
    if (!context.result.externalTaskTopics.includes(externalTaskTopic)) {
      context.result.externalTaskTopics.push(externalTaskTopic);
    }
  }

  if (context.element.delegateExpression) {
    const delegateExpression = context.element.delegateExpression;
    console.log(`Delegate Expression found: ${delegateExpression}`);
    if (!context.result.delegateExpressions.includes(delegateExpression)) {
      context.result.delegateExpressions.push(delegateExpression);
    }
  }

  if (context.element.class) {
    const javaClass = context.element.class;
    console.log(`Java Class found: ${javaClass}`);
    if (!context.result.javaClasses.includes(javaClass)) {
      context.result.javaClasses.push(javaClass);
    }
  }

  if (
    context.element.extensionElements &&
    context.element.extensionElements.values &&
    context.element.extensionElements.values[0] &&
    context.element.extensionElements.values[0].type
  ) {
    const jobType = context.element.extensionElements.values[0].type;
    console.log(`Job Type found: ${jobType}`);
    if (!context.result.jobTypes.includes(jobType)) {
      context.result.jobTypes.push(jobType);
    }
  }
}


/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getModelerDirectory: () => (/* binding */ getModelerDirectory),
/* harmony export */   getPluginsDirectory: () => (/* binding */ getPluginsDirectory),
/* harmony export */   registerBpmnJSModdleExtension: () => (/* binding */ registerBpmnJSModdleExtension),
/* harmony export */   registerBpmnJSPlugin: () => (/* binding */ registerBpmnJSPlugin),
/* harmony export */   registerClientExtension: () => (/* binding */ registerClientExtension),
/* harmony export */   registerClientPlugin: () => (/* binding */ registerClientPlugin),
/* harmony export */   registerCloudBpmnJSModdleExtension: () => (/* binding */ registerCloudBpmnJSModdleExtension),
/* harmony export */   registerCloudBpmnJSPlugin: () => (/* binding */ registerCloudBpmnJSPlugin),
/* harmony export */   registerCloudDmnJSModdleExtension: () => (/* binding */ registerCloudDmnJSModdleExtension),
/* harmony export */   registerCloudDmnJSPlugin: () => (/* binding */ registerCloudDmnJSPlugin),
/* harmony export */   registerDmnJSModdleExtension: () => (/* binding */ registerDmnJSModdleExtension),
/* harmony export */   registerDmnJSPlugin: () => (/* binding */ registerDmnJSPlugin),
/* harmony export */   registerPlatformBpmnJSModdleExtension: () => (/* binding */ registerPlatformBpmnJSModdleExtension),
/* harmony export */   registerPlatformBpmnJSPlugin: () => (/* binding */ registerPlatformBpmnJSPlugin),
/* harmony export */   registerPlatformDmnJSModdleExtension: () => (/* binding */ registerPlatformDmnJSModdleExtension),
/* harmony export */   registerPlatformDmnJSPlugin: () => (/* binding */ registerPlatformDmnJSPlugin)
/* harmony export */ });
/**
 * Validate and register a client plugin.
 *
 * @param {Object} plugin
 * @param {String} type
 */
function registerClientPlugin(plugin, type) {
  var plugins = window.plugins || [];
  window.plugins = plugins;

  if (!plugin) {
    throw new Error('plugin not specified');
  }

  if (!type) {
    throw new Error('type not specified');
  }

  plugins.push({
    plugin: plugin,
    type: type
  });
}

/**
 * Validate and register a client plugin.
 *
 * @param {import('react').ComponentType} extension
 *
 * @example
 *
 * import MyExtensionComponent from './MyExtensionComponent';
 *
 * registerClientExtension(MyExtensionComponent);
 */
function registerClientExtension(component) {
  registerClientPlugin(component, 'client');
}

/**
 * Validate and register a bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerBpmnJSPlugin(BpmnJSModule);
 */
function registerBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.modeler.additionalModules');
}

/**
 * Validate and register a platform specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformBpmnJSPlugin(BpmnJSModule);
 */
function registerPlatformBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.platform.modeler.additionalModules');
}

/**
 * Validate and register a cloud specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudBpmnJSPlugin(BpmnJSModule);
 */
function registerCloudBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.cloud.modeler.additionalModules');
}

/**
 * Validate and register a bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerBpmnJSModdleExtension(moddleDescriptor);
 */
function registerBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerPlatformBpmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.platform.modeler.moddleExtension');
}

/**
 * Validate and register a cloud specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerCloudBpmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerDmnJSModdleExtension(moddleDescriptor);
 */
function registerDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.modeler.moddleExtension');
}

/**
 * Validate and register a cloud specific dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerCloudDmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerPlatformDmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.platform.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.modeler.${c}.additionalModules`));
}

/**
 * Validate and register a cloud specific dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerCloudDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerCloudDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.cloud.modeler.${c}.additionalModules`));
}

/**
 * Validate and register a platform specific dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerPlatformDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerPlatformDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.platform.modeler.${c}.additionalModules`));
}

/**
 * Return the modeler directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getModelerDirectory() {
  return window.getModelerDirectory();
}

/**
 * Return the modeler plugin directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getPluginsDirectory() {
  return window.getPluginsDirectory();
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers */ "./node_modules/camunda-modeler-plugin-helpers/index.js");
/* harmony import */ var _bpmn_js_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bpmn-js-extension */ "./client/bpmn-js-extension/index.js");
/** 
 * NOTE: This is specifically a registration of a **bpmn-js** extension. If you would like to create another type of plugin 
 * (say a client extension), the structure of the plugin and the function to register it will be slightly different.
 * 
 * Please refer to:
 * Examples plugins - https://github.com/camunda/camunda-modeler-plugins
 * Plugin documentation - https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins/
 */





(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerBpmnJSPlugin)(_bpmn_js_extension__WEBPACK_IMPORTED_MODULE_1__["default"]);

})();

/******/ })()
;
//# sourceMappingURL=client.js.map