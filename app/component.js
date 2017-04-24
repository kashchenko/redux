
const scanExpressionContents = () => {
    const content = this.innerHTML;
    let expressions = [];

    if(content.startsWith('{') && content.endsWith('}')){
        expressions.push({
            element: this,
            expression: content.slice(1, -1)
        });
    }

    [].forEach.call(this.children, (c) => {
        expressions = [...c.scanExpressions(), ...expressions];
    });
};

const scanExpressionAttributes = () => {

}

Element.prototype.scanExpressions = function(){

    const content = this.innerHTML;

    if(content.startsWith('{') && content.endsWith('}')){
        expressions.push({
            element: this,
            expression: content.slice(1, -1)
        });
    }

    [].forEach.call(this.children, (c) => {
        c.scanExpressions();
    });
}

export const component = (config) => {

    const rootDOM = document.getElementsByTagName(config.selector).item(0);
    if(rootDOM){
        rootDOM.innerHTML = config.template;


    }
};