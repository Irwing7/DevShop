import { DeleteProject } from '@/actions';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';

// fetching all projects
async function getData(userId: string) {
  noStore();
  const data = await prisma.project.findMany({
    where: {
      developerId: userId
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

  return data;
}

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    // Redirect to login page or show an error message
    return (
      <div>
        <h1>You need to be logged in to view this page.</h1>
      </div>
    );
  }

  const projects = await getData(user.id);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {projects.map((project) => {
              return (
                <div className="p-4 md:w-1/3" key={project.id}>
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={
                        project.previewImageUrl
                          ? project.previewImageUrl.split(",")[0].trim()
                          : "https://dummyimage.com/720x400"
                      }
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        CATEGORY
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 dark:text-gray-200 mb-3">
                        <Link href={`/projects/${project.id}`}>{project.title}</Link>
                      </h1>
                      <p className="leading-relaxed mb-3 dark:text-gray-400">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between ">
                        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                          Price: ₹{project.price}
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                        <div className='flex gap-4'>
                           <Button asChild><Link href={`/editProject/${project.id}`}>Edit</Link></Button>
                        <Button className='bg-red-600 hover:bg-red-700' variant={'destructive'}>Delete</Button> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
