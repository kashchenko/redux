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
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__counter_state__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(3);



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__component__["a" /* component */])({
    selector: 'counter',
    template: `
        <div>
            <b>
                <label>Name:</label> 
                <span subscribe="textContent=name.name; style=readName"></span>
                <input subscribe="value=name.name; style=editName">
            </b>
            <button subscribe="style=readName" dispatch="EDITNAME">Edit</button>
            <button subscribe="style=editName" dispatch="CONFIRMNAME">Confirm</button>
            <button subscribe="style=editName" dispatch="CANCELNAME">Cancel</button>
        </div>
        <div>
            <label>Count: </label>
            <span subscribe="textContent=counter"></span>
        </div>
        <div>
            <label>Toggle state: </label>
            <span subscribe="textContent=stateToggle"></span>
        </div>
        <p/>
        <div>
            <button dispatch="ADD">+</button>
            <button dispatch="SUBSTRACT">-</button>
            <button dispatch="TOGGLE">~</button>
        </div>
    `,
    store: __WEBPACK_IMPORTED_MODULE_0__counter_state__["a" /* store */],
    controller: {
        
        stateToggle: (state) => {
            return state.toggle ? 'ON' : 'OFF';
        },

        editName: (state) => {
            return state.name.isEditMode ? 'display: inline' : 'display: none';
        },

        readName: (state) => {
            return !state.name.isEditMode ? 'display: inline' : 'display: none';
        }
    }
})

__WEBPACK_IMPORTED_MODULE_0__counter_state__["a" /* store */].dispatch();

/***/ }),
/* 2 */
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

    return { getState, dispatch, subscribe };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

Element.prototype.listAttributed = function (attributeName, handler) {
    const elements = this.querySelectorAll(`[${attributeName}]`);
    Array.prototype.forEach.call(elements, (element) => {
        
        const attributeValue = element.getAttribute(attributeName);
        handler(element, attributeValue);
    });
};

Object.prototype.val = function(key){

    if(key.includes('.')){
        return key.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, this);
    } else{
        return this[key];
    }
};

const subscribe = (subscriber, expression) => {

    const subscribeExpressions = expression
        .split(';')
        .map(s => s.trim())
        .map(s => {
            const pair = s.split('=').map( ss => ss.trim());
            return { property: pair[0], expression: pair[1] };
        });        

    return (store, controller) => {
        store.subscribe(() => {
            const state = store.getState();

            subscribeExpressions.forEach(se => {
                const getter = controller[se.expression];

                subscriber[se.property] = getter && typeof getter == 'function'
                    ? getter(state) + ''
                    : state.val(se.expression) + '' 
            });
        });
    };
};

const component = (config) => {

    const rootDOM = document.getElementsByTagName(config.selector).item(0);
    if(rootDOM){
        rootDOM.innerHTML = config.template;

        rootDOM.listAttributed('subscribe', (subscriber, expression) => {

            subscribe(subscriber, expression)(config.store, config.controller);
        });

        rootDOM.listAttributed('dispatch', (dispatcher, action) => {

            dispatcher.addEventListener('click', () => {

                const controller = config.controller[action];
                if(controller && typeof(controller) == 'function'){
                    controller();    
                } else{
                    config.store.dispatch({type: action});
                }
            });
        });
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = component;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__redux__ = __webpack_require__(2);


const defaultState = {
    counter: 0, 
    toggle: false, 
    name: {
        name: '',
        isEditMode: false
    }
};

const counter = (state = defaultState, action = {type: 'NOACTION'}) => {
    switch (action.type) {
        case 'ADD':
            return Object.assign({}, state, {
                counter: state.counter + 1
            });
        case 'SUBSTRACT':
            return Object.assign({}, state, {
                counter: state.counter - 1
            });;
        case 'TOGGLE':
            return Object.assign({}, state, {
                toggle: !state.toggle
            });
        
        case 'EDITNAME':
            return Object.assign({}, state, {
                name: Object.assign({}, state.name, {
                    isEditMode: true
                })
            });
        case 'CONFIRMNAME':
            return Object.assign({}, state, {
                name: {
                    name: action.name,
                    isEditMode: false
                }
            });
        case 'CANCELNAME':
            return Object.assign({}, state, {
                name: Object.assign({}, state.name, {
                    isEditMode: false
                })
            });

        default:
            if(action.type != 'NOACTION'){
                console.warn('Action "' + action.type + '" not found');
            }

            return state;
    }
}

const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__redux__["a" /* createStore */])(counter);
/* harmony export (immutable) */ __webpack_exports__["a"] = store;


/***/ })
/******/ ]);