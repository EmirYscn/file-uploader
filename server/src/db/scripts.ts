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

  await prisma.folder.create({
    data: {
      name: "testFolder2",
      fileCount: 3,
      size: 10.2,
      user_id: 8,
    },
  });
  const allFolders = await prisma.folder.findMany();
  console.dir(allFolders, { depth: null });
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
