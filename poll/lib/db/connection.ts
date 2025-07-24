// Mongoose connection as singleton
import mongoose from "mongoose";
import Poll from "./models/Poll";
let isConnected = false;

export const connectToMongo = async () => {
    if (isConnected) {
        console.info("MongoDB is already connected");
        return;
    }

    try {
        const mongoSrv = process.env.MONGO_SRV;
        if (!mongoSrv) {
            throw new Error("MONGO_SRV environment variable is not defined");
        }
        await mongoose.connect(mongoSrv, {});
        isConnected = true;
        console.info("MongoDB connected successfully");

        import("./models/User");
        import("./models/Poll");
        console.info("Mongoose models loaded successfully");


        const testPolls = [
            {
                id: 1,
                title: "Favorite Programming Language",
                question: "What is your favorite programming language?",
                options: [
                    { text: "JavaScript", votes: 15 },
                    { text: "Python", votes: 12 },
                    { text: "TypeScript", votes: 8 },
                    { text: "Java", votes: 5 }
                ],
                authorId: 1, // User ID 1
                pollLinks: ["poll-programming-lang-2025"]
            },
            {
                id: 2,
                title: "Best Framework",
                question: "Which web framework do you prefer?",
                options: [
                    { text: "React", votes: 20 },
                    { text: "Vue", votes: 10 },
                    { text: "Angular", votes: 7 },
                    { text: "Svelte", votes: 3 }
                ],
                authorId: 1, // User ID 1
                pollLinks: ["poll-best-framework-2025"]
            },
            {
                id: 3,
                title: "Coffee or Tea",
                question: "What's your preferred drink?",
                options: [
                    { text: "Coffee", votes: 25 },
                    { text: "Tea", votes: 18 }
                ],
                authorId: 2, // User ID 2
                pollLinks: ["poll-coffee-tea-2025"]
            },
            {
                id: 4,
                title: "Work Schedule",
                question: "What's your ideal work schedule?",
                options: [
                    { text: "9-5 Traditional", votes: 8 },
                    { text: "Flexible Hours", votes: 22 },
                    { text: "4-Day Week", votes: 15 },
                    { text: "Remote Only", votes: 11 }
                ],
                authorId: 1, // User ID 1
                pollLinks: ["poll-work-schedule-2025"]
            }
        ];

        await Poll.deleteMany({}); // Clear existing polls
        console.info("Existing polls cleared");
        const createdPolls = await Poll.insertMany(testPolls);
        console.log(`${createdPolls.length} test polls created successfully`);
        return createdPolls;

    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};
