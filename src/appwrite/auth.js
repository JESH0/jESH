import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.AppriteUrl)             // Keep using your spelling: AppriteUrl
            .setProject(conf.AppriteProjectId);       // Keep using your spelling: AppriteProjectId
        this.account = new Account(this.client);
    }

    // Create user account and log in
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Auto login after account creation
                return this.login({ email, password });
            } else {
                return null;  // Better to return null than the raw response
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    // Login with email and password
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    // Get current authenticated user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            return null;
        }
    }

    // Logout current session
    async logout() {
        try {
            await this.account.deleteSessions(); // Deletes all sessions
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

// Export a singleton instance
const authService = new AuthService();
export default authService;
