import React from "react";
import { connect } from "react-redux";
import AddProductDialog from "./AddProductDialog";
import firebase from "../firebase";

const AddProductDialogContainer = ({ onClose, profile, ...props }) => (
  <AddProductDialog
    onSubmit={values => {
      const firestore = firebase.firestore();
      values.organization = firestore.doc(profile.organization.ref);
      firestore
        .collection("products")
        .add(values)
        .then(product => {
          onClose();
        })
        .catch(console.error);
    }}
    onClose={onClose}
    {...props}
  />
);

export default connect(state => ({
  profile: state.profile
}))(AddProductDialogContainer);
