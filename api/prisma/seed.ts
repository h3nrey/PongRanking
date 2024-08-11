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
  {
    name: "Hugo Calderano",
    grip: {
        create: {
            title: "handshake",
        }
    },
    Rating: {
        create: {
            score: 4250,
        }
    }
  },
  {
    name: "Felix Lebrun",
    grip: {
        connectOrCreate: {
            where: {
                id: 2
            },
            create: {
                title: "penhold",
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
    name: "Alexis Lebrun",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "shakehand",
            }
        }
    },
    Rating: {
        create: {
            score: 2000,
        }
    }
  },
  {
    name: "Quadri Aruna",
    grip: {
        create: {
            title: "handshake",
        }
    },
    Rating: {
        create: {
            score: 2200,
        }
    }
  },
  {
    name: "Togata Harimoto",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
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
    name: "Victor Ishy",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "shakehand",
            }
        }
    },
    Rating: {
        create: {
            score: 900,
        }
    }
  },
  {
    name: "Truls Moregard",
    grip: {
        create: {
            title: "handshake",
        }
    },
    Rating: {
        create: {
            score: 3050,
        }
    }
  },
  {
    name: "Ma Li",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "handshake",
            }
        }
    },
    Rating: {
        create: {
            score: 500,
        }
    }
  },
  {
    name: "Marcos Freitas",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "Shakehand",
            }
        }
    },
    Rating: {
        create: {
            score: 2000,
        }
    }
  },
  {
    name: "Bruna Takahashi",
    grip: {
        create: {
            title: "handshake",
        }
    },
    Rating: {
        create: {
            score: 1800,
        }
    }
  },
  {
    name: "Guilia Takahashi",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
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
    name: "Timo Boll",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "shakehand",
            }
        }
    },
    Rating: {
        create: {
            score: 2000,
        }
    }
  },
  {
    name: "Dimitri Otcharov",
    grip: {
        create: {
            title: "handshake",
        }
    },
    Rating: {
        create: {
            score: 2780,
        }
    }
  },
  {
    name: "Liang Jingkun",
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
            score: 2500,
        }
    }
  },
  {
    name: "Waldner",
    grip: {
        connectOrCreate: {
            where: {
                id: 1
            },
            create: {
                title: "handshake",
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