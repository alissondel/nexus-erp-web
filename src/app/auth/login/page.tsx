'use client'

import Image from 'next/image'

import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { APP_ROUTES } from '@/constants/app-routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { AUTHENTICATE } from '@/graphql/login/mutation'
import { useJwtContext } from '@/hooks/useJwtContext'

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

import { FormSchemaLogin, ValidationSchemaLogin } from './schema/login-schema'

export default function Login() {
  const { setToken } = useJwtContext()

  const router = useRouter()
  const { toast } = useToast()

  const [authenticate] = useMutation(AUTHENTICATE, {
    onCompleted(data: any) {
      setToken(data.authenticate.token)
    },
  })

  const form = useForm<ValidationSchemaLogin>({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSubmit(data: ValidationSchemaLogin) {
    await authenticate({
      variables: {
        data: {
          ...data,
        },
      },
    })
      .then(() => {
        toast({
          title: 'Logado com sucesso!',
          description: 'Estamos te redirecionando para fazer o login...',
          className: 'bg-green-500 text-white',
        })

        return router.push(APP_ROUTES.private.dashboard)
      })
      .catch((e) => {
        console.error(e)
        toast({
          variant: 'default',
          title: 'Algo invalido!',
          description: `${e}`,
          className: 'bg-red-500 text-white',
        })
      })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/image/tailwind-logo.svg"
          width={600}
          height={600}
          alt="Imagem de Login"
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-800 dark:text-white">
          Faça login em sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((data) => handleSubmit(data))}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  {formState.errors.email && (
                    <FormMessage className="text-red-500" />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Senha: </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  {formState.errors.password && (
                    <FormMessage className="text-red-500" />
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600
              px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
             focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enviar
            </Button>
          </form>
        </Form>

        <p className="mt-10 text-center text-sm text-zinc-800 dark:text-white">
          Não tenho conta na plataforma?{' '}
          <a
            href={APP_ROUTES.public.register}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Criar nova conta
          </a>
        </p>
      </div>
    </div>
  )
}
