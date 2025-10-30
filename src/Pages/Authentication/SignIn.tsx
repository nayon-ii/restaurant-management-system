// src/Pages/Authentication/SignIn.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SEO } from "@/components/seo/SEO";
import { toast } from "sonner";

// Define validation schema
const signInSchema = z.object({
  role: z.string().min(1, "Please select a role"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

// Development mode credentials mapping
const DEV_CREDENTIALS: Record<string, { email: string; password: string }> = {
  admin: {
    email: "admin@example.com",
    password: "admin123",
  },
  manager: {
    email: "manager@example.com",
    password: "manager123",
  },
  chef: {
    email: "chef@example.com",
    password: "chef123",
  },
  cashier: {
    email: "cashier@example.com",
    password: "cashier123",
  },
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, clearError } = useAuth();

  // Check if we're in development mode
  const isDevelopment = import.meta.env.VITE_APP_ENV === "development";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      role: "",
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handler for role change
  const handleRoleChange = (role: string) => {
    console.log("Role changed to:", role);

    if (isDevelopment && role && DEV_CREDENTIALS[role]) {
      const credentials = DEV_CREDENTIALS[role];
      console.log("Auto-filling credentials:", credentials);

      // Set email and password with validation trigger
      setValue("email", credentials.email, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue("password", credentials.password, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      // Show a toast notification in dev mode
      toast.info("🔧 Dev Mode: Credentials Auto-filled", {
        description: `Email: ${credentials.email}\nPassword: ${credentials.password}`,
        duration: 3000,
      });
    }

    return role;
  };

  const onSubmit = async (data: SignInFormData) => {
    // Clear any previous errors
    clearError();

    // Show loading toast
    const loadingToast = toast.loading("Signing in...");

    try {
      // Use Redux-based login
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success("Login successful!", {
        description: `Welcome back, ${data.email}`,
      });

      console.log("Sign in data:", data);

      // Navigate to dashboard based on role
      setTimeout(() => {
        navigate(`/dashboard/${data.role.toLowerCase()}`);
      }, 500);
    } catch (error) {
      console.error("Login error:", error);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast with action button
      toast.error("Login failed", {
        description:
          (error as Error)?.message ||
          "Invalid email or password. Please try again.",
        action: {
          label: "Retry",
          onClick: () => handleSubmit(onSubmit)(),
        },
      });
    }
  };

  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to your restaurant management account"
        noindex={true}
      />
      <div className="min-h-screen flex justify-center items-center bg-background p-4">
        {/* Form Container */}
        <div className="w-full max-w-xl">
          <div className="w-full bg-card rounded-2xl p-6 md:p-10 space-y-6 shadow-lg">
            {/* Logo */}
            <div className="flex items-center justify-center mb-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-20 h-16 object-contain"
              />
            </div>

            {/* Header */}
            <div className="space-y-1 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
              {isDevelopment && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mt-3">
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    🔧 Development Mode Active
                  </p>
                  <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
                    Select a role to auto-fill credentials
                  </p>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
              {/* User Role Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="role"
                  className="text-sm font-medium text-foreground"
                >
                  User Role
                </Label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleRoleChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        id="role"
                        className="w-full h-12! bg-card border-input rounded-md"
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="chef">Chef</SelectItem>
                        <SelectItem value="cashier">Cashier</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-xs text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-card border-input"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 pr-12 bg-card border-input"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="rememberMe"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-normal cursor-pointer text-foreground"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {errors.root && (
                <p className="text-sm text-destructive text-center pt-2">
                  {errors.root.message}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold rounded-md mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
