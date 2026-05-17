export function PersonCard({ person }) {
  const visibleHobbies = person.hobbies.slice(0, 2);
  const remainingHobbies = person.hobbies.length - visibleHobbies.length;

  return (
    <article className="person-card">
      <img className="avatar" src={person.avatar} alt={`${person.first_name} ${person.last_name}`} />
      <div className="person-details">
        <div className="person-title">
          <h3>{person.first_name} {person.last_name}</h3>
          <span>{person.age}</span>
        </div>
        <p>{person.nationality}</p>
        <div className="hobby-row">
          {visibleHobbies.map((hobby) => (
            <span className="tag" key={hobby}>{hobby}</span>
          ))}
          {remainingHobbies > 0 && <span className="tag muted">+{remainingHobbies}</span>}
        </div>
      </div>
    </article>
  );
}
