const { people, getFacets } = require("../data");

function parsePeopleQuery(query) {
  return {
    page: Math.max(Number(query.page) || 1, 1),
    limit: Math.min(Math.max(Number(query.limit) || 30, 1), 100),
    search: String(query.search || "").trim().toLowerCase(),
    nationality: String(query.nationality || "").trim(),
    hobby: String(query.hobby || "").trim(),
  };
}

function getPeoplePage(query) {
  const filters = parsePeopleQuery(query);
  const filtered = people.filter((person) => {
    const matchesSearch =
      !filters.search ||
      `${person.first_name} ${person.last_name}`.toLowerCase().includes(filters.search);
    const matchesNationality =
      !filters.nationality || person.nationality === filters.nationality;
    const matchesHobby = !filters.hobby || person.hobbies.includes(filters.hobby);

    return matchesSearch && matchesNationality && matchesHobby;
  });
  const start = (filters.page - 1) * filters.limit;
  const items = filtered.slice(start, start + filters.limit);

  return {
    items,
    page: filters.page,
    limit: filters.limit,
    total: filtered.length,
    hasMore: start + items.length < filtered.length,
  };
}

module.exports = {
  getFacets,
  getPeoplePage,
};
