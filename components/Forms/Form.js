import React from "react";
import { Formik } from "formik";

export default function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...props
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
      {...props}
    >
      {({resetForm} ) => <React.Fragment>{children}</React.Fragment>}
    </Formik>
  );
}
