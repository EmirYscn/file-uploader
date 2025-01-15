import { prisma } from "./queries";

async function main() {
  // await prisma.user.deleteMany();
  // await prisma.folder.deleteMany();
  await prisma.file.delete({
    where: { id: 48 },
  });
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
  //       name: "Math",
  //       fileCount: 10,
  //       size: 12.2,
  //       userId: 17,
  //       parentId: 19,
  //     },
  //     {
  //       name: "prevQuarter.csv",
  //       fileCount: 10,
  //       size: 12.2,
  //       userId: 17,
  //       parentId: 20,
  //     },
  //     {
  //       name: "Chest",
  //       fileCount: 10,
  //       size: 12.2,
  //       userId: 17,
  //       parentId: 21,
  //     },
  //   ],
  // });
  // const allFiles = await prisma.folder.findMany();
  // console.dir(allFiles, { depth: null });
  // await prisma.file.createMany({
  //   data: [
  //     {
  //       name: "TestFile2",
  //       size: 10,
  //       url: "blabla",
  //       userId: 17,
  //     },
  //     {
  //       name: "TestFile3",
  //       size: 10,
  //       url: "blabla",
  //       userId: 17,
  //     },
  //     {
  //       name: "TestFile4",
  //       size: 10,
  //       url: "blabla",
  //       userId: 17,
  //     },
  //   ],
  // });
  // const allFiles = await prisma.file.findMany();
  // console.dir(allFiles, { depth: null });
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
