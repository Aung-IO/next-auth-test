import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
});

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/");
            alert("Logged in");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
