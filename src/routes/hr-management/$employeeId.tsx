import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Building,
  MapPin,
  Banknote,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'
import { Image } from '@unpic/react'
import { useQuery } from '@tanstack/react-query'
import { Employee } from '@/lib/types/employee.types'

export const Route = createFileRoute('/hr-management/$employeeId')({
  component: RouteComponent,
})

function RouteComponent() {
  // Access the dynamic parameter 'postId'
  const { employeeId } = Route.useParams()

  const {
    data: employee,
    isPending,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employee'],
    queryFn: async (): Promise<{
      success: boolean
      message: string
      data: Employee
    }> => {
      const response = await fetch(`/api/hr-management/${employeeId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch employee by id.')
      }

      return response.json()
    },
  })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/hr-management/employee-list">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        {isLoading || isPending ? (
          'Loading....'
        ) : (
          <>
            {/* Header Card */}
            <Card className="overflow-hidden mb-8 pt-0">
              <CardHeader className="p-0 relative h-80">
                <Image
                  src={
                    employee.data.personalInformation.imageUrl ||
                    '/placeholder.jpeg'
                  }
                  alt={employee.data.personalInformation.fullName}
                  className="w-full object-cover absolute"
                  height={400}
                  width={350}
                />
              </CardHeader>

              <CardContent className="p-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {employee.data.personalInformation.fullName}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <p className="text-xl font-semibold text-primary">
                    {employee.data.personalInformation.currentDesignation}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  <p className="text-lg text-muted-foreground">
                    {employee.data.additionalInformation?.program || 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="spouse">Spouse</TabsTrigger>
                <TabsTrigger value="banking">Banking</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Full Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Gender
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Date of Birth
                        </p>
                        <p className="text-lg font-semibold">
                          {format(
                            employee.data.personalInformation.dateOfBirth.toString(),
                            'PP',
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Nationality
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.nationality}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Marital Status
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.maritalStatus ||
                            'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Religion
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.religion}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Father Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.fatherName ||
                            'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Mother Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.motherName ||
                            'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          National ID
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.nationalId ||
                            'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          eTIN
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.eTIN || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Disability
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.disability
                            ? 'Yes'
                            : 'No'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Place of Birth
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.placeOfBirth ||
                            'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-border my-6" />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Office Email
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.personalInformation.officeEmail}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Personal Email
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.personalInformation.personalEmail}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Office Phone
                            </p>
                            <a className="text-primary hover:underline">
                              {employee.data.personalInformation.officeNumber}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Personal Phone
                            </p>
                            <a className="text-primary hover:underline">
                              {employee.data.personalInformation.personalNumber}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-primary" />
                        Present Address
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Division
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.division}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            District
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.district}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Upazila/Thana
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.upazilaOrThana}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Office
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.postOffice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Code
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.postCode}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            House No./Village
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.houseNoOrVillage}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Road No.
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.roadNo || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Block
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.presentAddress?.block || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-primary" />
                        Permanent Address
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Division
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.division}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            District
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.district}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Upazila/Thana
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.upazilaOrThana}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Office
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.postOffice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Post Code
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.postCode}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            House No./Village
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.houseNoOrVillage}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Road No.
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.roadNo || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Block
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.permanentAddress?.block || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Spouse Information Tab */}
              <TabsContent value="spouse">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      Spouse Information
                    </h2>
                  </CardHeader>
                  <CardContent>
                    {employee.data.spouseInformation ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Full Name
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Gender
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Date of Birth
                          </p>
                          <p className="text-lg font-semibold">
                            {format(
                              employee.data.spouseInformation.dateOfBirth
                                ? employee.data.spouseInformation.dateOfBirth.toString()
                                : '',
                              'PP',
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Occupation
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.occupation}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            NID
                          </p>
                          <p className="text-lg font-semibold">
                            {employee.data.spouseInformation.nid}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Mobile Number
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.spouseInformation.mobileNumber}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Email
                            </p>
                            <span className="text-primary hover:underline">
                              {employee.data.spouseInformation.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No spouse information available
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Banking Information Tab */}
              <TabsContent value="banking">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Banknote className="w-6 h-6 text-primary" />
                      Banking Information
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Bank Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.bankInformation.bankName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Branch Name
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.bankInformation.branchName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Account Number
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.bankInformation.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Wallet Type
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.bankInformation.walletType || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Wallet Number
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.bankInformation.walletNumber || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Employment Information Tab */}
              <TabsContent value="employment">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold">
                      Employment Information
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          employee.data Type
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.employeeType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          employee.data Status
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.employeeStatus}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Joining Designation
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.joiningDesignation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Current Designation
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.personalInformation.currentDesignation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Date of Confirmation
                        </p>
                        <p className="text-lg font-semibold">
                          {format(
                            employee.data.personalInformation
                              .dateOfConfirmation,
                            'PP',
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Program
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.program ||
                            'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Unit
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation?.unit || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          PRL Date
                        </p>
                        <p className="text-lg font-semibold">
                          {format(
                            employee.data.additionalInformation?.prlDate,
                            'PP',
                          ) || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Date of Regularity
                        </p>
                        <p className="text-lg font-semibold">
                          {employee.data.additionalInformation.dateofRegularity
                            ? employee.data.additionalInformation.dateofRegularity.toString()
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </main>
  )
}
