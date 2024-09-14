"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateProfile(formdata: FormData) {
  // VERYIFYING USER
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  // EXTRACTING FORM DATA
  const username = formdata.get("username") as string;
  const bio = formdata.get("bio") as string;
  const linkedin = formdata.get("linkedin") as string;
  const github = formdata.get("github") as string;
  const website = formdata.get("website") as string;

  // UPDATING THE DATABASE WITH NEW VALUES
  await prisma.user.update({
    where: { id: user?.id },
    data: {
      userName: username,
      bio,
      linkedIn: linkedin,
      github,
      website,
    },
  });
  revalidatePath(`/profile`);
  redirect(`/profile`);
}

//  CREATING A NEW PROJECT
export async function CreateProject(formdata: FormData) {
  // VERYIFYING USER
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  // EXTRACTING FORM DATA
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const price = parseInt(formdata.get("price") as string);
  const liveDemoUrl = formdata.get("liveDemoUrl") as string;
  const githubUrl = formdata.get("githubUrl") as string;
  const fileUploadUrl = formdata.get("fileUploadUrl") as string | null;
  const previewImageUrl = formdata.get("previewImageUrl") as string | null;

  // CREATING A NEW PROJECT
  await prisma.project.create({
    data: {
      title,
      description,
      price,
      liveDemoUrl,
      githubUrl,
      fileUploadUrl: fileUploadUrl || null, // Ensure fileUploadUrl is nullable
      previewImageUrl: previewImageUrl || null, // Ensure previewImageUrl is nullable

      // Connect the project to the current user (developer)
      developer: { connect: { id: user?.id } },
    },
  });
  revalidatePath(`/addProject`);
  redirect(`/projects`);
}

//  UPDATING A PROJECT
export async function UpdateProject(formdata: FormData) {
  // VERYIFYING USER
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  // EXTRACTING FORM DATA
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const price = parseInt(formdata.get("price") as string);
  const liveDemoUrl = formdata.get("liveDemoUrl") as string;
  const githubUrl = formdata.get("githubUrl") as string;
  const fileUploadUrl = formdata.get("fileUploadUrl") as string | null;
  const previewImageUrl = formdata.get("previewImageUrl") as string | null;
  const projectId = formdata.get("projectId") as string;

  // Check if projectId is null or undefined
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  // UPDATING THE PROJECT
  await prisma.project.update({
    where: { id: projectId },
    data: {
      title,
      description,
      price,
      liveDemoUrl,
      githubUrl,
      fileUploadUrl: fileUploadUrl || null, // Ensure fileUploadUrl is nullable
      previewImageUrl: previewImageUrl || null, // Ensure previewImageUrl is nullable
    },
  });
  revalidatePath(`/project/${projectId}`);
  redirect(`/projects/${projectId}`);
}

//  DELETING A PROJECT
export async function DeleteProject(projectId: string) {
  // VERYIFYING USER
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  // DELETING THE PROJECT
  await prisma.project.delete({
    where: { id: projectId },
  });
  revalidatePath(`/myProjects`);
  redirect(`/myProjects`);
}

// GETTING USER PROFILE
export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      userName: true,
      bio: true,
      linkedIn: true,
      github: true,
      website: true,
    },
  });

  return user;
}
