import { Result, Button } from "antd"

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={error.message}
      extra={
        <Button type="primary" onClick={resetErrorBoundary}>
          Try again
        </Button>
      }
    />
  )
}

export default ErrorFallback
