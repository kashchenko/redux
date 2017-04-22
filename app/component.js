
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

export const component = (config) => {

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