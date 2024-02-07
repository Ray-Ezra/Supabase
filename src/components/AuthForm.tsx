import { FormData } from "@/app/login/page";
import Link from "next/link";
import { ChangeEvent } from "react";

type AuthFormProps = {
    formData: FormData
    handleFormData: (e: ChangeEvent<HTMLInputElement>) => void
    success: string,
    error: string,
    loading: boolean,
    authAction: () => Promise<void>
    authText: "Log in" | "Sign up"
}

export default function AuthForm({handleFormData, success, error, loading, authAction, formData, authText}: AuthFormProps){
    return (
        <div className=" bg-black py-8 px-4 flex justify-center items-center min-h-screen relative">
            {loading && ( // Overlay with loading animation
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            )}
            <div className="dark:bg-gray-700 shadow-lg rounded-lg p-6"> {/* Container with dark background */}
                <div className="container mx-auto w-[400px] grid gap-4">
                    <div className="grid">
                        <label className="text-white">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormData(e)}
                            className="text-black bg-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="grid">
                        <label className="text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormData(e)}
                            className="text-black bg-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="flex justify-center items-center flex-col"> {/* Centering the buttons and link */}
                        <button
                            className="px-4 py-2 bg-blue-500 rounded cursor-pointer text-white hover:bg-blue-600"
                            onClick={() => authAction()}
                            disabled={loading}
                        >
                            {authText}
                        </button>

                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <Link href={authText === "Log in" ? "/signup" : "/login"} className="hover:underline text-blue-300 mt-4">
                            {authText === "Log in" ? "Sign up" : "Log in"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
