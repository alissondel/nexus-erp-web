import { z } from 'zod'

export const FormSchemaLogin = z.object({
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
})

export type ValidationSchemaLogin = {
  email: string
  password: string
}
