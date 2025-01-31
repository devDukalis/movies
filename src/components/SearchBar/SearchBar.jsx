import { Input } from "antd"

const SearchBar = ({ value, onChange }) => (
  <Input
    value={value}
    onChange={onChange}
    placeholder="Type to search..."
    allowClear
    style={{ marginBottom: 24, height: 40, fontSize: 16 }}
  />
)

export default SearchBar
