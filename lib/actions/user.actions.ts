"use server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;    
    image: string;
    path: string;
}

export async function updateUser({
    userId, 
    username, 
    name, 
    bio, 
    image, 
    path
}: Params): Promise<void> {

    await connectToDB();

    try {
        await User.findOneAndUpdate({ id: userId }, {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
        }, {
            upsert: true,
        });

        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {

    try {
        await connectToDB();
        return await User.findOne({ id: userId })
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserThreads(userId: string) {
    try {
        await connectToDB();
        const threads = await User.findOne({ id: userId })
        .populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path: "author",
                    model: User,
                    select: "name image id"
                },
                {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: "name image id", // Select the "name" and "_id" fields from the "User" model
                    },
                },
            ]
          })
          .exec();

          return JSON.parse(JSON.stringify(threads)); 
    } catch (error: any) {
        throw new Error(`Failed to fetch user threads: ${error.message}`);
    }
}

export async function fetchUsers({ 
    userId, 
    searchString = "", 
    pageNumber = 1, 
    PAGE_SIZE = 20, 
    sortBy = "desc" 
}: { 
    userId: string, 
    searchString?: string, 
    pageNumber?: number, 
    PAGE_SIZE?: number, 
    sortBy?: SortOrder 
}) {
    try {
        await connectToDB();
        const skipAmount = (pageNumber - 1) * PAGE_SIZE;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId },
        };

        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ];
        }

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(PAGE_SIZE);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

export async function getActivity(userId: string) {
    try {
        await connectToDB();

        const userThreads = await Thread.find({ author: userId });

        const childThreadIds = userThreads.reduce((acc, userThreads) => {
            return acc.concat(userThreads.children);
        }, []);

        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId },
        }).populate({
            path: "author",
            model: User,
            select: "name image id",
        });

        return replies;
    } catch (error: any) {
        throw new Error(`Failed to fetch activity: ${error.message}`);
    }
}

