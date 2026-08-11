const CATEGORIES = ['FOOD', 'TRAVEL', 'SHOPPING', 'BILLS', 'ENTERTAINMENT', 'HEALTH', 'OTHER'];

function FilterBar({ filters, onFilterChange, onReset, onExportCsv }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-bar">
      <h3>Filters & Controls</h3>
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="filterSearch">Search Description</label>
          <input
            type="text"
            id="filterSearch"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            placeholder="Search keywords..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filterCategory">Category</label>
          <select
            id="filterCategory"
            name="category"
            value={filters.category || ''}
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
            value={filters.month || ''}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filterSortDate">Sort by Date</label>
          <select
            id="filterSortDate"
            name="sortDate"
            value={filters.sortDate || 'date-desc'}
            onChange={handleChange}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filterSortAmount">Sort by Amount</label>
          <select
            id="filterSortAmount"
            name="sortAmount"
            value={filters.sortAmount || 'none'}
            onChange={handleChange}
          >
            <option value="none">None (Default)</option>
            <option value="amount-desc">High to Low</option>
            <option value="amount-asc">Low to High</option>
          </select>
        </div>

        <div className="filter-group filter-actions" style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={onReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={onExportCsv}>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
