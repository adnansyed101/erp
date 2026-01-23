import z from 'zod'
import { ERP_ROLE_KEYS, LEAVE_TYPES } from '../constant.array'

export const PersonalInformationSchema = z.object({
  fullName: z.string().min(2, 'At least 2 characters are needed.'),
  imageUrl: z.url().min(1, 'Image URL is required.'),
  role: z.enum(ERP_ROLE_KEYS),
  score: z.number().min(1, 'Score is required').max(100),
  officeEmail: z.email(),
  personalEmail: z.email(),
  personalNumber: z.string().min(2, 'Personal Phone Number is required.'),
  officeNumber: z.string().min(2, 'Office Phone Number is required.'),
  employeeType: z.string().min(2, 'Employee Type is required'),
  employeeStatus: z.enum(['active', 'on-leave', 'inactive']),
  nationality: z.string().min(2, 'Nationality is required.'),
  disability: z.boolean(),
  gender: z.enum(['Male', 'Female', 'Other']),
  religion: z.string().min(1, 'Religion status is required.'),
  joiningDesignation: z.string().min(1, 'Joining Designation is required.'),
  currentDesignation: z.string().min(1, 'Current Designation is required'),
  dateOfBirth: z.date(),
  dateOfConfirmation: z.date(),
})

export const AdditionalInformationSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string(),
  nationalId: z.string(),
  placeOfBirth: z.string(),
  maritalStatus: z.enum([
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Separated',
  ]),
  eTIN: z.string(),
  program: z.string(),
  unit: z.string(),
  prlDate: z.date(),
  dateofRegularity: z.date(),
})

const AddressSchema = z.object({
  division: z.string().min(1, 'Division is required.'),
  district: z.string().min(1, 'District is required.'),
  upazilaOrThana: z.string().min(1, 'Upazila is required'),
  postOffice: z.string().min(1, 'Post Office is required.'),
  postCode: z.string().min(1, 'Post Code is required.'),
  houseNoOrVillage: z.string().min(1, 'House No./Village is required.'),
  block: z.string().min(1, 'Block is required.'),
  roadNo: z.string().optional(),
})

export const PresentAddressSchema = AddressSchema
export const PermanentAddressSchema = AddressSchema

export const EmergencyContactSchema = z.object({
  fullName: z.string(),
  dateOfBirth: z.date(),
  gender: z.enum(['Male', 'Female', 'Other']),
  occupation: z.string(),
  nid: z.string(),
  mobileNumber: z.string(),
  email: z.email(),
})

export const SpouseInformationSchema = z.object({
  fullName: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  occupation: z.string().optional(),
  nid: z.string().optional(),
  mobileNumber: z.string().optional(),
  email: z.email().optional(),
})

export const BankInformationSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required.'),
  branchName: z.string().min(1, 'Branch name is required.'),
  accountNumber: z.string().min(1, 'Bank Account Number is required.'),
  walletType: z.string().optional(),
  walletNumber: z.string().optional(),
})

const leaveSchema = z.object({
  // id: z.string(),
  leaveType: z.enum(LEAVE_TYPES),
  yearlyLeave: z.number(),
  leaveTaken: z.number(),
  balance: z.number(),
})

export const EmployeeSchema = z.object({
  personalInformation: PersonalInformationSchema,
  bankInformation: BankInformationSchema,
  additionalInformation: AdditionalInformationSchema,
  spouseInformation: SpouseInformationSchema,
  emergencyContact: EmergencyContactSchema,
  presentAddress: AddressSchema,
  permanentAddress: AddressSchema,
  remainingLeave: leaveSchema.array(),
})

export const EmployeeSchemaWithId = EmployeeSchema.extend({
  id: z.string(),
  userId: z.string(),
})
