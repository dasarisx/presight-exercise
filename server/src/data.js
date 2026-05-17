const { faker } = require("@faker-js/faker");

const nationalities = [
  "Emirati",
  "Indian",
  "British",
  "American",
  "Canadian",
  "Australian",
  "Singaporean",
  "German",
  "French",
  "Japanese",
  "South African",
  "Brazilian",
];

const hobbies = [
  "Reading",
  "Cycling",
  "Running",
  "Photography",
  "Cooking",
  "Chess",
  "Gardening",
  "Painting",
  "Swimming",
  "Travel",
  "Football",
  "Music",
  "Yoga",
  "Hiking",
  "Gaming",
  "Writing",
  "Tennis",
  "Dancing",
  "Volunteering",
  "Fishing",
  "Baking",
  "Skiing",
  "Pottery",
  "Film",
];

faker.seed(20250410);

function createAvatar(firstName, lastName, index) {
  const palettes = [
    ["#177e89", "#f2fbfc"],
    ["#c8553d", "#fff6f2"],
    ["#4f6f52", "#f4faf4"],
    ["#755c9f", "#f8f5ff"],
    ["#9b6b12", "#fff8e8"],
  ];
  const [background, color] = palettes[index % palettes.length];
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="48" fill="${background}"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${color}">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const people = Array.from({ length: 1000 }, (_, index) => {
  const sex = faker.helpers.arrayElement(["female", "male"]);
  const hobbyCount = faker.number.int({ min: 0, max: 10 });
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);

  return {
    id: `person-${index + 1}`,
    avatar: createAvatar(firstName, lastName, index),
    first_name: firstName,
    last_name: lastName,
    age: faker.number.int({ min: 18, max: 72 }),
    nationality: faker.helpers.arrayElement(nationalities),
    hobbies: faker.helpers.arrayElements(hobbies, hobbyCount),
  };
});

function countBy(values) {
  return values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function toTopList(counts, limit = 20) {
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

function getFacets() {
  return {
    hobbies: toTopList(countBy(people.flatMap((person) => person.hobbies))),
    nationalities: toTopList(countBy(people.map((person) => person.nationality))),
  };
}

module.exports = {
  people,
  getFacets,
};
