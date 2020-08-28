import { createElement } from 'lwc';
import WireApex from 'c/wireApex';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

const getAccountListAdapter = registerApexTestWireAdapter(getAccountList);
const mockGetAccountList = require('./data/getAccountList.json');
const mockGetAccountListNoRecords = require('./data/getAccountListNoRecords.json');

describe('c-wire-apex', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    describe('getAccountList @wire data', () => {
        test('renders 6 records ', async () => {
            const element = createElement('c-wire-apex', {
                is: WireApex,
            });
            document.body.appendChild(element);
            getAccountListAdapter.emit(mockGetAccountList);
            await Promise.resolve();
            const accountElements = element.shadowRoot.querySelectorAll('p');
            expect(accountElements.length).toBe(mockGetAccountList.length);
            expect(accountElements[0].textContent).toBe(mockGetAccountList[0].Name);
        });

        it('renders no items when no records are returned', async () => {
            const element = createElement('c-wire-apex', {
                is: WireApex,
            });
            document.body.appendChild(element);
            getAccountListAdapter.emit(mockGetAccountListNoRecords);
            await Promise.resolve();
            console.log(element.shadowRoot.querySelector('span'));
            const accountElements = element.shadowRoot.querySelectorAll('p');
            expect(accountElements.length).toBe(mockGetAccountListNoRecords.length);
        });
    });

    describe('getAccountList @wire error',() => {
        test('shows error panel element', async () => {
            const element = createElement('c-wire-apex', {
                is: WireApex, 
            });
            /* Often encountered error! Forgot to append ! */
            document.body.appendChild(element);
            // emit error from @wire 
            getAccountListAdapter.error();
            await Promise.resolve();
            const errorElement = element.shadowRoot.querySelector('p');
            // ! IMPORTANT no.toBe(null) annd not.toBeNull are different
            expect(errorElement).not.toBeNull;
            expect(errorElement.textContent).toBe('No account found.');
        });
    });
});