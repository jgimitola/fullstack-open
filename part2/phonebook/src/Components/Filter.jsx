const Filter = ({ filter, handleChangeFilter }) => (
  <div>
    <p>
      filter shown with:
      <input type="search" value={filter} onChange={handleChangeFilter} />
    </p>
  </div>
);
export default Filter;
