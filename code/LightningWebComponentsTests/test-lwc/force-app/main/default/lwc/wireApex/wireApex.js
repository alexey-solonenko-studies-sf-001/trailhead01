import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class WireApex extends LightningElement {
    accounts;
    error;

    @wire(getAccountList)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            //console.log('error assignment completed');
            this.accounts = undefined;
        }
    }
}