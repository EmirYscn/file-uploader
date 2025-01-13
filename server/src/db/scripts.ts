import { prisma } from "./queries";

async function main() {
  // await prisma.user.deleteMany();

  // CREATE
  // await prisma.user.create({
  //   data: {
  //     username: "Emir",
  //     email: "emir@prisma.io",
  //     password: "test",
  //   },
  // });

  // const allUsers = await prisma.user.findMany();
  // console.dir(allUsers, { depth: null });

  // await prisma.folder.createMany({
  //   data: [
  //     {
  //       name: "School",
  //       fileCount: 10,
  //       size: 12.2,
  //       user_id: 14,
  //     },
  //     {
  //       name: "Work",
  //       fileCount: 10,
  //       size: 12.2,
  //       user_id: 14,
  //     },
  //     {
  //       name: "Fitness",
  //       fileCount: 10,
  //       size: 12.2,
  //       user_id: 14,
  //     },
  //   ],
  // });

  // const allFiles = await prisma.folder.findMany();
  // console.dir(allFiles, { depth: null });

  await prisma.file.createMany({
    data: [
      {
        name: "TestFile2",
        size: 10,
        url: "blabla",
        folder_id: 4,
        user_id: 14,
      },
      {
        name: "TestFile3",
        size: 10,
        url: "blabla",
        folder_id: 5,
        user_id: 14,
      },
      {
        name: "TestFile4",
        size: 10,
        url: "blabla",
        folder_id: 6,
        user_id: 14,
      },
    ],
  });

  const allFiles = await prisma.file.findMany();
  console.dir(allFiles, { depth: null });
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
