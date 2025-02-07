import { Alert } from "antd"

const StatusAlerts = ({ isOnline, error, searchQuery, movies, loading, activeTab }) => {
  return (
    <>
      {!isOnline && (
        <Alert
          message="No Internet Connection"
          description="Please check your network settings"
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {!loading && activeTab === "search" && (
        <>
          {!searchQuery && movies.length === 0 && (
            <Alert
              message="No movies found"
              description="Try searching for another title"
              type="info"
              showIcon
            />
          )}
        </>
      )}
    </>
  )
}

export default StatusAlerts
