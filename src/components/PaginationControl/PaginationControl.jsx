import { Pagination } from "antd"

const PaginationControl = ({ currentPage, totalItems, onChange }) =>
  totalItems > 0 && (
    <Pagination
      current={currentPage}
      total={totalItems}
      pageSize={20}
      showSizeChanger={false}
      onChange={onChange}
      style={{
        margin: "20px 0",
        display: "flex",
        justifyContent: "center",
      }}
    />
  )

export default PaginationControl
