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

  await prisma.file.create({
    data: {
      name: "TestFile",
      size: 10,
      url: "blabla",
      folder_id: 3,
      user_id: 10,
    },
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
