import * as yup from "yup";

import { CreateNotePropertyDto } from "../../backend/casaikos-api";

export const noteSchema: yup.ObjectSchema<CreateNotePropertyDto> = yup.object({
  title: yup.string().required("Note title is required"),
  text: yup
    .string()
    .required("Note text is required")
    .min(1, "Note text must be at least 1 character long"),
});
