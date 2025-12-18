import z from "zod";
import {
  AdditionalInformationSchema,
  BankInformationSchema,
  EmergencyContactSchema,
  EmployeeSchema,
  EmployeeSchemaWithId,
  PermanentAddressSchema,
  PersonalInformationSchema,
  PresentAddressSchema,
  SpouseInformationSchema,
} from "../validators/employee.validator";

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>;
export type AddtionalInformation = z.infer<typeof AdditionalInformationSchema>;
export type BankInformation = z.infer<typeof BankInformationSchema>;

export type PresentAddress = z.infer<typeof PresentAddressSchema>;
export type PermanentAddress = z.infer<typeof PermanentAddressSchema>;

export type SpouseInformation = z.infer<typeof SpouseInformationSchema>;
export type EmergencyContact = z.infer<typeof EmergencyContactSchema>;

export type Employee = z.infer<typeof EmployeeSchema>;

export type EmployeeWithId = z.infer<typeof EmployeeSchemaWithId>
