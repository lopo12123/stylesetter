const styleSetterRegister = function() {
    /**
     * Check if current browser support web component.
     */
    if(!customElements) {
        console.warn('[StyleSetter] Sorry, but your browser does not support web component!')
        return
    }

    class StyleSetter extends HTMLElement {
        constructor() {
            super();

            /**
             * Ignore [innerHtml] if any.
             */
            this.innerHTML = ''
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

            /**
             * make sure [property] and [value] exist.
             * Any other attributes will be ignored.
             */
            if(
                !Reflect.ownKeys(this.attributes).includes('property') ||
                !Reflect.ownKeys(this.attributes).includes('value')
            ) {
                console.warn('[StyleSetter] Missing required attribute "property" or "value"!')
                return
            }

            /**
             * bind style to parentElement.
             * In all cases it will not report any [error]s or [warning]s, not to mention [success].
             */
            try {
                this.parentElement.style[
                    Reflect.get(this.attributes, 'property').value
                ] = Reflect.get(this.attributes, 'value').value
            } catch (e) {
                console.error('[StyleSetter]', e)
            }
        }
    }

    if(!customElements.get('style-setter')) {
        customElements.define('style-setter', StyleSetter)
    }
}

/**
 * export an install method for Vue.use
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
 * @description Export in different ways
 *              in node environment and browser environment
 */
if(
    typeof module !== "undefined"
    && typeof module.exports !== "undefined"
) {
    /** in node */
    module.exports = install
}
else {
    /** in browser */
    install()
}