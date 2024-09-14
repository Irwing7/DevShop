/**
 * v0 by Vercel.
 * @see https://v0.dev/t/226MnasiZY4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UpdateProfile from "@/actions";
import { unstable_noStore  as noStore} from "next/cache";

// Define a type for the user profile data
type UserProfile = {
  firstName?: string;
  lastName?: string;
  userName: string | null;
  bio?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  website?: string | null;
};

// Fetch the user profile data
async function getData(userId: string | undefined): Promise<UserProfile | null> {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      userName: true,
      bio: true,
      linkedIn: true,
      github: true,
      website: true,
    },
  });
  return data;
}

export default async function Component() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);

  if (!user) {
    return <div>You need to be logged in to access this page</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <form action={UpdateProfile} className="w-full max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  defaultValue={`${user?.given_name} ${user?.family_name}`}
                  disabled
                  name="name"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={user?.email ?? ""}
                  disabled
                  name="email"
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                defaultValue={data?.userName ?? ""}
                name="username"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Enter your bio"
                defaultValue={data?.bio ?? ""}
                className="min-h-[100px] w-full"
              />
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  placeholder="Enter your LinkedIn profile URL"
                  defaultValue={data?.linkedIn ?? ""}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  placeholder="Enter your GitHub profile URL"
                  defaultValue={data?.github ?? ""}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="Enter your website URL"
                  defaultValue={data?.website ?? ""}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
