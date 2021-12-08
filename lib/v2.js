/*////////// code //////////*/
const {XMLParser} = require('fast-xml-parser');
const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '_',
    attributesGroupName: '_'
});

/**
 * @description return the origin property which is scoped by 'ss-'
 * @param {string} scopedName
 * @return {string|null}
 */
const parsePropertyName = (scopedName) => {
    /** invalid attrs or values */
    if(scopedName.slice(0, 3) !== 'ss-') {
        console.warn('[StyleSetter:v2] Invalid attrs or values')
        return null
    }
    else return scopedName.slice(3)
}

/**
 * @description return the value of property which is written in verity type
 * @param {string|{_:{[k: string]: string}}}valueInXml
 * @return {string|null} `string`: real value; `null`: invalid attrs or values
 */
const parsePropertyValue = (valueInXml) => {
    /** <ss-{propertyName}>{propertyValue}</ss-{propertyName}> */
    if(typeof valueInXml === 'string') return valueInXml
    else if(typeof valueInXml === 'object') {
        /** invalid attrs or values */
        if(!valueInXml._) {
            console.warn('[StyleSetter:v2] invalid attrs or values')
            return null
        }

        /** <ss-{propertyName} value="{propertyValue}"></ss-{propertyName}> */
        if(!!valueInXml._._value) {
            return valueInXml._._value
        }

        /** <ss-{propertyName} ss-{propertyValue}></ss-{propertyName}> */
        else {
            const scopedValue = Reflect.ownKeys(valueInXml._)[0]

            /** invalid attrs or values */
            if(!scopedValue || scopedValue.slice(0, 4) !== '_ss-') {
                console.warn('[StyleSetter:v2] invalid attrs or values')
                return null
            }
            else return scopedValue.slice(4)
        }
    }
}

/**
 * @description v2 solution
 * @example
 * // All labels can be written in single label form.
 * <parentElementName>
 *     <ss-{propertyName} value="{propertyValue}"/>  // works in all case
 *     <ss-{propertyName} ss-{propertyValue}/>  // works in some case(without blank in property`s value)
 * </parentElementName>

 * @example
 * // There are three way to use StyleSetter v2.
 * <parentElementName>
 *     <ss-{propertyName} value="{propertyValue}"></ss-{propertyName}>  // works in all case(recommend)
 *     <ss-{propertyName}>{propertyValue}<ss-{propertyName}>  // works in all case(recommend)
 *     <ss-{propertyName} ss-{propertyValue}><ss-{propertyName}>  // works in some case(without blank in property`s value)
 * </parentElementName>

 * @example
 * <parentElementName>
 *     <style-setter>
 *         // normal use
 *         <ss-color value="red"></ss-color>
 *         <ss-color>red</ss-color>
 *         <ss-color ss-red></ss-color>
 *
 *         // with hyphen in attribute`s key
 *         <ss-border-radius value="2px"></ss-border-radius>
 *         <ss-border-radius>2px</ss-border-radius>
 *         <ss-border-radius ss-2px></ss-border-radius>
 *
 *         // with hyphen in attribute`s value
 *         <ss-display value="inline-block"></ss-display>
 *         <ss-display>inline-block</ss-display>
 *         <ss-display ss-inline-block></ss-display>
 *
 *         // with blank in attribute`s value
 *         <ss-border value="solid 1px red"></ss-border>
 *         <ss-border>solid 1px red</ss-border>
 *         <ss-border ss-solid 1px red"></ss-border> // × not allowed
 *     </style-setter>
 * </parentElementName>
 * @param {HTMLElement} _this
 * @return {boolean}
 */
const v2Solution = (_this) => {
    const innerStr = _this.innerHTML
    const objFromSetter = parser.parse(innerStr)
    const keys = Reflect.ownKeys(objFromSetter)

    for(let i = 0; i < keys.length; i ++) {
        if(!!parsePropertyName(keys[i])) {
            const realValue = parsePropertyValue(objFromSetter[keys[i]])
            if(!!realValue) {
                _this.parentElement.style[parsePropertyName(keys[i])] = realValue
            }
        }
    }
}

/*////////// exports //////////*/
module.exports = v2Solution