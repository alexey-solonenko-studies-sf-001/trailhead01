import { LightningElement, wire, track } from "lwc";
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";

export default class BoatSearchForm extends LightningElement {
  selectedBoatTypeId = "";
  error = undefined;

  @track
  searchOptions;

  @wire(getBoatTypes)
  boatTypes({ error, data }) {
    if (data) {
      this.searchOptions = data.map((type) => {
        return {
          label: type.Name,
          value: type.Id
        };
      });
      this.searchOptions = [{ label: "All Types", value: "" }].concat(
        this.searchOptions
      );
    } else if (error) {
      this.searchOptions = undefined;
      this.error = error;
    }
  }

  handleSearchOptionChange(evt) {
    try {
      let searchEvent = new CustomEvent("search", {
        detail: {
          boatTypeId: evt.target.value
        }
      });
      this.selectedBoatTypeId = evt.target.value;
      this.dispatchEvent(searchEvent);
    } catch (e) {
      console.log("handle search option error, event.target was ");
      console.log(evt.target);
      console.log(this.selectedBoatTypeId);
    }
  }
}
