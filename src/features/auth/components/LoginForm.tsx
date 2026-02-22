import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../context/AuthContext";
import { useLogin, loginSchema } from "../api/use-login";
import type { LoginFormValues } from "../api/use-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useLogin({
        mutationConfig: {
            onSuccess: (data) => {
                login(data.token);
                navigate(from, { replace: true });
            },
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        loginMutation.mutate(values);
    };

    return (
        <Card className="w-full max-w-md">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loginMutation.isError && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{loginMutation.error instanceof Error ? loginMutation.error.message : "Failed to login"}</span>
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Username</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Enter your username"
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...form.register("password")}
                        />
                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="pt-6">
                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
