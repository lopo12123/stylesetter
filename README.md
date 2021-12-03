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
``` html
<template>
    <div id="root">
        <p>
            you will see a gray rect with pink text in it
            <style-setter property="color" value="pink"></style-setter>
        </p>
        <style-setter property="width" value="400px"></style-setter>
        <style-setter property="height" value="300px"></style-setter>
        <style-setter property="background" value="gray"></style-setter>
    </div>
</template>
```  

#### 4. test  
``` bash
git clone https://github.com/lopo12123/stylesetter.git

cd stylesetter && npm run test
```  

