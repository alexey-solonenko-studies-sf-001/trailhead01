import { createElement } from 'lwc';
import WireCPR from 'c/wireCPR';
import { CurrentPageReference } from 'lightning/navigation';
import { registerTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const mockCurrentPageReference = require('./data/CurrentPageReference.json');

const currPageRefAdapter = registerTestWireAdapter(CurrentPageReference);

describe('c-wire-c-p-r', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('renders the current page reference in <pre> tag', () => {
        const element = createElement('c-wire-c-p-r', {
            is: WireCPR,
        });
        document.body.appendChild(element);

        currPageRefAdapter.emit(mockCurrentPageReference);
        const pre = element.shadowRoot.querySelector('pre');
        expect(pre).not.toBe(null);


        return Promise.resolve().then(() => {
            expect(pre.textContent).toBe(JSON.stringify(mockCurrentPageReference, null, 2));
        });
    });
});