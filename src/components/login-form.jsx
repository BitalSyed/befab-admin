import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { API_URL, setCookie } from "./cookieUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
    await fetch(`${API_URL}/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        pass: e.target.password.value,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        toast.error(data.error);
        return;
      }
      else {
        setCookie('skillrextech_auth', data.token, 30);
        navigate('/', {replace: true});
        window.location.reload()
      }
    })
    .catch(error => {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    });
    // Handle login logic here
  };
  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="admin@befab.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" placeholder="************" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Request Access
        </a>
      </div>
    </form>)
  );
}
