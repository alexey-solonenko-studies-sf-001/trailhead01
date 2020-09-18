
function thisScopeTester() {
    let testScope = new (function () {
        
        this.thisIs = 'thisScopeTester';
        this.self = this;
        this.self.thisIs = 'thisScopeTester';
        //console.log('test scope of this this: ', JSON.stringify(this));
        console.log('test scope of this this: ', this);
        console.log('globalThis: ',globalThis);
        class C1 {
            constructor(){
                /* does not work */
                //this.classStandardWithThis.bind(this);
            }
            thisIs = 'classC1';
            self = this;
            classStandardWithThis() {
                try {
                    console.log('class Standard with This: \t\t' + this.thisIs);
                }
                catch (e) {
                    console.log('class Standard with This error: ' + e.toString());
                }
            }
            classStandardWithSelf() {
                try {
                    console.log('class Standard with Self : \t\t' + this.self.thisIs);
                } catch (e) {
                    console.log('class Standard with Self error: ' + e.toString());
                }

            }
            classFunctionWithThis = function () {
                try {
                    console.log('class Function with This: \t\t' + this.thisIs);
                } catch (e) {
                    console.log('class Function with This error: ' + e.toString());
                }

            }
            classFunctionWithSelf = function () {
                try {
                    console.log('class Function With Self: \t\t' + this.self.thisIs);
                } catch (e) {
                    console.log('class Function with Self error: ' + e.toString());
                }

            }
            classArrowWithThis = () => {
                try {
                    console.log('class Arrow With This: \t\t\t' + this.thisIs);
                } catch (e) {
                    console.log('class Arrow  with This error: ' + e.toString());
                }

            }
            classArrowWithSelf = () => {
                try {
                    console.log('class Arrow With Self: \t\t\t' + this.self.thisIs);
                } catch (e) {
                    console.log('class Arrow with Self error: ' + e.toString());
                }

            }
        }
        let c1Instance = new C1();
        console.log('calling class Methods on class Instance');
        c1Instance.classStandardWithThis();
        c1Instance.classStandardWithSelf();
        c1Instance.classFunctionWithThis();
        c1Instance.classFunctionWithSelf();
        c1Instance.classArrowWithThis();
        c1Instance.classArrowWithSelf();
        console.log('calling class Methods after re-asigning to a parent scope variable');

        let cswt = c1Instance.classStandardWithThis;
        let csws = c1Instance.classStandardWithSelf;
        let cfwt = c1Instance.classFunctionWithThis;
        let cfws = c1Instance.classFunctionWithSelf;
        let cawt = c1Instance.classArrowWithThis;
        let caws = c1Instance.classArrowWithSelf;
        cswt();
        csws();
        cfwt();
        cfws();
        cawt();
        caws();

        /* Testing this scope for an object */


        let o1 = {
            thisIs: 'object1',
            self: this,
            objectStandardWithThis() {
                try {
                    console.log('object Standard with This: \t\t' + this.thisIs);
                }
                catch (e) {
                    console.log('object Standard with This error: ' + e.toString());
                }
            },
            objectStandardWithSelf() {
                try {
                    console.log('object Standard with Self : \t\t' + this.self.thisIs);
                } catch (e) {
                    console.log('object Standard with Self error: ' + e.toString());
                }

            },
            objectFunctionWithThis: function () {
                try {
                    console.log('object Function with This: \t\t' + this.thisIs);
                } catch (e) {
                    console.log('object Function with This error: ' + e.toString());
                }

            },
            objectFunctionWithSelf: function () {
                try {
                    console.log('object Function With Self: \t\t' + this.self.thisIs);
                } catch (e) {
                    console.log('object Function with Self error: ' + e.toString());
                }

            },
            objectArrowWithThis: () => {
                try {
                    console.log('object Arrow With This: \t\t\t' + this.thisIs);
                } catch (e) {
                    console.log('object Arrow  with This error: ' + e.toString());
                }

            },
            objectArrowWithSelf: () => {
                try {
                    console.log('object Arrow With Self: \t\t\t' + this.self.thisIs);
                } catch (e) {
                    console.log('object Arrow with Self error: ' + e.toString());
                }

            },
        };

        console.log('calling object Methods on object Instance');
        o1.objectStandardWithThis();
        o1.objectStandardWithSelf();
        o1.objectFunctionWithThis();
        o1.objectFunctionWithSelf();
        o1.objectArrowWithThis();
        o1.objectArrowWithSelf();
        console.log('calling object Methods after re-asigning to a parent scope variable');

        let oswt = o1.objectStandardWithThis;
        let osws = o1.objectStandardWithSelf;
        let ofwt = o1.objectFunctionWithThis;
        let ofws = o1.objectFunctionWithSelf;
        let oawt = o1.objectArrowWithThis;
        let oaws = o1.objectArrowWithSelf;
        oswt();
        osws();
        ofwt();
        ofws();
        oawt();
        oaws();

        let topScopeFunctionWithThis =function () {
            console.log(this);
            try {
                console.log('top scope Function with This: \t\t' + this.thisIs);
            } catch (e) {
                console.log('top scope Function with This error: ' + e.toString());
            }

        };
        topScopeFunctionWithThis();





    });




}

export { thisScopeTester };