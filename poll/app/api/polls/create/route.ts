import { PollData } from "@/lib/types/PollTypes";
import { error } from "console";

export async function POST(request: Request) {
    const pollFormData: PollData = await request.json();

    const { userId, isPublic } = pollFormData;

    //*******check if user exists on db using********//

    // const existingUser = await prisma.user.findUnique({
    //     where: {
    //         id: userId,
    //     },
    // });

    // if (!existingUser) {
    //     return Response.json({
    //         message: "internal server error",
    //         error: "No user found",
    //         success: false,
    //     });
    // }

    //***************create new poll*************//
    // const newPoll: PollData = await prisma.poll.create({
    //     data: {},
    // });

    return Response.json({});
}
