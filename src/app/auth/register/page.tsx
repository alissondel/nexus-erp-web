'use client'

import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { Input, InputPhone, InputPassword } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

// GRAPHQL
import { GET_CITIES } from '@/graphql/register/query'
import { CREATE_USER } from '@/graphql/register/mutation'
import { useQuery, useMutation } from '@apollo/client'

// SCHEMA GRAPHQL
import {
  FormSchemaRegister,
  ValidationSchemaRegister,
} from './schema/register-schema'

// TYPES AND ZOD
import { CityData } from './types/city-type'
import { zodResolver } from '@hookform/resolvers/zod'

// CONSTANTS
import { APP_ROUTES } from '@/constants/app-routes'

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()

  const { data } = useQuery(GET_CITIES, {
    variables: {
      currentPage: 1,
      perPage: 100,
      filters: {
        active: true,
        order: {
          key: 'id',
          value: 'ASC',
        },
      },
    },
  })

  const [createUser] = useMutation(CREATE_USER)

  const form = useForm<ValidationSchemaRegister>({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      cityId: '',
    },
  })

  async function handleSubmit(data: ValidationSchemaRegister) {
    const { cityId, ...rest } = data

    await createUser({
      variables: {
        data: { ...rest, cityId: +cityId },
      },
    })
      .then(() => {
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Estamos te redirecionando para fazer o login...',
          className: 'bg-green-500 text-white',
        })

        return router.push(APP_ROUTES.public.login)
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
    <div className="flex min-h-screen items-center justify-center bg-indigo-900 dark:bg-slate-600">
      <Card className="h-[820px] w-[500px] bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-center text-zinc-800 dark:text-white">
            Criar Nova Conta
          </CardTitle>
          <CardDescription className="text-center text-zinc-800 dark:text-white">
            Já tenho conta na plataforma?{' '}
            <a
              href={APP_ROUTES.public.login}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Fazer acesso agora
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit((data) => handleSubmit(data))}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Nome: </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    {formState.errors.name && (
                      <FormMessage className="text-red-500" />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Numero de telefone: </FormLabel>
                    <FormControl>
                      <InputPhone type="text" {...field} />
                    </FormControl>
                    {formState.errors.phoneNumber && (
                      <FormMessage className="text-red-500" />
                    )}
                  </FormItem>
                )}
              />
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
                      <InputPassword {...field} />
                    </FormControl>
                    {formState.errors.password && (
                      <FormMessage className="text-red-500" />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityId"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona uma cidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-50 text-black">
                        {data?.cities?.items?.map((city: CityData) => {
                          return (
                            <SelectItem
                              value={city.id.toString()}
                              key={city.id}
                            >
                              {city.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    {formState.errors.cityId && (
                      <FormMessage className="text-red-500" />
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500"
              >
                Enviar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
