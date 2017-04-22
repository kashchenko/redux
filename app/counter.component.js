import { store } from './counter.state';
import { component } from './component';

component({
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
    store: store,
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

store.dispatch();