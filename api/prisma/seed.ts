import { faker } from "@faker-js/faker";
import {
  PrismaClient,
  Prisma,
  User,
  Player,
  Match,
  Game,
} from "@prisma/client";
import {
  COMMONMATCHLENGTH,
  getRandomInt,
  matchesTypes,
} from "../src/constants";

const prisma = new PrismaClient();

async function createFakeUsers() {
  const usersAmount = 20;
  let usersFake: User[] = [];

  for (let index = 0; index < usersAmount; index++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user: User = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      password: "senha123",
      // password: faker.internet.password(),
      email: faker.internet.email({
        firstName,
        lastName,
        provider: "gmail.com",
      }),
      cratedAt: faker.date.soon(),
    };

    const createdUser = await prisma.user.create({
      data: user,
    });
    usersFake.push(createdUser);
  }

  return usersFake;
}

async function createFakePlayers(usersId: string[]) {
  const playersAmount = 20;
  let createdPlayers: Player[] = [];

  for (let i = 0; i < playersAmount; i++) {
    const fakerPlayer: Prisma.PlayerCreateInput = {
      name: faker.person.fullName(),
      grip: {
        connect: {
          id: getRandomInt(3, 1),
        },
      },
      user: {
        connect: {
          id: usersId[i],
        },
      },
      Rating: {
        create: {
          score: getRandomInt(6000, 1000),
        },
      },
    };

    const player = await prisma.player.create({
      data: fakerPlayer,
    });

    createdPlayers.push(player);
  }

  return createdPlayers;
}

async function createFakeGrips() {
  await prisma.grip.createMany({
    data: [
      {
        title: "Clássica",
      },
      {
        title: "Caneta Clássica",
      },
      {
        title: "Caneta Moderna Chinesa",
      },
    ],
  });
}

async function main() {
  console.log(`Start seeding ...`);

  // Seeding Users
  const users = await createFakeUsers();
  console.log("--> Users seed finished");

  // Seeding grips
  createFakeGrips();
  console.log("--> Grips seed finished");

  // Seeding Players
  const players = await createFakePlayers(users.map((user) => user.id));
  console.log("--> Players seed finished");

  // // Seeding Match
  // // for (const m of matchData) {
  // //   const match = await prisma.match.create({
  // //     data: m,
  // //   });
  // //   console.log(`Created match with id: ${match.id}`);
  // // }
  // // for (const r of ratingsData) {
  // //   const rating = await prisma.rating.create({
  // //     data: r,
  // //   });
  // //   console.log(`Created rating with id: ${rating.id}`);
  // // }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
