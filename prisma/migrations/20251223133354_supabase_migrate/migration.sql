-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Single', 'Married', 'Divorced', 'Widowed', 'Separated');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('In', 'Out');

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "upazilaOrThana" TEXT NOT NULL,
    "postOffice" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "houseNoOrVillage" TEXT NOT NULL,
    "roadNo" TEXT DEFAULT 'n/a',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInformation" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL DEFAULT 'n/a',
    "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" TEXT NOT NULL DEFAULT 'n/a',
    "occupation" TEXT NOT NULL DEFAULT 'n/a',
    "nid" TEXT NOT NULL DEFAULT 'n/a',
    "mobileNumber" TEXT NOT NULL DEFAULT 'n/a',
    "email" TEXT NOT NULL DEFAULT 'n/a',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalInformation" (
    "id" TEXT NOT NULL,
    "fatherName" TEXT DEFAULT 'n/a',
    "motherName" TEXT DEFAULT 'n/a',
    "nationalId" TEXT DEFAULT 'n/a',
    "placeOfBirth" TEXT DEFAULT 'n/a',
    "maritalStatus" "MaritalStatus" DEFAULT 'Single',
    "eTIN" TEXT DEFAULT 'n/a',
    "program" TEXT DEFAULT 'n/a',
    "unit" TEXT DEFAULT 'n/a',
    "prlDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateofRegularity" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdditionalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "officeEmail" TEXT NOT NULL,
    "personalEmail" TEXT NOT NULL,
    "personalNumber" TEXT NOT NULL,
    "officeNumber" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "employeeStatus" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "disability" BOOLEAN NOT NULL,
    "gender" "Gender" NOT NULL,
    "religion" TEXT NOT NULL,
    "joiningDesignation" TEXT NOT NULL,
    "currentDesignation" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfConfirmation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankInformation" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "walletType" TEXT NOT NULL DEFAULT 'N/A',
    "walletNumber" TEXT NOT NULL DEFAULT 'N/A',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOut" TIMESTAMP(3),
    "preferableInTime" TIMESTAMP(3) NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personalInformationId" TEXT NOT NULL,
    "bankInformationId" TEXT NOT NULL,
    "addtionalInformationId" TEXT NOT NULL,
    "presentAddressId" TEXT NOT NULL,
    "permanentAddressId" TEXT NOT NULL,
    "spouseInformationId" TEXT,
    "emergencyContactId" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_officeEmail_key" ON "PersonalInformation"("officeEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_personalEmail_key" ON "PersonalInformation"("personalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_addtionalInformationId_key" ON "Employee"("addtionalInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_presentAddressId_key" ON "Employee"("presentAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_permanentAddressId_key" ON "Employee"("permanentAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_spouseInformationId_key" ON "Employee"("spouseInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_emergencyContactId_key" ON "Employee"("emergencyContactId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_bankInformationId_fkey" FOREIGN KEY ("bankInformationId") REFERENCES "BankInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_addtionalInformationId_fkey" FOREIGN KEY ("addtionalInformationId") REFERENCES "AdditionalInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_spouseInformationId_fkey" FOREIGN KEY ("spouseInformationId") REFERENCES "ContactInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_emergencyContactId_fkey" FOREIGN KEY ("emergencyContactId") REFERENCES "ContactInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
