### StyleSetter

#### 1. install  
```
npm install stylesetter
```

#### 2. import    
- _ESM_  
  ``` js
  import StyleSetter from "stylesetter";
  
  StyleSetter();
  // or use 'Vue.use(StyleSetter)' in Vue Project
  ```
  or
  ``` js
  import('stylesetter').then(
      (module) => {
          module.default();
      }
  )
  ```  

- _CJS_  
  ``` js
  const StyleSetter = require("stylesetter");
  
  StyleSetter();
  // or use 'Vue.use(StyleSetter)' in Vue Project
  ```
  or  
  ``` js
  require("stylesetter")();
  ```

- _HTML_  
  ```html
  <script src="./stylesetter/lib/index.js"></script>
  ```

#### 3. usage  
- _Version Mark_  
Explicitly indicate which version is used  
```html
<style-setter v1>...</style-setter>
<style-setter version="2">...</style-setter>
```  

- _V1_  
Style with attributes  
``` html
<parentElementName>
    <style-setter property="width" value="100px"></style-setter>
    <style-setter property="color" value="red"></style-setter>
</parentElementName>
```  

- _V2_  
Style with subTags and prefix("ss-")  
``` html
// All labels can be written in single label form.
<parentElementName>
    <ss-{propertyName} value="{propertyValue}"/>  // works in all case
    <ss-{propertyName} ss-{propertyValue}/>  // works in some case(without blank in property`s value)
</parentElementName>

// There are three way to use StyleSetter v2.
<parentElementName>
    <ss-{propertyName} value="{propertyValue}"></ss-{propertyName}>  // works in all case(recommend)
    <ss-{propertyName}>{propertyValue}<ss-{propertyName}>  // works in all case(recommend)
    <ss-{propertyName} ss-{propertyValue}><ss-{propertyName}>  // works in some case(without blank in property`s value)
</parentElementName>

<parentElementName>
    <style-setter>
        // 1. normal use
        <ss-color value="red"></ss-color>
        <ss-color>red</ss-color>
        <ss-color ss-red></ss-color>
        
        // 2. with hyphen in attribute`s key
        <ss-border-radius value="2px"></ss-border-radius>
        <ss-border-radius>2px</ss-border-radius>
        <ss-border-radius ss-2px></ss-border-radius>
        
        // 3. with hyphen in attribute`s value
        <ss-display value="inline-block"></ss-display>
        <ss-display>inline-block</ss-display>
        <ss-display ss-inline-block></ss-display>
        
        // 4. with blank in attribute`s value
        <ss-border value="solid 1px red"></ss-border>
        <ss-border>solid 1px red</ss-border>
        <ss-border ss-solid 1px red"></ss-border> // × not allowed
    </style-setter>
</parentElementName>
```  

#### 4. test  
``` bash
git clone https://github.com/lopo12123/stylesetter.git

cd stylesetter && npm run test
```  

