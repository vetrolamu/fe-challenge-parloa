const {faker} = require("@faker-js/faker");
const { format, addYears } = require('date-fns');

const professions = [
  "Frontend Engineer",
  "Backend Engineer",
  "Data Engineer",
  "Data Scientist",
  "Quality Engineer",
  "Security Engineer",
  "Product Designer",
  "Product Manager",
]

const images = [
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Hobbit",
  "Human",
  "Lizardfolk",
  "Orc"
]

const levels = ["Junior", "Mid Level", "Senior"]
const levelData = {
  "Junior": { experience: [0,3], age: [20, 40] },
  "Mid Level": { experience: [2,5], age: [25,50] },
  "Senior": { experience: [3,30], age: [30,60] },
}

const getExperience = (level) => {
  const [min, max] = levelData[level].experience
  return faker.number.int({ min, max })
}
const getDateOfBirth = (level) => {
  const [min, max] = levelData[level].age
  const age = faker.number.int({ min, max })
  return format(addYears(new Date(), -age), "yyyy-MM-dd")
}

const getImage = () => "http://localhost:3003/images/" + faker.helpers.arrayElement(images) + ".png"

const generateCandidates = (count) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const level = faker.helpers.arrayElement(levels)
    data.push({
      id: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
      name: faker.person.fullName(),
      profession: faker.helpers.arrayElement(professions),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}`,
      image: getImage(),
      level,
      experience: getExperience(level),
      dateOfBirth: getDateOfBirth(level)
    })
  }

  return data
}

module.exports = generateCandidates
