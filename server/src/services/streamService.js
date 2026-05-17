const { faker } = require("@faker-js/faker");

function createLongText() {
  return faker.lorem.paragraphs(32, "\n\n");
}

module.exports = {
  createLongText,
};
