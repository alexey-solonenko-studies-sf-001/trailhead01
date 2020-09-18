

const debounce = (func, delay) => {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};

const throttle = (func, limit) => {
    let lastRan;
    let lastFunc;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            lastRan = Date.now();
            func.apply(context, ...args);
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
};






const throttle2 = (func,limit) => {
    let lastFunc;
    let lastRan;
    return function(){
        const context = this;
        const args = arguments;
        if(!lastRan){
            func.apply(context,args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            setTimeout(function(){
                if( (Date.now() - lastRan) >= limit){
                    func.apply(context,args);
                    lastRan = Date.now();
                }
            },limit - (Date.now() - lastRan));
        }
    }
};