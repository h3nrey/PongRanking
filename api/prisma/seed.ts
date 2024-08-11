import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const playerData: Prisma.PlayerCreateInput[] = [
  {
    name: "Fan Zhendong",
    grip: {
        create: {
            title: "handshake",
        }
    },
    Rating: {
        create: {
            score: 4300,
        }
    }
  },
  {
    name: "Ma long",
    grip: {
        connectOrCreate: {
            where: {
                id: 0
            },
            create: {
                title: "handshake",
            }
        }
    },
    Rating: {
        create: {
            score: 3200,
        }
    }
  },
  {
    name: "Xu Xin",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "penhold",
            }
        }
    },
    Rating: {
        create: {
            score: 2000,
        }
    }
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of playerData) {
    const player = await prisma.player.create({
      data: p,
    });
    console.log(`Created user with id: ${player.id}`);
  }
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