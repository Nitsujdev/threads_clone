"use server";

import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({ text, author, communityId, path }: Params) {

  try {
    await connectToDB();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id },
      });

    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function fetchPosts(page: number, PAGE_SIZE: number) {
    try {
        await connectToDB();

        const skipAmount = (page - 1) * PAGE_SIZE;

        const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(PAGE_SIZE)
            .populate({ path: "author", model: User })
            .populate({ path: "children", model: Thread, populate: { path: "author", model: User, select: "_id name username parentId image" } })

        const totalPosts = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

        const posts = (await postsQuery).map((post: any) => JSON.parse(JSON.stringify(post)));

        const isNext = totalPosts > skipAmount + posts.length;

        return { posts, isNext };
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export async function fetchPostById(id: string) {
    try {
        await connectToDB();
        // populate community
        const post = await Thread.findById(id)
            .populate({ path: "author", model: User, select: "_id id name image" })
            .populate({ path: "children",
                populate: [{ path: "author", model: User, select: "_id id name username parentId image" }, 
                { path: "children", model: Thread, populate: { path: "author", model: User, select: "_id id name username parentId image" } }]
            })
        
        return JSON.parse(JSON.stringify(post));
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string) {
    try {
        await connectToDB();
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) {
            throw new Error("Thread not found");
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        const savedCommentThread = await commentThread.save();

        originalThread.children.push(savedCommentThread._id);

        await originalThread.save();

        revalidatePath(path);
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}
