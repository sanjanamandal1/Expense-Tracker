const CATEGORIES = ['FOOD', 'TRAVEL', 'SHOPPING', 'BILLS', 'ENTERTAINMENT', 'HEALTH', 'OTHER'];

function FilterBar({ filters, onFilterChange, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-bar">
      <h3>Filters</h3>
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="filterCategory">Category</label>
          <select
            id="filterCategory"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filterMonth">Month</label>
          <input
            type="month"
            id="filterMonth"
            name="month"
            value={filters.month}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group filter-actions">
          <button className="btn btn-secondary" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
