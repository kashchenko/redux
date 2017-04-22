import { createStore } from './redux';

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

export const store = createStore(counter);