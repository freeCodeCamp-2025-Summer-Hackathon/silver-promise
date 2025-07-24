import {
    PollData,
    PollFormData,
    PollLink,
    PollTypes,
} from "@/lib/types/PollTypes";

export async function POST(request: Request) {
    const pollFormData: PollFormData = await request.json();

    console.log(pollFormData);

    if (!pollFormData) {
        return Response.json(
            {
                message: "Pollform validation failed",
                success: false,
                errors: "No formdata posted",
            },
            { status: 400 }
        );
    }

    const { userId, isPublic, ...restPollFormData } = pollFormData;

    //*******check if user exists on db using********//

    // const existingUser = await prisma.user.findUnique({
    //     where: {
    //         id: Number(userId),
    //     },
    // });

    // if (!existingUser) {
    //     return Response.json({
    //         message: "failed to create poll",
    //         error: "No user found",
    //         success: false,
    //     }, {status:400});
    // }

    const createdPollLink: PollLink[] = [];

    //***************create new poll*************//

    try {
        // const newPoll = await prisma.poll.create({
        //     data: {
        //         title: restPollFormData.title,
        //         description: restPollFormData.description,
        //         startAt: restPollFormData.startAt || new Date(),
        //         endAt: restPollFormData.endAt
        //             ? new Date(restPollFormData.endAt).toISOString()
        //             : null,
        //         isPublic: isPublic ?? false,
        //         author: {
        //             connect: { id: Number(userId) },
        //         },
        //         questions: {
        //             create: restPollFormData.questions.map((q) => ({
        //                 question: q.question,
        //                 type: q.type,
        //                 isRequired: true,
        //                 position: 1,
        //                 options: {
        //                     create: q.options.map((option) => ({
        //                         option: option.value,
        //                         position: 1,
        //                     })),
        //                 },
        //             })),
        //         },
        //         include: {
        //             questions: {
        //                 include: {
        //                     options: true,
        //                 },
        //             },
        //         },
        //     },
        // });

        /**
         * the generates slug from title and id and sanitize the title
         * remove non alphabetical characters
         * remove space and replace with hyphens
         * remove mulitiple hypen and replace with one
         * trim to remove leading and trailing spaces
         * @param title string
         * @param id number
         * @returns a slug with a combination of poll-title and poll-id
         */
        // function generateSlugFromTitleAndId(title: string, id: number): string {
        //     const sanitizedTitle = title
        //         .toLowerCase()
        //         .replace(/[^a-z0-9\s-]/g, "")
        //         .replace(/\s+/g, "-")
        //         .replace(/-+/g, "-")
        //         .trim();

        //     return `${sanitizedTitle}-${id}`;
        // }

        //****************checks if poll is set to public
        // if (newPoll.isPublic) {
        //     let uniqueSlug = generateSlugFromTitleAndId(
        //         newPoll?.title,
        //         newPoll?.id
        //     );

        //     let existingSlug = await prisma.pollLink.findUnique({
        //         where: {
        //             slug: uniqueSlug,
        //         },
        //     });

        //********************if slug already exist, append a random suffix to it's end to ensure the slug is unique (a retry mechanism)
        // let retryCount = 0;

        // while (existingSlug && retryCount < 5) {
        //     uniqueSlug = `${generateSlugFromTitleAndId(newPoll?.title, newPoll?.id)}-${Math.random().toString(36).substring(2, 8)}`;
        //     existingSlug = await prisma.pollLink.findUnique({
        //         where: { slug: uniqueSlug },
        //     });

        //     retryCount++;
        // }

        //****************sets date link expires, if no date is set, set the expiration date to 2yrs from now
        // const linkExpiresAt = newPoll?.endAt
        //     ? new Date(newPoll.endAt).toISOString()
        //     : new Date(
        //           new Date().setFullYear(new Date().getFullYear() + 2)
        //       );

        //****************create shareable polllink
        // const newPollLink = await prisma.pollLink.create({
        //     data: {
        //         pollId: Number(newPoll?.id),
        //         slug: uniqueSlug,
        //         createdAt: new Date().toISOString(),
        //         ExpiresAt: linkExpiresAt,
        //     },
        // });

        // createdPollLink.push(newPollLink);
        //}

        //change the the prisma return object back to pollData for consistent response
        const mockResponsePoll: PollData = {
            id: 1,
            title: "Favorite Footballer",
            description: "A poll about your favorite football player",
            questions: [
                {
                    id: 1,
                    question: "Who is your favorite football player?",
                    type: PollTypes.SINGLE, // PollTypes.SINGLE
                    options: [
                        {
                            id: "opt1",
                            label: "Lionel Messi",
                            value: "Lionel Messi",
                        },
                        {
                            id: "opt2",
                            label: "Cristiano Ronaldo",
                            value: "Cristiano Ronaldo",
                        },
                        {
                            id: "opt3",
                            label: "Kylian Mbappé",
                            value: "Kylian Mbappé",
                        },
                    ],
                    position: 1,
                    isRequired: true,
                },
            ],
            author: "shenkz@test.com", // or user ID/name as string
            userId: 123,
            isPublic: true,
            startAt: new Date().toISOString(), // e.g. "2025-04-05T10:00:00.000Z"
            endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            links: [
                {
                    pollId: 1,
                    slug: "favorite-footballer-1-a2b4c",
                    createdAt: new Date(),
                    expiresAt: new Date(
                        Date.now() + 2 * 365 * 24 * 60 * 60 * 1000
                    ), // 2 years
                },
            ],
        };

        return Response.json(
            {
                message: "Poll created successfully",
                success: true,
                poll: mockResponsePoll,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating poll:", error);
        return Response.json(
            {
                message: "Internal server error",
                success: false,
                errors: "Failed to create poll",
            },
            { status: 500 }
        );
    }
}
