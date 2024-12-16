const {faker} = require("@faker-js/faker");
const { format, addYears } = require('date-fns');

const classes = [
  "Fighter",
  "Barbarian",
  "Wizard",
  "Sorceror",
  "Cleric",
  "Druid",
  "Bard",
  "Rogue",
  "Paladin",
  "Warlock"
]

const classStats = {
  Fighter: {
    hitpoints: 10,
    strength: 2,
    constitution: 2,
    wisdom: -1,
    intelligence: -1
  },
  Barbarian: {
    hitpoints: 12,
    strength: 2,
    dexterity: 2,
    constitution: 2,
    wisdom: -2,
    intelligence: -2
  },
  Wizard: { hitpoints: 6, intelligence: 2 },
  Sorceror: { hitpoints: 6, charisma: 2 },
  Cleric: {
    hitpoints: 8,
    strength: 1,
    constitution: 1,
    wisdom: 2,
    dexterity: -1,
    intelligence: -1
  },
  Druid: { hitpoints: 8, strength: -1, dexterity: 1, wisdom: 2 },
  Bard: { hitpoints: 8, dexterity: 1, charisma: 2, wisdom: -1 },
  Rogue: { hitpoints: 8, dexterity: 2 },
  Paladin: { hitpoints: 10, strength: 1, dexterity: -1, wisdom: 1, charisma: 1 },
  Warlock: { hitpoints: 8, strength: -1, wisdom: 1, charisma: 2 }
}

const races = [
  "Hobbit",
  "Elf",
  "Half-Orc",
  "Dwarf",
  "Human",
  "Gnome",
  "Dragonborn",
  "Lizardfolk"
]

const raceStats = {
  Hobbit: { height: 120, age: 250, dexterity: 2 },
  Elf: { height: 180, age: 750, dexterity: 2, wisdom: 1 },
  "Half-Orc": { height: 200, age: 60, strength: 2, intelligence: -1 },
  Dwarf: { height: 140, age: 350, wisdom: 1, constitution: 2 },
  Human: {
    height: 170,
    age: 85,
    strength: 1,
    constitution: 1,
    wisdom: 1,
    dexterity: 1,
    intelligence: 1
  },
  Gnome: { height: 100, age: 400, dexterity: 2 },
  Dragonborn: {
    height: 170, age: 80, strength: 2, charisma: 1
  },
  Lizardfolk: {
    height: 170,
    age: 60,
    strength: 2,
    constitution: 2,
    intelligence: -2,
  }
}

const images = {
  Hobbit: ["Hobbit.png", "Hobbit2.png"],
  Elf: ["Elf.png"],
  "Half-Orc": ["Orc.png", "Orc2.png"],
  Dwarf: ["Dwarf.png"],
  Human: ["Human.png", "Human2.png", "Human3.png"],
  Gnome: ["Gnome.png", "Gnome2.png"],
  Dragonborn: ["Dragonborn.png"],
  Lizardfolk: ["Lizardfolk.png", "Lizardfolk2.png"]
}

const getRaceStat = (race, stat) =>
  raceStats[race][stat] ? raceStats[race][stat] : 0

const getClassStat = (classname, stat) =>
  classStats[classname][stat] ? classStats[classname][stat] : 0

const getRaceImage = ({ race }) =>
  "http://localhost:3003/images/" + faker.helpers.arrayElement(images[race])

const calculateStat = ({ race, classname }, stat, min = 8, max = 14) => {
  return (
    faker.number.int({ min, max }) +
    getRaceStat(race, stat) +
    getClassStat(classname, stat)
  )
}

const calculateHitpoints = ({ classname, level, constitution }) => {
  return Math.round(getClassStat(classname, 'hitpoints')/2 + (constitution - 10)/2) * level;
}

const calculateHeight = ({ race }) => {
    return Math.round(getRaceStat(race, 'height') * faker.number.float({ min: 0.75, max: 1.25 }))
}

const calculateDob = ({ race }) => {
  const max = raceStats[race]["age"]
  const age = faker.number.int({ min: max * 0.2, max })
  return format(addYears(new Date(), -age), "yyyy-MM-dd")
}

const generateCandidates = (count) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const candidate = {
      id: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
      name: faker.person.fullName(),
      classname: faker.helpers.arrayElement(classes),
      lair_location: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}`,
      lair_secret_password: faker.hacker.verb() + " " + faker.hacker.noun(),
      race: faker.helpers.arrayElement(races),
      level: faker.number.int({ min: 1, max: 20 }),
    }

    const candidateWithStats = {
      ...candidate,
      dob: calculateDob(candidate),
      image: getRaceImage(candidate),
      height: calculateHeight(candidate),
      strength: calculateStat(candidate, "strength"),
      dexterity: calculateStat(candidate, "dexterity"),
      constitution: calculateStat(candidate, "constitution"),
      intelligence: calculateStat(candidate, "intelligence"),
      wisdom: calculateStat(candidate, "wisdom"),
      charisma: calculateStat(candidate, "charisma")
    }

    data.push({
      ...candidateWithStats,
      hitpoints: calculateHitpoints(candidateWithStats)
    })
  }

  return data
}

module.exports = generateCandidates
