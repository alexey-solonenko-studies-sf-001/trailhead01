import { LightningElement, api } from "lwc";
const TILE_WRAPPER_SELECTED_CLASS = " tile-wrapper selected ";
const TILE_WRAPPER_UNSELECTED_CLASS = " tile-wrapper ";

export default class BoatTile extends LightningElement {
  @api
  boat;

  @api
  selectedBoatId = "";

  get boatName() {
    return this.boat ? this.boat.Name : "";
  }
  get boatOwnerName() {
    return this.boat && this.boat.Contact__r ? this.boat.Contact__r.Name : "";
  }
  get boatPrice() {
    return this.boat ? this.boat.Price__c : "";
  }
  get boatLength() {
    return this.boat ? this.boat.Length__c : "";
  }
  get boatType() {
    return this.boat && this.boat.BoatType__r ? this.boat.BoatType__r.Name : "";
  }
  get boatPicture() {
    return this.boat ? this.boat.Picture__c : "";
  }

  get tileClass() {
    return this.boat && this.selectedBoatId === this.boat.Id
      ? TILE_WRAPPER_SELECTED_CLASS
      : TILE_WRAPPER_UNSELECTED_CLASS;
  }

  get backgroundStyle() {
    return `background-image:url(${this.boat.Picture__c})`;
  }

  selectBoat() {
    this.dispatchEvent(
      new CustomEvent("boatselect", {
        detail: {
          boatId: this.boat.Id
        }
      })
    );
  }
}
