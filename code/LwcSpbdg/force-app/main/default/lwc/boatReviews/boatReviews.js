import { LightningElement, api } from "lwc";
import getAllReviews from "@salesforce/apex/BoatDataService.getAllReviews";
import { NavigationMixin } from "lightning/navigation";

export default class BoatReviews extends NavigationMixin(LightningElement) {
  // Private
  boatId;
  error;
  boatReviews;
  isLoading;

  // Getter and Setter to allow for logic to run on recordId change
  @api
  get recordId() {
    console.log("boat reviews is accessing its boat id: " + this.boatId);
    return this.boatId;
  }
  set recordId(value) {
    this.setAttribute("boatId", value);
    this.boatId = value;
    console.log("boat reviews setting boatId: " + this.boatId);
    this.getReviews();
    //get reviews associated with boatId
  }

  // Getter to determine if there are reviews to display
  get reviewsToShow() {
    return (
      this.boatReviews !== null &&
      this.boatReviews !== undefined &&
      this.boatReviews.length &&
      this.boatReviews.length > 0
    );
  }

  // Public method to force a refresh of the reviews invoking getReviews
  @api
  refresh() {
    this.getReviews();
  }

  // Gets all the boatReviews from the result, checking for errors.
  getReviews() {
    if (!this.boatId) {
      return;
    }
    console.log("starting loading");
    this.isLoading = true;
    getAllReviews({ boatId: this.recordId })
      .then((result) => {
        console.log("received all reviews for a requested boat id");
        this.boatReviews = result;
        console.log(result);
      })
      .then(() => {})
      .catch((error) => {
        this.error = error;
        console.log("data retrieving error", error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  // Helper method to use NavigationMixin to navigate to a given record on click
  navigateToRecord(event) {
    console.log("calilng navigate to record");
    console.log(event.target);
    console.log(event.target.getAttribute("data-record-id"));
    try {
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          objectApiName: "User",
          actionName: "view",
          recordId: event.target.getAttribute("data-record-id")
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
