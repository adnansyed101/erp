import { Spinner } from '../ui/spinner'

const DefaultLoadingComponent = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner className="size-48" />
    </div>
  )
}

export default DefaultLoadingComponent
