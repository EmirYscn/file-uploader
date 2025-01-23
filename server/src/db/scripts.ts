import { prisma } from "./queries";

async function main() {
  // await prisma.user.deleteMany();
  // await prisma.folder.deleteMany();
  // await prisma.file.delete({
  //   where: { id: 48 },
  // });
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
  //       parentId: 25,
  //     },
  //     {
  //       name: "prevQuarter.csv",
  //       fileCount: 10,
  //       size: 12.2,
  //       userId: 17,
  //       parentId: 26,
  //     },
  //     {
  //       name: "Chest",
  //       fileCount: 10,
  //       size: 12.2,
  //       userId: 17,
  //       parentId: 27,
  //     },
  //   ],
  // });
  // const allFiles = await prisma.folder.findMany();
  // console.dir(allFiles, { depth: null });
  // await prisma.file.createMany({
  //   data: [
  //     {
  //       name: "day1",
  //       size: 10,
  //       url: "blabla",
  //       userId: 17,
  //       folderId: 30,
  //     },
  //     {
  //       name: "day2",
  //       size: 10,
  //       url: "blabla",
  //       userId: 17,
  //       folderId: 30,
  //     },
  //     {
  //       name: "day4",
  //       size: 10,
  //       url: "blabla",
  //       userId: 17,
  //       folderId: 30,
  //     },
  //   ],
  // });
  // const allFiles = await prisma.file.findMany();
  // console.dir(allFiles, { depth: null });
  // await prisma.folderShare.createMany({
  //   data: [
  //     {
  //       userId: 17,
  //       folderId: 42,
  //     },
  //     {
  //       userId: 17,
  //       folderId: 43,
  //     },
  //   ],
  // });
  // const allFolderShares = await prisma.folderShare.findMany();
  // console.dir(allFolderShares, { depth: null });
  await prisma.fileShare.createMany({
    data: [
      {
        userId: 17,
        fileId: 81,
      },
    ],
  });
  const allFileShares = await prisma.fileShare.findMany();
  console.dir(allFileShares, { depth: null });
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
