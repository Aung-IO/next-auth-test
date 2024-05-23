import { zodResolver } from "@hookform/resolvers/zod";
import { hash } from "bcryptjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: any) => {
        console.log(data);

        try {
            const hashedPassword = await hash(data.password, 10);
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, password: hashedPassword }),
            });


            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
            } else {
                router.push("/auth/login");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input {...register("name")} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
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
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
