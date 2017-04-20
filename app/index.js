import { createStore } from './redux';

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

const store = createStore(counter);

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