import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

const CreateEmployeeSteps = ({ current = 0 }) => {
  const steps = [
    {
      id: 1,
      url: '/hr-management/create-employee/personal-information',
      title: 'Personal Information',
    },
    {
      id: 2,
      url: '/hr-management/create-employee/additional-information',
      title: 'Additional Information',
    },
    {
      id: 3,
      url: '/hr-management/create-employee/permanent-address',
      title: 'Permanent Address',
    },
    {
      id: 4,
      url: '/hr-management/create-employee/present-address',
      title: 'Present Address',
    },
    {
      id: 5,
      url: '/hr-management/create-employee/spouse-information',
      title: 'Spouse Information',
    },
    {
      id: 6,
      url: '/hr-management/create-employee/emergency-contact',
      title: 'Emergency Contact',
    },
    {
      id: 7,
      url: '/hr-management/create-employee/bank-information',
      title: 'Bank Information',
    },
  ]

  return (
    <div className="flex flex-col space-x-2 space-y-2 mb-4">
      {steps.map((step) => (
        <div key={step.id} className="border-l border-gray-400 p-2">
          <Link
            to={step.url}
            className={cn(
              'p-2 w-56 rounded-full text-center text-sm',
              step.id === current ? 'bg-secondary' : '',
            )}
          >
            {step.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CreateEmployeeSteps
