/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(l => l());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    dispatch({});

    return { getState, dispatch, subscribe };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux__ = __webpack_require__(0);


const counter = (state = {}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, {
                counter: state.counter + 1
            });
        case 'DECREMENT':
            return Object.assign({}, state, {
                counter: state.counter - 1
            });;
        case 'TOGGLE':
            return Object.assign({}, state, {
                toggle: !state.toggle
            });
        default:
            return state;
    }
}

const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__redux__["a" /* createStore */])(counter);

document.body.innerHTML = `
    <h3>State:</h3>
    <div></div>
    <button onclick="store.dispatch('INCREMENT')">+</button>
    <button onclick="store.dispatch('DECREMENT')">-</button>
    <button onclick="store.dispatch('TOGGLE')">~</button>
`;

const stateDOM = document.getElementsByTagName('div');
const counterDOM = document.createElement('span');
const toggleDOM = document.createElement('span');
stateDOM.appendChild(counterDOM);
stateDOM.appendChild(toggleDOM);

document.body.insertBefore(stateDOM, document.getElementsByTagName('button'));

const render = () => {
    let currentState = store.getState();

    counterDOM.innerText = `Count: ${ currentState.counter }`;
    toggleDOM.innerText = `Toggle: ${ currentState.toggle ? 'on' : 'off' }`;
};

store.subscribe(render);

render();

/***/ })
/******/ ]);