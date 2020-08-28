import { createElement } from 'lwc';
import UnitTest from '../unitTest';

/* Test suite 1 */
describe('c-unit-test', () => {
    afterEach(() => {
        /* Instance of jsdom is shared across test cases in a single file */
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('unit number is 5', () => {
        /* Create an element with its shadow root - i.e. our component */
        /* TODO to test if can pass a different - name - test name - yes, can be any  */
        const element = createElement('c-unit-test', {
            is: UnitTest
        });
        //console.log(element);
        document.body.appendChild(element);
        expect(element.unitNumber).toBe(5);
        /* Move to next check, but withing the same test case */
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Unit 5 alive!');
    });

    test('displays unit status with updated unitNumber',() => {
        const element = createElement('c-unit-test', {
            is: UnitTest
        });
        document.body.appendChild(element);
        // Update unitNumber after element is appended
        element.unitNumber = 6
        const div = element.shadowRoot.querySelector('div');
        /* will fail, as not async */
        //expect(div.textContent).toBe('Unit 6 alive!');
        /* so we need to expect it to be Not */
        expect(div.textContent).not.toBe('Unit 6 alive!');
        /* If applying an async technique, then we are expecting it to wait for DOM to update asynchronously */
        return Promise.resolve().then( () => {
            expect(div.textContent).toBe('Unit 6 alive!');
        });
        
    });

    test('display unit status with updated unitNumber but using async', async () => {
        const element = createElement('c-unit-test',{
            is: UnitTest
        });
        document.body.appendChild(element);
        element.unitNumber= 7;
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).not.toBe('Unit 7 alive!');
        await Promise.resolve();
        expect(div.textContent).toBe('Unit 7 alive!');
    });

    test('displays unit status with input change event', async () => {
        const element = createElement('c-unit-test',{
            is: UnitTest,
        });
        document.body.appendChild(element);
        const div = element.shadowRoot.querySelector('div');
        const inputElement = element.shadowRoot.querySelector('lightning-input');
        inputElement.value = 7;
        inputElement.dispatchEvent(new CustomEvent('change'));
        await Promise.resolve();
        expect(div.textContent).toBe('Unit 7 alive!');
    });
});

