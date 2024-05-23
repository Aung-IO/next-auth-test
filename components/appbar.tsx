import { auth, signIn, signOut } from "@/auth"


export default async function Appbar() {
    const session = await auth()
    return (
        <div className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">

                <div className="text-xl font-bold">LOGO</div>

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
                        : (<div >
                            <form action={async () => {
                                "use server"
                                await signIn()
                            }}>
                                <button className="hover:text-gray-400" type="submit">Sign In</button>
                            </form>
                        </div>)}

                </div>
            </div>
        </div>

    )
}
