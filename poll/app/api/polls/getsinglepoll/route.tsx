import { PollData, PollTypes } from "@/lib/types/PollTypes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    console.log({ slug });

    //***********get pollId from slug
    // const pollId = await prisma.pollLink.findUnique({
    //     where: {
    //         slug: slug,
    //     },
    // });

    //*************check if pollId exixst
    // if (!pollId) {
    //     return Response.json({
    //         message: "Error fetching user pollId",
    //         success: false,
    //         error: "Error fetching user pollId",
    //     });
    // }

    //**************find unique poll with the existing pollId
    // const poll = await prisma.poll.findUnique({
    //     where: {
    //         pollId: Number(pollId.pollId),
    //     },
    //     include: {
    //         questions: true,
    //     },
    // });

    //***********check if there's an existing poll
    // if (poll.length === 0) {
    //     return Response.json({
    //         message: "No poll  found",
    //         error: "No poll found for this Id",
    //         success: false,
    //     });
    // }

    const mockSingleResponsePoll: PollData = {
        id: 1,
        title: "Favorite Footballer",
        description: "A poll about your favorite football player",
        questions: [
            {
                id: 1,
                question: "Who is your favorite football player?",
                type: PollTypes.SINGLE,
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
        author: "shenkz@test.com",
        userId: 123,
        isPublic: true,
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), //7days
        links: [
            {
                pollId: 1,
                slug: "favorite-footballer-1-a2b4c",
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), //2yrs
            },
        ],
    };

    return Response.json({
        message: "Successfully retrieved poll for the user",
        success: true,
        error: null,
        data: mockSingleResponsePoll,
    });
}
