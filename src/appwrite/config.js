import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.AppriteUrl).setProject(conf.AppriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

  async createPost({ title, content, featuredimage, status, userid }) {
    if (!userid) {
        throw new Error("userid is required to create a post.");
    }
    try {
        return await this.databases.createDocument(
            conf.AppriteDatabaseId,
            conf.AppriteCollectionId,
            ID.unique(),
            { title, content, featuredimage, status, userid }
        );
    } catch (error) {
        console.error("createPost error", error.message);
        return false;
    }
}


    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.AppriteDatabaseId,
                conf.AppriteCollectionId,
                slug,
                { title, content, featuredimage, status }
            );
        } catch (error) {
            console.error("updatePost error", error.message);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.AppriteDatabaseId, conf.AppriteCollectionId, slug);
            return true;
        } catch (error) {
            console.error("deletePost error", error.message);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.AppriteDatabaseId, conf.AppriteCollectionId, slug);
        } catch (error) {
            console.error("getPost error", error.message);
            return false;
        }
    }

  async getPosts(userid) {
    try {
        // Base queries: order posts by creation date descending
        const queries = [Query.orderDesc("$createdAt")];

        // Add userid filter only if userid is provided and truthy
        if (userid) {
            queries.unshift(Query.equal("userid", userid));
        } else {
            // If you want only active posts when userid is not specified,
            // you can add status filter instead
            queries.unshift(Query.equal("status", "active"));
        }

        return await this.databases.listDocuments(
            conf.AppriteDatabaseId,
            conf.AppriteCollectionId,
            queries
        );
    } catch (error) {
        console.error("getPosts error", error.message);
        return false;
    }
}

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.AppriteBucketId, ID.unique(), file);
        } catch (error) {
            console.error("uploadFile error", error.message);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.AppriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("deleteFile error", error.message);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.AppriteBucketId, fileId).href;
        } catch (error) {
            console.error("getFilePreview error", error.message);
            return '';
        }
    }

    getFileView(fileId) {
        try {
            return this.bucket.getFileView(conf.AppriteBucketId, fileId);
        } catch (error) {
            console.error("getFileView error", error.message);
            return '';
        }
    }
}

const service = new Service();
export default service;
