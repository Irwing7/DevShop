import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

type SearchParams = {
  data: string;
};

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
      previewImageUrl: true,
      developer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          userName: true,
          bio: true,
          email: true,
          linkedIn: true,
          github: true,
          website: true,
        },
      }
    },
  });

  return data;
}

export default async function Checkout({ searchParams }: { searchParams: SearchParams }) {

  const projectId = searchParams.data;
  // console.log("data=", projectId);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(projectId);

  if (!user) {
    redirect("/api/auth/login?");
  }

  if (!data) {
    return <div className="flex items-center justify-center h-[90vh]">Project not found</div>;
  }

  return (
    <div className="md:grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-12">
      {/* PRODUCT INFO */}
      <div className="bg-background rounded-lg shadow-lg overflow-hidden dark:border-2 dark:border-gray-200 mb-2">
        <img
          src={data?.previewImageUrl?.split(",")[0].trim() || "https://dummyimage.com/720x400"}
          alt="Product Image"
          width={600}
          height={400}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{data?.title}</h2>
          <p className="text-muted-foreground mb-4">{data?.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">₹{data?.price}</span>
          </div>
        </div>
      </div>

      {/* USER INFO */}
      <div className="bg-background rounded-lg shadow-lg p-6 md:p-8 dark:border-2 dark:border-gray-200 mb-2">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              defaultValue={`${user?.given_name} ${user?.family_name}`}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={user?.email || ""}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input id="contact" placeholder="Enter your contact number" required />
          </div>
          <Button size="lg">Place Order</Button>
        </div>
      </div>

      {/* SELLER INFO */}
      <div className="bg-background rounded-lg shadow-lg p-6 md:p-8 col-span-2 dark:border-2 dark:border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold">{`${data?.developer.firstName} ${data?.developer.lastName}`}</h3>
              <p className="text-muted-foreground">Seller</p>
            </div>
            {/* <div>
              <p>123 Main St.</p>
            </div> */}
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold">{data?.developer.userName}</h3>
              <p className="text-muted-foreground">Username</p>
            </div>
            <div>
              <a href={`mailto:${data?.developer.email}`}>{data?.developer.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
