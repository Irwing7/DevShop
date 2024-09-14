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
import { CreateProject } from "@/actions";
import { UploadDropzone, UploadButton } from "@/components/shared/Uploadthing";
import { useState } from "react";

const Page = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileUrl, setFileUrl] = useState<null | string>(null);

  console.log("imageUrls", imageUrls);
  return (
    <div className="flex justify-center p-4">
      <form action={CreateProject} className="w-full max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Fill out your project details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter the title"
                  defaultValue={``}
                  name="title"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Enter the price"
                  defaultValue={``}
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
                placeholder="Please provide a product description. What can it do and who can use it? How is it helpful(Any Usecases)? Also, share some technical details on how you built it?"
                defaultValue={""}
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
                  defaultValue={""}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repo Link</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  placeholder="Enter your GitHub repo URL"
                  defaultValue={""}
                  className="w-full"
                />
              </div>

              <UploadDropzone
                className="ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50 ut-label:text-primary ut-button:ut-uploading:bg-red-500/50 ut-button:ut-uploading:after:bg-red-500"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log('Image upload complete', res);
                  const urls = res.map((file) => file.url);
                  setImageUrls(urls);
                }}
                onUploadError={(error: Error) => {
                  console.error('Image upload error', error);
                  alert("Error uploading image");
                }}
              />

              <div className="space-y-2 grid lg:grid-cols-3 grid-cols-2 gap-4">
                {imageUrls.length > 0 &&
                  imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`uploaded image ${index}`} className="h-32" />
                  ))}
                <Input
                  id="previewImageUrl"
                  name="previewImageUrl"
                  placeholder="Upload your project preview images"
                  defaultValue={imageUrls.join(", ") || ""}
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
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              <Label htmlFor="fileUploadUrl" className="text-center">Upload your project here (zip format)</Label>

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
};

export default Page;
