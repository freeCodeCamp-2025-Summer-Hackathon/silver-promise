import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: "steph@test.com" },
        update: {},
        create: {
            email: "steph@test.com",
            username: "steph",
            country: "Nigeria",
        },
    });

    console.log({ user });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
