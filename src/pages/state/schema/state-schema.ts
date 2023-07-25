import { z } from 'zod'

export const FormSchemaState = z.object({
  name: z
    .string({
      required_error: 'Nome é requerido!',
    })
    .min(4, {
      message: 'Nome deve ter pelo menos 4 caracteres.',
    }),
  uf: z
    .string({
      required_error: 'Sigla é requerido!',
    })
    .min(2, {
      message: 'Sigla deve ter pelo menos 4 caracteres.',
    }),
})

export type ValidationSchemaState = {
  id?: number
  name: string
  uf: string
}
