import prisma from "@/lib/db";
import ClientComponent from "@/components/shared/EditProjectForm";
import { unstable_noStore  as noStore} from "next/cache";

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

async function getData(projectId: string) {
  noStore();
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const data = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      liveDemoUrl: true,
      githubUrl: true,
      fileUploadUrl: true,
      previewImageUrl: true,
    },
  });

  if (!data) {
    throw new Error(`Project with ID ${projectId} not found`);
  }

  return data;
}

export default async function Page({ params }: { params: { projectId: string } }) {
  // Log the params.id
  console.log("Project ID:", params.projectId);

  const data: UserProfile | null = await getData(params.projectId);

  if (!data) {
    return <div>Project not found</div>;
  }

  return <ClientComponent initialData={data} />;
}
