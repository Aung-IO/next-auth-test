import { auth, signIn, signOut } from "@/auth"
import Link from "next/link"


export default async function Appbar() {
    const session = await auth()
    return (
        <div className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">

                <Link href={"/"} className="text-xl font-bold">LOGO</Link>

                <div className="flex space-x-4">
                    {session && session.user ?
                        (<div className="flex items-center space-x-2">
                            <p>{session.user.name} | </p>
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button className="hover:text-gray-400" type="submit">Sign Out</button>
                            </form>
                        </div>)
                        : (<div className="flex items-center space-x-2 ">
                            <form action={async () => {
                                "use server"
                                await signIn()
                            }}>
                                <button className="hover:text-gray-400 border-r-2" type="submit">Sign In</button>
                            </form>

                            <Link href={"/auth/register"}>
                                <button className="hover:text-gray-400" type="submit">Register</button>
                            </Link>
                        </div>)}

                </div>
            </div>
        </div>

    )
}
