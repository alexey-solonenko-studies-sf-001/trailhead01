import { LightningElement, api } from 'lwc';
import { sum } from './sum';

export default class UnitTest extends LightningElement {
    @api
    unitNumber = sum(2,3);

    /**
     * 
     * @param {Event} ev 
     */
    handleChange(ev){
        this.unitNumber = ev.target.value;
    }
}