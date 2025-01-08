"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";

interface CommentProps {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}

const Comment = ({
  threadId,
  currentUserImage,
  currentUserId,
}: CommentProps) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId, values.thread, currentUserId, pathname);

    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-dark-200/5 flex flex-row items-center gap-3 rounded-xl border p-4"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-row items-center gap-3">
                <FormLabel>
                  <Image
                    src={currentUserImage}
                    alt="current_user"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    {...field}
                    className="no-focus border-none bg-transparent shadow-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>{" "}
    </div>
  );
};

export default Comment;
