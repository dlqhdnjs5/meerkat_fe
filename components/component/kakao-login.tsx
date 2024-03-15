/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4aq9fefL1nD
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function KakaoLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center">Please sign in to continue.</p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </div>
        <Separator className="my-8" />
        <div className="space-y-4">
          <Button className="w-full bg-yellow-300 text-black" variant="outline">
            Sign in with Kakao
          </Button>
        </div>
      </div>
    </div>
  )
}