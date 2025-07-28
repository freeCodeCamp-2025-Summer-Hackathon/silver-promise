import { UserWithPassword } from "@/lib/types/User";
import UserModel from "../models/User";

export class UserRepository {
    static async findByEmailOrUsername(
        identifier: string
    ): Promise<UserWithPassword | null> {
        return (
            (await UserModel.findOne({
                $or: [{ email: identifier }, { username: identifier }],
            })) || null
        );
    }

    static async findByEmail(email: string): Promise<UserWithPassword | null> {
        if (!email) {
            return null;
        }

        return (await UserModel.findOne({ email })) || null;
    }

    static async findByUsername(
        username: string
    ): Promise<UserWithPassword | null> {
        if (!username) {
            return null;
        }

        return (await UserModel.findOne({ username })) || null;
    }

    static async create(userData: {
        username: string;
        email: string;
        country: string;
        passwordHash: string;
    }): Promise<UserWithPassword | null> {
        const id = (await UserModel.countDocuments()) + 1; // Simple ID generation
        const newUser = new UserModel({ ...userData, id });
        await newUser.save();
        return newUser.toObject() as UserWithPassword;
    }
}
