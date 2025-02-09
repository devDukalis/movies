import { Pagination, Button } from "antd"

import "./styles.css"

const PaginationControl = ({ currentPage, totalItems, onChange }) => {
  const itemRender = (current, type, originalElement) => {
    if (type === "page") {
      return (
        <Button
          type={current === currentPage ? "primary" : "default"}
          onClick={() => onChange(current)}
          className="pagination-button">
          {current}
        </Button>
      )
    }
    return originalElement
  }

  return (
    totalItems > 0 && (
      <div className="pagination-control">
        <Pagination
          className="pagination"
          current={currentPage}
          total={totalItems}
          pageSize={20}
          showSizeChanger={false}
          onChange={onChange}
          itemRender={itemRender}
        />
      </div>
    )
  )
}

export default PaginationControl
