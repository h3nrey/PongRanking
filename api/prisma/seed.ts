import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// const playerData: Prisma.PlayerCreateInput[] = [
//   {
//     name: "Fan Zhendong",
//     grip: {
//         create: {
//             title: "handshake",
//         }
//     },
//     Rating: {
//         create: {
//             score: 4300,
//         }
//     }
//   },
//   {
//     name: "Ma long",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 0
//             },
//             create: {
//                 title: "handshake",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 3200,
//         }
//     }
//   },
//   {
//     name: "Xu Xin",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "penhold",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 2000,
//         }
//     }
//   },
//   {
//     name: "Hugo Calderano",
//     grip: {
//         create: {
//             title: "handshake",
//         }
//     },
//     Rating: {
//         create: {
//             score: 4250,
//         }
//     }
//   },
//   {
//     name: "Felix Lebrun",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 2
//             },
//             create: {
//                 title: "penhold",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 3200,
//         }
//     }
//   },
//   {
//     name: "Alexis Lebrun",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "shakehand",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 2000,
//         }
//     }
//   },
//   {
//     name: "Quadri Aruna",
//     grip: {
//         create: {
//             title: "handshake",
//         }
//     },
//     Rating: {
//         create: {
//             score: 2200,
//         }
//     }
//   },
//   {
//     name: "Togata Harimoto",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "handshake",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 3200,
//         }
//     }
//   },
//   {
//     name: "Victor Ishy",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "shakehand",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 900,
//         }
//     }
//   },
//   {
//     name: "Truls Moregard",
//     grip: {
//         create: {
//             title: "handshake",
//         }
//     },
//     Rating: {
//         create: {
//             score: 3050,
//         }
//     }
//   },
//   {
//     name: "Ma Li",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "handshake",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 500,
//         }
//     }
//   },
//   {
//     name: "Marcos Freitas",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "Shakehand",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 2000,
//         }
//     }
//   },
//   {
//     name: "Bruna Takahashi",
//     grip: {
//         create: {
//             title: "handshake",
//         }
//     },
//     Rating: {
//         create: {
//             score: 1800,
//         }
//     }
//   },
//   {
//     name: "Guilia Takahashi",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "handshake",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 3200,
//         }
//     }
//   },
//   {
//     name: "Timo Boll",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "shakehand",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 2000,
//         }
//     }
//   },
//   {
//     name: "Dimitri Otcharov",
//     grip: {
//         create: {
//             title: "handshake",
//         }
//     },
//     Rating: {
//         create: {
//             score: 2780,
//         }
//     }
//   },
//   {
//     name: "Liang Jingkun",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 0
//             },
//             create: {
//                 title: "handshake",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 2500,
//         }
//     }
//   },
//   {
//     name: "Waldner",
//     grip: {
//         connectOrCreate: {
//             where: {
//                 id: 1
//             },
//             create: {
//                 title: "handshake",
//             }
//         }
//     },
//     Rating: {
//         create: {
//             score: 2000,
//         }
//     }
//   },
// ];

const playerData: Prisma.PlayerCreateInput[] = [
  {
    name: "Hugo Calderano",
    grip: {
      create: {
        title: "handshake",
      },
    },
    user: {
      connect: {
        id: "5db83d5b-1625-443e-b423-2ececfe87907",
      },
    },
    Rating: {
      create: {
        score: 4000,
      },
    },
  },
  {
    name: "Truls Moregard",
    grip: {
      connect: {
        id: 1,
      },
    },
    user: {
      connect: {
        id: "378698b9-dc5a-4923-9ed8-d1ad5df9634a",
      },
    },
    Rating: {
      create: {
        score: 4000,
      },
    },
  },
  {
    name: "Fan Zhendong",
    grip: {
      connect: {
        id: 1,
      },
    },
    user: {
      connect: {
        id: "49e7ca1c-c511-46a8-b356-18d431f25f58",
      },
    },
    Rating: {
      create: {
        score: 4000,
      },
    },
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    id: "5db83d5b-1625-443e-b423-2ececfe87907",
    username: "hugoCalderano",
    email: "hugo@gmail.com",
    password: "brazil123",
  },
  {
    id: "378698b9-dc5a-4923-9ed8-d1ad5df9634a",
    username: "trulsMoregard",
    email: "truls@gmail.com",
    password: "suecia123",
  },
  {
    id: "49e7ca1c-c511-46a8-b356-18d431f25f58",
    username: "fanZhendong",
    email: "fan@gmail.com",
    password: "china123",
  },
];

const matchData: Prisma.MatchCreateInput[] = [
  {
    type: "solo",
    winnerId: 1,
    maxPoints: 11,
    games: {
      createMany: {
        data: [
          {
            points: "111000101111110000000",
          },
          {
            points: "000000000000001111111111111100",
          },
          {
            points: "111111111110000000",
          },
          {
            points: "000000000001111111",
          },
          {
            points: "1111111111110000000000",
          },
          {
            points: "0000000000011111111",
          },
        ],
      },
    },
    players: {
      connect: [{ id: 2 }, { id: 1 }],
    },
  },
  {
    type: "solo",
    winnerId: 2,
    maxPoints: 11,
    games: {
      createMany: {
        data: [
          {
            points: "111111111110000000",
          },
          {
            points: "00000000000111111111",
          },
          {
            points: "00000000000111111111",
          },
          {
            points: "0000000000011111111",
          },
          {
            points: "0000000000011111111",
          },
        ],
      },
    },
    players: {
      connect: [{ id: 3 }, { id: 2 }],
    },
  },
];

const ratingsData: Prisma.RatingCreateInput[] = [
  {
    score: 3992,
    player: {
      connect: {
        id: 1,
      },
    },
  },
  {
    score: 4008,
    player: {
      connect: {
        id: 2,
      },
    },
  },
  {
    score: 4000,
    player: {
      connect: {
        id: 3,
      },
    },
  },
  {
    score: 4008,
    player: {
      connect: {
        id: 2,
      },
    },
  },
];
async function main() {
  console.log(`Start seeding ...`);

  // Seeding Users
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`user created: ${user.id}`);
  }

  // Seeding Players
  for (const p of playerData) {
    const player = await prisma.player.create({
      data: p,
    });
    console.log(`Created user with id: ${player.id}`);
  }

  // Seeding Match
  for (const m of matchData) {
    const match = await prisma.match.create({
      data: m,
    });
    console.log(`Created match with id: ${match.id}`);
  }
  for (const r of ratingsData) {
    const rating = await prisma.rating.create({
      data: r,
    });
    console.log(`Created rating with id: ${rating.id}`);
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
