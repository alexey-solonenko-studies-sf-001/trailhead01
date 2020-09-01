import { LightningElement, api, wire, track } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes'

export default class BoatSearchForm extends LightningElement {

    @api
    selectedBoatTypeId = '';

    // Private
    error = undefined;

    @track
    searchOptions;


    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        if (data) {
            this.searchOptions = data.map(type => {
                return ({
                    label: type.name,
                    value: type.id
                });
            });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    };

    handleSearchOptionChange(ev){
        let searchEvent = new CustomEvent('search');
        searchEvent.detail = {
            boatTypeId: this.selectedBoatTypeId
        };
        this.dispatchEvent(searchEvent);
    }



}