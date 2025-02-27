import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";
import { unstable_noStore  as noStore} from "next/cache";

export async function GET(){
    noStore();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user==null || !user.id) 
        throw new Error("User not found");

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if(!dbUser){
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                imageUrl: user.picture ?? "",
                userName: generateUsername("-", 3, 15)
            }
        })
    }

    const environment = process.env.NODE_ENV;
    let redirectUrl;

    switch (environment) {
        case 'development':
            redirectUrl = 'http://localhost:3000';
            break;
        case 'test':
            redirectUrl = 'https://devmart-tech.vercel.app';
            break;
        case 'production':
            redirectUrl = 'https://devmart.tech';
            break;
        default:
            redirectUrl = 'https://devmart.tech';
            break;
    }
    return NextResponse.redirect(redirectUrl);
}