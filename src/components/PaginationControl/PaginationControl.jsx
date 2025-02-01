import { Pagination, Button } from "antd"

const PaginationControl = ({ currentPage, totalItems, onChange }) => {
  const itemRender = (current, type, originalElement) => {
    if (type === "page") {
      return (
        <Button
          type={current === currentPage ? "primary" : "default"}
          onClick={() => onChange(current)}>
          {current}
        </Button>
      )
    }
    return originalElement
  }

  return (
    totalItems > 0 && (
      <Pagination
        current={currentPage}
        total={totalItems}
        pageSize={20}
        showSizeChanger={false}
        onChange={onChange}
        itemRender={itemRender}
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
        }}
      />
    )
  )
}

export default PaginationControl
