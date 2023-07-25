import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex h-screen flex-row items-center justify-center">
      <Button
        type="submit"
        className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500"
      >
        <a href="/auth/login">Login</a>
      </Button>
      &emsp;&emsp;
      <Button
        type="submit"
        className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-500"
      >
        <a href="/auth/register">Register</a>
      </Button>
    </div>
  )
}
