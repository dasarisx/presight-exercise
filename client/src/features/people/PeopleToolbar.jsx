export function PeopleToolbar({ total, search, onSearchChange }) {
  return (
    <div className="toolbar">
      <div>
        <h1>People Directory</h1>
        <p>{total} matching profiles</p>
      </div>
      <input
        type="search"
        placeholder="Search by name"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}
