;(() => {
    if(!!require) {
        require('../lib/index')()
    }
    else {
        console.error('[StyleSetter] require is not support here!')
    }
})()