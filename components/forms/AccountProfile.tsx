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
import { UserValidation } from "@/lib/validations/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}
const AccountProfile = ({ user, btnTitle }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const { pathname } = usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (file) {
        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result;
          fieldChange(imageDataUrl as string);
        };
        fileReader.readAsDataURL(file);
      }
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    className="rounded-full object-contain"
                    priority
                  />
                ) : (
                  <Image
                    src="/icons/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                  />
                )}
              </FormLabel>
              <FormControl className="text-light-200 flex-1 text-base font-semibold">
                <Input
                  type="file"
                  accept="image"
                  placeholder="Upload a Picture"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="text-dark-200 text-base font-semibold">
                Name
              </FormLabel>
              <FormControl className="text-light-200 flex-1 text-base font-semibold">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="text-dark-200 text-base font-semibold">
                Username
              </FormLabel>
              <FormControl className="text-light-200 flex-1 text-base font-semibold">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="text-dark-200 text-base font-semibold">
                Bio
              </FormLabel>
              <FormControl className="text-light-200 flex-1 text-base font-semibold">
                <Textarea
                  rows={8}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{btnTitle}</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
