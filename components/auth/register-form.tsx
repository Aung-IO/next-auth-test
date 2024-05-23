"use client"

import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



export default function Register() {
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        console.log(data);
        try {
            localStorage.setItem("user", JSON.stringify(data));
            alert("User registered");
        } catch (error: any) {
            setError(error.message);
        }

        // try {
        //     const res = await fetch("/api/auth/register", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data),
        //     });

        //     const result = await res.json();
        //     if (!res.ok) {
        //         throw new Error(result.message);
        //     }

        //     // Handle successful registration (e.g., redirect to login page)
        //     console.log("User registered:", result.user);
        // } catch (error: any) {
        //     setError(error.message);
        // }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
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
