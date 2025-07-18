import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "@/lib/db/repositories/userRepository";

/**
 * Service class for handling authentication-related operations.
 */
export class AuthService {
    /**
     * Validates user login credentials.
     *
     * @param userIdentifier - The user's email or username.
     * @param password - The user's password.
     * @returns An object indicating success or failure, a message, and if successful, user data and a JWT token.
     */
    static async validateLogin(userIdentifier: string, password: string) {
        const user = await UserRepository.findByEmailOrUsername(userIdentifier);

        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isValidPassword) {
            return {
                success: false,
                message: "Invalid password",
            };
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "2d" }
        );

        return {
            success: true,
            message: "User found",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                country: user.country,
            },
            token,
        };
    }

    /**
     * Registers a new user with the provided username, email, country, and password.
     *
     * This method checks for existing users by email and username to prevent duplicates.
     * If the email or username is already in use, it returns a failure response with an appropriate message.
     * Otherwise, it hashes the password, creates a new user record, and returns a success response with the user's details.
     *
     * @param username - The desired username for the new user.
     * @param email - The email address for the new user.
     * @param country - The country of the new user.
     * @param password - The plaintext password to be hashed and stored.
     * @returns An object indicating success or failure, a message, and (on success) the registered user's details.
     */
    static async registerUser(
        username: string,
        email: string,
        country: string,
        password: string
    ) {
        let existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return {
                success: false,
                message: "Email already in use",
            };
        }

        existingUser = await UserRepository.findByUsername(username);
        if (existingUser) {
            return {
                success: false,
                message: "Username already in use",
            };
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await UserRepository.create({
            username,
            email,
            country,
            passwordHash,
        });

        if (!newUser) {
            return {
                success: false,
                message: "Failed to create user",
            };
        }

        return {
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                country: newUser.country,
            },
        };
    }

    /**
     * Verifies a JWT token.
     *
     * @param token - The JWT token to verify.
     * @returns The decoded token payload if valid, otherwise `null`.
     */
    static verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET!) as {
                userId: string;
                username: string;
                email: string;
                country?: string;
                iat: number;
                exp: number;
            };
        } catch {
            return null;
        }
    }
    /**
     * Retrieves the current user based on a JWT token.
     *
     * @param token - The JWT token.
     * @returns The user object if the token is valid, otherwise `null`.
     */
    static async getCurrentUser(token: string) {
        const decoded = this.verifyToken(token);

        if (!decoded) {
            return null;
        }

        return {
            id: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            country: decoded.country,
        };
    }
}
