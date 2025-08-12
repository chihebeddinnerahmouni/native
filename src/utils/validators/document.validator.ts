import * as yup from "yup";

export const RenameDocumentValidator = yup.object().shape({
  newName: yup
    .string()
    .required("New Name is required")
    .test("no-extension", "New Name should not have an extension", (value) => {
      return !value.includes(".");
    }),
});
