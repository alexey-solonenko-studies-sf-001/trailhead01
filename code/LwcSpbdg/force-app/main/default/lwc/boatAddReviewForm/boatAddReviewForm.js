import { LightningElement, api } from "lwc";

import NAME_FIELD from "@salesforce/schema/BoatReview__c.Name";
import COMMENT_FIELD from "@salesforce/schema/BoatReview__c.Comment__c";
//import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import BOAT_REVIEW_OBJECT from "@salesforce/schema/BoatReview__c";

const ERROR_TITLE = "Error";
const ERROR_VARIANT = "error";
const SUCCESS_TITLE = "Review Created!";
const SUCCESS_MESSAGE = "Review Created!";
const SUCCESS_VARIANT = "success";

export default class BoatAddReviewForm extends LightningElement {
  // Private
  boatId;
  rating = 0;
  boatReviewObject = BOAT_REVIEW_OBJECT;
  nameField = NAME_FIELD;
  commentField = COMMENT_FIELD;
  labelSubject = "Review Subject";
  labelRating = "Rating";

  // I need to re-read reactivity and to memorize it ! Public Getter and Setter to allow for logic to run on recordId change
  get recordId() {
    return this.boatId;
  }

  @api
  set recordId(value) {
    this.setAttribute("boatId", value);
    this.boatId = value;
  }

  // Gets user rating input from stars component
  handleRatingChanged(event) {
    this.rating = event.detail.rating;
  }

  // Custom submission handler to properly set Rating

  // form to be submitted: lightning-record-edit-form
  handleSubmit(event) {
    event.preventDefault();
    console.log("form is submittied, event detail: ");
    console.log(event.detail.fields);
    let fields = event.detail.fields;
    fields.Boat__c = this.boatId;
    fields.Rating__c = this.rating;
    //fieldApiName
    console.log("fields before saving or submitting ? ", fields);
    this.template.querySelector("lightning-record-edit-form").submit(fields);

    //let recordInput = { apiName: BOAT_REVIEW_OBJECT.objectApiName, fields };
    // createRecord(recordInput).then(() => {
    //     this.handleSuccess();
    // }).catch((e) => {
    //     this.dispatchEvent(new ShowToastEvent({
    //         title: ERROR_TITLE,
    //         variant: ERROR_VARIANT,
    //         message: e.toString(),
    //     }));
    // }).finally(() => {
    // });
  }

  // Shows a toast message once form is submitted successfully
  // Dispatches event when a review is created
  handleSuccess() {
    this.dispatchEvent(new CustomEvent("createreview"));
    // TODO: dispatch the custom event and show the success message
    this.handleReset();
    this.dispatchEvent(
      new ShowToastEvent({
        title: SUCCESS_TITLE,
        variant: SUCCESS_VARIANT,
        message: SUCCESS_MESSAGE
      })
    );
  }

  // Clears form data upon submission
  // TODO: it must reset each lightning-input-field
  handleReset() {
    let inpFields = Array.from(
      this.template.querySelectorAll("lightning-input-field")
    );
    inpFields.forEach((f) => {
      //f.value = '';
      f.reset();
    });
    this.template.querySelector("c-five-star-rating").value = 0;
  }

  connectedCallback() {}

  errorCallback(error, stack) {
    console.log("boat aedd review form error");
    console.log(error);
    console.log(stack);
  }

  handleError(e) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: ERROR_TITLE,
        variant: ERROR_VARIANT,
        message: e.detail.toString()
      })
    );
  }
}
