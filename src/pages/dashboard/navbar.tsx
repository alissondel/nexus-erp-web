'use client'

import * as React from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useJwtContext } from '@/hooks/useJwtContext'

import { decryptToken } from '@/function'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Sun, Moon, Bell } from 'lucide-react'

export default function Navbar() {
  const { setTheme } = useTheme()

  const router = useRouter()
  const { logout } = useJwtContext()

  const tokenStored = Cookies.get('accessToken')
  const userStored: any = decryptToken(tokenStored)

  function handleLogout() {
    logout()
    router.push('/auth/login')
  }

  return (
    <div
      className="flex flex-row items-center justify-end border-b-[1px] bg-white
        px-6 py-4 dark:bg-zinc-800 md:px-16 "
    >
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="hover:text-blue-500" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className=" hover:text-blue-500"
            >
              <Sun
                className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100
              transition-all dark:-rotate-90 dark:scale-0"
              />
              <Moon
                className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0
              transition-all dark:rotate-0 dark:scale-100"
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarImage
                  src="https://github.com/alissondel.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  <Image
                    src="/image/user-avatar.png"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                  />
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>
              <b>Bem vindo, {userStored?.name}!</b>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:text-blue-500">
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer hover:text-blue-500"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
