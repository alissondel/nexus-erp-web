import { z } from 'zod'

export const FormSchemaRegister = z.object({
  name: z
    .string({
      required_error: 'Nome é requerido!',
    })
    .min(3, {
      message: 'Nome deve ter pelo menos 3 caracteres.',
    }),
  phoneNumber: z
    .string({
      required_error: 'Numero de telefone é requerido!',
    })
    .min(14, {
      message: 'Numero de telefone invalido!.',
    }),
  email: z
    .string({
      required_error: 'Email é requerido!',
    })
    .email({
      message: 'Email Invalido!',
    }),
  password: z
    .string({
      required_error: 'Senha é requerido!',
    })
    .min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres.',
    }),
  cityId: z
    .string({
      required_error: 'Senha é requerido!',
    })
    .min(1, {
      message: 'Selecionar pelo menos uma cidade',
    }),
})

export type ValidationSchemaRegister = {
  name: string
  phoneNumber: string
  email: string
  password: string
  cityId: string
}
