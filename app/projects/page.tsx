import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// const createCheckoutUrl = (project) => {
//   const query = new URLSearchParams({
//     id: project.id,
//     title: project.title,
//     description: project.description,
//     price: project.price,
//     liveDemoUrl: project.liveDemoUrl,
//     githubUrl: project.githubUrl,
//     fileUploadUrl: project.fileUploadUrl,
//     previewImageUrl: project.previewImageUrl,
//   }).toString();

//   return `/checkout?${query}`;
// };

// fetching all projects
async function getData() {
  noStore();
  const data = await prisma.project.findMany({
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

  return data;
}

const page = async () => {
  const projects = await getData();

  if(projects.length === 0) {
    return(
      <div className="flex flex-col h-[80vh]">
      <div className="flex-1 flex items-center justify-center">
        No projects found
      </div>
    </div>
    )
  }

  return (
    <div>


      <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out dark:border dark:border-white"
          >
            <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src={
                project.previewImageUrl
                  ? project.previewImageUrl.split(",")[0].trim()
                  : "https://dummyimage.com/720x400"
              }
              alt={project.title}
              width={400}
              height={300}
              className="object-cover w-full h-60"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold md:text-xl">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">
  {project.description.length > 100 
    ? `${project.description.slice(0, 80)}...` 
    : project.description}
</p>
              <div className="flex items-center justify-between mt-4">
                <h4 className="text-base font-semibold md:text-lg">
                ₹{project.price}
                </h4>
                {/* <Link href={`/projects/`}> */}
                  <Button size={"sm"}>Buy Now</Button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
