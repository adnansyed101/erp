import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Employee } from '@/lib/types/employee.types'

// Define the shape of your store's state
type FormState = {
  currentStep: number
  formData: Employee
  updateFormData: <TKey extends keyof Employee>(
    key: TKey,
    data: Partial<Employee[TKey]>,
  ) => void
}

const initialFormState: Employee = {
  personalInformation: {
    fullName: '',
    imageUrl: '',
    role: '',
    score: 60,
    officeEmail: '',
    personalEmail: '',
    personalNumber: '',
    officeNumber: '',
    employeeType: '',
    employeeStatus: 'active',
    nationality: '',
    disability: false,
    gender: 'Male',
    religion: '',
    joiningDesignation: '',
    currentDesignation: '',
    dateOfBirth: new Date(),
    dateOfConfirmation: new Date(),
  },
  additionalInformation: {
    fatherName: '',
    motherName: '',
    nationalId: '',
    placeOfBirth: '',
    maritalStatus: 'Married',
    eTIN: '',
    program: '',
    unit: '',
    prlDate: new Date(),
    dateofRegularity: new Date(),
  },
  presentAddress: {
    division: '',
    district: '',
    upazilaOrThana: '',
    postOffice: '',
    postCode: '',
    houseNoOrVillage: '',
    block: '',
    roadNo: '',
  },
  permanentAddress: {
    division: '',
    district: '',
    upazilaOrThana: '',
    postOffice: '',
    postCode: '',
    houseNoOrVillage: '',
    block: '',
    roadNo: '',
  },
  spouseInformation: {
    fullName: '',
    dateOfBirth: new Date(),
    gender: 'Male',
    occupation: '',
    nid: '',
    mobileNumber: '',
    email: '',
  },
  emergencyContact: {
    fullName: '',
    dateOfBirth: new Date(),
    gender: 'Male',
    occupation: '',
    nid: '',
    mobileNumber: '',
    email: '',
  },
  bankInformation: {
    bankName: '',
    branchName: '',
    accountNumber: '',
    walletType: '',
    walletNumber: '',
  },
  remainingLeave: {
    casual: 14,
    sick: 10,
    earned: 10,
  },
}

export const useEmployeeStore = create<FormState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialFormState,
      updateFormData: (key, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [key]: {
              ...state.formData[key],
              ...data,
            },
          },
        })),
    }),
    {
      name: 'employee-information-data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
