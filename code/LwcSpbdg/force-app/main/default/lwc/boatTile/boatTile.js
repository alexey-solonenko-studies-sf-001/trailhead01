import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import BOAT_OWNER_NAME_FIELD from '@salesforce/schema/Boat__c.Contact__c.Name';
import BOAT_LENGTH_FIELD from '@salesforce/schema/Boat__c.Length__c';
import BOAT_TYPE_FIELD from '@salesforce/schema/Boat__c.BoatType__c';
import BOAT_PRICE_FIELD from '@salesforce/schema/Boat__c.Price__c';
import BOAT_PICTURE_FIELD from '@salesforce/schema/Boat__c.Picture__c';


export default class BoatTile extends LightningElement {

    boatId;

    boatFields = [
        BOAT_NAME_FIELD,
        BOAT_OWNER_NAME_FIELD,
        BOAT_LENGTH_FIELD,
        BOAT_TYPE_FIELD,
        BOAT_PRICE_FIELD,
        BOAT_PICTURE_FIELD
    ];
    get boatName(){
        return getFieldValue(this.boat.data,BOAT_NAME_FIELD);
    };
    get boatOwnerName(){
        return getFieldValue(this.boat.data,BOAT_OWNER_NAME_FIELD);
    };
    get boatPrice(){
        return getFieldValue(this.boat.data,BOAT_PRICE_FIELD);
    };
    get boatLength(){
        return getFieldValue(this.boat.data,BOAT_LENGTH_FIELD);
    };
    get boatType(){
        return getFieldValue(this.boat.data,BOAT_TYPE_FIELD);
    };
    get boatPicture(){
        return getFieldValue(this.boat.data,BOAT_PICTURE_FIELD);
    };


    selectedBoatId;

    @wire(getRecord, { recordId: '$selectedBoatId', field: this.boatFields })
    boat;

    static TILE_WRAPPER_SELECTED_CLASS = ' tile-wrapper selected ';
    static TILE_WRAPPER_UNSELECTED_CLASS = ' tile-wrapper ';

    tileClass() {
        let wrapper = this.template.querySelector('.tile-wrapper');
        if (this.selectedBoad) {
            wrapper.className = BoatTile.TILE_WRAPPER_SELECTED_CLASS;
        } else {
            wrapper.className = BoatTile.TILE_WRAPPER_UNSELECTED_CLASS;
        }
    }

    backgroundStyle(){
        return (`background-image:url(${this.boatPicture})`);
    }

    selectBoat() {

    }
}