import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {

    const newUserWithPosts = await prisma.user.create({
        data: {
            email: 'johndoe@example.com',
            posts: {
                create: [
                    {
                        title: 'Hello World',
                        content: 'This is my first post!',
                    },
                    {
                        title: 'Another Post',
                        content: 'This is my second post!',
                    },
                ],
            },
        },
    });

    console.log('The new user with posts:', newUserWithPosts);

    const allPostsOfTheNewUser = await prisma.post.findMany({
        where: {
            authorId: newUserWithPosts.id,
        },
    });
    console.log('All posts of the new user:', allPostsOfTheNewUser);




}

main();
