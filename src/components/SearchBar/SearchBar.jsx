import { Input } from "antd"

import "./styles.css"

const SearchBar = ({ value, onChange }) => (
  <Input
    className="search-bar"
    value={value}
    onChange={onChange}
    placeholder="Type to search..."
    allowClear
    name="search"
  />
)

export default SearchBar
