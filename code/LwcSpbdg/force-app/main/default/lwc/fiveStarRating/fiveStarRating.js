import { LightningElement, api } from "lwc";
import fivestar from "@salesforce/resourceUrl/fivestar";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

//import fivestar static resource, call it fivestar

// add constants here
const EDITABLE_CLASS = " c-rating ";
const READ_ONLY_CLASS = " readonly c-rating ";
const ERROR_TITLE = "Error loading five-star";
const ERROR_VARIANT = "error";
export default class FiveStarRating extends LightningElement {
  //initialize public readOnly and value properties
  @api
  readOnly;
  @api
  value = 0;

  editedValue;
  isRendered;

  get starClass() {
    return this.readOnly ? READ_ONLY_CLASS : EDITABLE_CLASS;
  }

  // Render callback to load the script once the component renders.
  renderedCallback() {
    if (this.isRendered) {
      return;
    }
    this.loadScript();
  }

  //Method to load the 3rd party script and initialize the rating.
  //call the initializeRating function after scripts are loaded
  //display a toast with error message if there is an error loading script
  loadScript() {
    Promise.all([
      loadScript(this, fivestar + "/rating.js"),
      loadStyle(this, fivestar + "/rating.css")
      //this.loadScript(this, fivestar + '/stars.svg'),
    ])
      .then(() => {
        this.initializeRating();
        this.isRendered = true;
      })
      .catch((e) => {
        let newErr = new ShowToastEvent({
          title: ERROR_TITLE,
          variant: ERROR_VARIANT,
          message: e.toString()
        });
        this.dispatchEvent(newErr);
      });
  }

  initializeRating() {
    let domEl = this.template.querySelector("ul");
    let maxRating = 5;
    let self = this;
    let callback = function (rating) {
      self.editedValue = rating;
      self.ratingChanged(rating);
    };
    this.ratingObj = window.rating(
      domEl,
      this.value,
      maxRating,
      callback,
      this.readOnly
    );
  }

  // Method to fire event called ratingchange with the following parameter:
  // {detail: { rating: CURRENT_RATING }}); when the user selects a rating
  ratingChanged(rating) {
    this.dispatchEvent(
      new CustomEvent("ratingchange", {
        detail: {
          rating: rating
        }
      })
    );
  }
}
