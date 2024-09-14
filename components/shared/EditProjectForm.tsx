"use client";

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
import { CreateProject, UpdateProject } from "@/actions";
import { UploadDropzone, UploadButton } from "@/components/shared/Uploadthing";
import { useState } from "react";

// Define a type for the user profile data
type UserProfile = {
  id: string;
  title: string;
  description: string;
  price: number;
  liveDemoUrl?: string | null;
  githubUrl?: string | null;
  fileUploadUrl?: string | null;
  previewImageUrl?: string | null;
};

type ClientComponentProps = {
  initialData: UserProfile;
};

export default function EditProjectForm({ initialData }: ClientComponentProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialData.previewImageUrl || null);
  const [fileUrl, setFileUrl] = useState<string | null>(initialData.fileUploadUrl || null);

  return (
    <div className="flex justify-center p-4">
      <form action={UpdateProject} className="w-full max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Fill out your project details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input id="projectId" defaultValue={initialData.id} name="projectId" type="hidden" />
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter the title"
                  defaultValue={initialData.title}
                  name="title"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Enter the price"
                  defaultValue={initialData.price}
                  name="price"
                  className="w-full"
                  required={true}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project"
                defaultValue={initialData.description}
                className="min-h-[100px] w-full"
              />
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="liveDemoUrl">Live Demo </Label>
                <Input
                  id="liveDemoUrl"
                  name="liveDemoUrl"
                  placeholder="Enter your link of your live project"
                  defaultValue={initialData.liveDemoUrl || ""}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repo Link</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  placeholder="Enter your GitHub repo URL"
                  defaultValue={initialData.githubUrl || ""}
                  className="w-full"
                />
              </div>

              <UploadDropzone
                className="ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50 ut-label:text-primary ut-button:ut-uploading:bg-red-500/50 ut-button:ut-uploading:after:bg-red-500"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  alert("Error");
                }}
              />

              <div className="space-y-2">
                {imageUrl ? <img src={imageUrl} alt="uploaded image" /> : null}
                <Input
                  id="previewImageUrl"
                  name="previewImageUrl"
                  placeholder="Upload your project preview images"
                  defaultValue={imageUrl || ""}
                  className="w-full"
                  type="hidden"
                />
              </div>

              <UploadButton
                endpoint="zipUploader"
                onClientUploadComplete={(res) => {
                  setFileUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />

              <div className="space-y-2">
                <Input
                  id="fileUploadUrl"
                  name="fileUploadUrl"
                  placeholder="Upload your project files in zip format"
                  defaultValue={fileUrl || ""}
                  className="w-full"
                  type="hidden"
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
