import { createElement } from 'lwc';
import WireLDS from 'c/wireLDS';
import { getRecord } from 'lightning/uiRecordApi';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const mockGetRecord = require('./data/getRecordMock.json');

const getRecordAdapter = registerLdsTestWireAdapter(getRecord);


describe('c-wire-l-d-s',() => {
    afterEach(() => {
        while(document.body.firstChild){
            document.body.removeChild(document.body.firstChild);
        }
    });
    test('component should render data received in record', async () => {
        const element = createElement('c-wire-l-d-s',{
            is:WireLDS
        });
        document.body.appendChild(element);
        getRecordAdapter.emit(mockGetRecord);
        await Promise.resolve();
        
         // Select elements for validation
         const nameElement = element.shadowRoot.querySelector('p.accountName');
         expect(nameElement.textContent).toBe(
           'Account Name: ' + mockGetRecord.fields.Name.value
         );
   
         const industryElement = element.shadowRoot.querySelector('p.accountIndustry');
         expect(industryElement.textContent).toBe(
           'Industry: ' + mockGetRecord.fields.Industry.value
         );
   
         const phoneElement = element.shadowRoot.querySelector('p.accountPhone');
         expect(phoneElement.textContent).toBe(
           'Phone: ' + mockGetRecord.fields.Phone.value
         );
   
         const ownerElement = element.shadowRoot.querySelector('p.accountOwner');
         expect(ownerElement.textContent).toBe(
           'Owner: ' + mockGetRecord.fields.Owner.displayValue
         );
    });
});

describe('Record @wire error', () => {
    test('error to be rendered',async () => {
        const element = createElement('c-wire-l-d-s',{
            is:WireLDS,
        });
        document.body.appendChild(element);
        // !!! CAUSES AND ERORR! 
        getRecordAdapter.error();
        
        await Promise.resolve();
        const errorElement = element.shadowRoot.querySelector('p');
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent).toBe('No account found.');
    });
});