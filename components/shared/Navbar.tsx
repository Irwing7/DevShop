// import Link from "next/link";
// import React from "react";
// import { ModeToggle } from "./ModeToggle";
// import { Button } from "../ui/button";
// import {
//   RegisterLink,
//   LoginLink,
//   LogoutLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import prisma from "@/lib/db";


// // fetching username for URL
// async function getData(userId: string | undefined): Promise<{ userName: string | null } | null> {
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       userName: true,
//     }
//   })

//   return data;
// }

// const Navbar = async () => {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   return (

    
//     <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
//       <Link
//         href="/"
//         className="flex items-center gap-x-3 text-2xl font-semibold"
//       >
//         DEVMART
//       </Link>

//       <div className="flex items-center gap-4">
//         <ModeToggle />

//         <div><Link href={user ? `/profile/${user.id}` : `/api/auth/login`}>Profile</Link></div>
//         <div><Link href={user ? `/addProject` : `/api/auth/login`}>Add Project</Link></div>

//         <div className="flex items-center gap-4">
//           {user ? (
//             <>
//               <img
//                 src={
//                   user.picture ??
//                   "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
//                 }
//                 alt="avatar of user"
//                 className="rounded-full h-8 w-8"
//               />
//               <LogoutLink>Sign out</LogoutLink>
//             </>
//           ) : (
//             <>
//               <Button variant="secondary" asChild>
//                 <RegisterLink>Sign up</RegisterLink>
//               </Button>
//               <Button asChild>
//                 <LoginLink>Sign in</LoginLink>
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
