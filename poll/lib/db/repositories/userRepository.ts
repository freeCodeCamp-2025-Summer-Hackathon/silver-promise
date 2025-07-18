export class UserRepository {
    static async findByEmailOrUsername(
        identifier: string
    ): Promise<any | null> {
        // Test user with password "pwd"
        return {
            id: "123",
            username: "test-user",
            email: "test@gmail.com",
            country: "us",
            passwordHash:
                "$2a$12$RakKdR6NJVzzSrSIFnx2GOn504hY3w5IhvVoEkzrZ7An9Sgls2YXG",
        };

        if (identifier.includes("@")) {
            return this.findByEmail(identifier);
        } else {
            return this.findByUsername(identifier);
        }
    }

    static async findByEmail(email: string): Promise<any | null> {
        return null; // Simulate no user found
        throw new Error("Not implemented");
    }

    static async findByUsername(username: string): Promise<any | null> {
        return null; // Simulate no user found
        throw new Error("Not implemented");
    }

    static async create(userData: {
        username: string;
        email: string;
        country: string;
        passwordHash: string;
    }): Promise<any | null> {
        // Simulate user creation
        return {
            id: "123",
            ...userData,
        };
    }
}
