import Link from "next/link";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  GlobeIcon,
} from "@/components/shared/SocialIcons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Mail, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

async function getData(id: string) {
  noStore();
  const data = await prisma.project.findUnique({
    where: {
      id: id,
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
      developer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          bio: true,
          linkedIn: true,
          github: true,
          website: true,
        },
      },
    },
  });

  return data;
}

export default async function ProjectDetails({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(params.id);

  // Extract the first image URL from the comma-separated list
  const imageUrls =
    data?.previewImageUrl?.split(",").map((url) => url.trim()) || [];
  const coverImage = imageUrls[0] || "https://dummyimage.com/720x400";
  const previewImages = imageUrls.slice(1);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* PROJECT DETAILS */}
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {data?.title}
                </h1>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    Price ₹{data?.price}
                  </span>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {data?.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href={
                    user
                      ? data?.price === 0
                        ? data.fileUploadUrl || "#"
                        : "#"
                      : "/api/auth/login"
                  }
                  className={`inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                    data?.price === 0
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                  }`}
                  prefetch={false}
                >
                  Download Project
                </Link>

                <div className="flex items-center gap-2">
                  {data?.liveDemoUrl && (
                    <Link
                      href={data?.liveDemoUrl || "#"}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <GlobeIcon className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  )}
                  {data?.githubUrl && (
                    <Link
                      href={data?.githubUrl || "#"}
                      className={`inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                        data?.price === 0
                          ? "bg-background hover:bg-accent hover:text-accent-foreground"
                          : "cursor-not-allowed pointer-events-none"
                      }`}
                      prefetch={false}
                    >
                      <GithubIcon className="w-4 h-4 mr-2" />
                      GitHub
                    </Link>
                  )}

                  <Link
                    href={
                      user ? `/checkout?data=${data?.id}` : "/api/auth/login"
                    }
                    // href={user ? data?.price===0 ? data.fileUploadUrl || "#" : "mailto:devmart.team@gmail.com" : "/api/auth/login"}
                    // href={
                    //   "https://wa.me/918448168576?text=I'm%20interested%20in%20a%20project%20at%20devmart"
                    // }
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    <Button>Buy Now</Button>
                  </Link>
                </div>
              </div>

              {/* CONTACT DETAILS */}
              {/* <div className="text-muted-foreground">
                Intereseted in buying this project? <br /> Connect with us on{" "}
                <div className="flex gap-4">
                  <Link href={"mailto:devmart.team@gmail.com"}>
                    <Mail />
                  </Link>{" "}
                  <Link
                    href={
                      "https://wa.me/918448168576?text=I'm%20interested%20in%20a%20project%20at%20devmart"
                    }
                  >
                    <MessageCircleMore />
                  </Link>
                </div>
              </div> */}
              {/* ------------------------------------------------------------------------------------- */}
            </div>
            <Image
              src={coverImage}
              width="600"
              height="600"
              alt="Project Cover"
              className="mx-auto overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ADDITIONAL PREVIEW IMAGES */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {previewImages.map((imageUrl, index) => (
                <button
                  key={index}
                  className="border hover:border-primary rounded-lg overflow-hidden transition-colors"
                >
                  <Image
                    src={imageUrl}
                    alt={`Preview thumbnail ${index + 1}`}
                    height={150}
                    width={150}
                    className="aspect-square object-cover"
                  />
                  <span className="sr-only">View Image {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER INFORMATION */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Developer
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full w-16 h-16 bg-[#55efc4] text-6xl border-[4px] flex items-center justify-center">
                  😁
                </div>
                <div className="grid gap-1">
                  <div className="text-xl font-bold text-foreground">{`${data?.developer.firstName} ${data?.developer.lastName}`}</div>
                  <div className="text-sm">{data?.developer.userName}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`${data?.developer.linkedIn}`}
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <TwitterIcon className="w-6 h-6" />
                </Link>
                <Link
                  href={`${data?.developer.github}`}
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <GithubIcon className="w-6 h-6" />
                </Link>
                <Link
                  href={`${data?.developer.linkedIn}`}
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <LinkedinIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                About the Developer
              </div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                {data?.developer.bio}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
