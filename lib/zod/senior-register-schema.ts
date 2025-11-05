import z from "zod";

const MAX_FILE_SIZE = 2_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const seniorRegisterSchema = z.object({
  image: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, {error: 'File size must be 2MB or less'})
    .optional(),
  lastname: z.string().min(1, {
    message: "Please enter a last name.",
  }),
  firstname: z.string().min(1, {
    message: "Please enter a first name.",
  }),
  middlename: z.string().min(1, {
    message: "Please enter a middle name.",
  }),
  gender: z.string().min(1, {
    message: "Please select a gender.",
  }),
  address: z.string().min(1, {
    message: "Please enter an address.",
  }),
  // birthdate: z.coerce.date({error: 'Please enter a birthdate.'}),
  birthdate: z.date({ error: 'Please select a date of birth.' }),
  // birthdate: z.string().min(1),
  guardian: z.string().min(1, {
    message: "Please enter a guardian name.",
  }),
  contact: z.string().min(11, {
    message: "Please enter an 11 digit contact number.",
  }),
  benefitClaimed: z.boolean(),
  psaCertificate: z.boolean(),
  pwdId: z.boolean(),
  seniorId: z.boolean(),
  philhealthId: z.boolean(),
})

export type SeniorRegisterSchemaType = z.infer<typeof seniorRegisterSchema>