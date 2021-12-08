const v1Solution = require('./v1');
const v2Solution = require('./v2');

/**
 * Register custom elements and
 * parse it into HTML standard elements
 */
const styleSetterRegister = function() {
    /**
     * Check if current browser support web component.
     */
    if(!customElements) {
        console.warn('[StyleSetter] Sorry, but your browser does not support web component!')
        return
    }

    /** Custom Element */
    class StyleSetter extends HTMLElement {
        constructor() {
            super();

            /** hide [innerHtml] if any. */
            this.style.display = 'none'

            /** 👆 Consider using [set attrs] instead of [set css], which has higher weight in css parser. */
            /** this['style'] = 'display: none' */
        }

        /**
         * You can find [this.parentElement] only when the element has been attached to the dom
         */
        connectedCallback() {
            /**
             * Make sure [parentElement] exist.
             */
            if(!this.parentElement) {
                console.warn('[StyleSetter] "style-setter" can only be used as a direct child element of an element node!')
                return
            }

            // try to find some mark which can tell the version it use
            const attrs = this.getAttributeNames()
            const version = (() => {
                for(let i = 0; i < attrs.length; i ++) {
                    if(attrs[i] === 'version') return 'v'+this.getAttribute('version')
                    else if(/^[v][1-9][0-9]*$/.test(attrs[i])) {
                        return attrs[i]
                    }
                }
                return null
            })()

            // call solution with specific version(or by default. try all version)
            switch(version) {
                case 'v1':
                    v1Solution(this)
                    break
                case 'v2':
                    v2Solution(this)
                    break
                default:  // version === null
                    v1Solution(this)
                    v2Solution(this)
                    break
            }
        }
    }

    if(!customElements.get('style-setter')) {
        customElements.define('style-setter', StyleSetter)
    }
}

/**
 * export an install method for Vue.use
 * @example
 * <parentElementName>
 *     <style-setter v1>...</style-setter>  // Mark the element with v{n} to tell it which solution to use to parse this element,
 *     <style-setter version="2">...</style-setter>  // you can also mark it by add an attribute named 'version'.
 *     <style-setter>...</style-setter>  // And by default it will try to solve the element from version 1 to latest version.
 * </parentElementName>
 */
const install = () => {
    try {
        styleSetterRegister()
        console.log('[StyleSetter] StyleSetter Registered succeed!')
    } catch (e) {
        console.warn('[StyleSetter] StyleSetter Registered failed!')
    }
}

/**
 * Export in different ways in
 * node environment and browser environment.
 *
 * Here I simply use the value of "require"
 * to determine whether it is in the browser
 * or node environment.
 *
 * When it does not work or an error occurs,
 * you can try to manually call the function "install".
 */
if(typeof require === "undefined") {
    /** in browser */
    console.log('[StyleSetter] current in browser environment!')
    install()
}
else {
    /** in node */
    module.exports = install
    console.log('[StyleSetter] current in node environment!')
}
