/*////////// code //////////*/
/**
 * @description v1 solution
 * @example
 * <parentElementName>
 *     <style-setter property="color" value="red"></style-setter>
 * </parentElementName>
 * @param {HTMLElement} _this
 * @return {boolean}
 */
const v1Solution = (_this) => {
    /**
     * Ignore [innerHtml] if any(in v1).
     */
    this.innerHTML = ''

    /**
     * make sure [property] and [value] exist.
     * Any other attributes will be ignored.
     */
    if(
        !Reflect.ownKeys(_this.attributes).includes('property') ||
        !Reflect.ownKeys(_this.attributes).includes('value')
    ) {
        console.warn('[StyleSetter:v1] Missing required attribute "property" or "value"!')
        return false
    }

    /**
     * bind style to parentElement.
     * In all cases it will not report any [error]s or [warning]s, not to mention [success].
     */
    try {
        _this.parentElement.style[
            Reflect.get(_this.attributes, 'property').value
        ] = Reflect.get(_this.attributes, 'value').value
        return true
    } catch (e) {
        console.error('[StyleSetter:v1]', e)
        return false
    }
}

/*////////// exports //////////*/
module.exports = v1Solution