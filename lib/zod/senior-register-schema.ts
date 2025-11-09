import z from "zod";

const MAX_FILE_SIZE = 2_000_000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const seniorRegisterSchema = z.object({
  image: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, { error: 'File size must be 2MB or less' })
    .optional(),
  lastname: z.string()
    .min(1, { error: "Please enter a last name.", })
    .max(100, { error: 'Last name must be less than 100 characters.' }),
  firstname: z.string()
    .min(1, { error: "Please enter a first name.", })
    .max(100, { error: 'First name must be less than 100 characters.' }),
  middlename: z.string()
    .min(1, { error: "Please enter a middle name.", })
    .max(100, { error: 'Middle name must be less than 100 characters.' }),
  gender: z.string().min(1, {
    message: "Please select a gender.",
  }),
  address: z.string()
    .min(1, { error: "Please enter an adress.", })
    .max(200, { error: 'Address must be less than 200 characters.' }),
  // birthdate: z.coerce.date({error: 'Please enter a birthdate.'}),
  birthdate: z.date({ error: 'Please select a date of birth.' }),
  // birthdate: z.string().min(1),
  guardian: z.string()
    .min(1, { error: "Please enter a guardian\'s name.", })
    .max(100, { error: 'Guardian\'s name must be less than 100 characters.' }),
  contact: z.string()
    .min(11, { error: "Please enter valid 11 digit contact number.", })
    .max(11, { error: 'Please enter valid 11 digit contact number.' }),
  psaCertificate: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, { error: 'File size must be 2MB or less' })
    .optional(),
  pwdId: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, { error: 'File size must be 2MB or less' })
    .optional(),
  seniorId: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, { error: 'File size must be 2MB or less' })
    .optional(),
  philhealthId: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, { error: 'File size must be 2MB or less' })
    .optional(),
})

export type SeniorRegisterSchemaType = z.infer<typeof seniorRegisterSchema>