import { store } from './counter.state';
import { component } from './component';

// <span>{subscribe('test')}</span> - subscribe to state field
// <input value="{subscribe('test')}" onkeydown="{dispatch('action', this.value)}">
// <button click="{dispatch('action')}">
// <button click="{ctrl.method()}"> 

component({
    selector: 'counter',
    template: `
        <span>{test}</span>
    `,
    store: store,
    controller: {
        test: 'test string'
    }
})

store.dispatch();