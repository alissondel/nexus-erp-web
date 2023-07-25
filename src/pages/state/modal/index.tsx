'use client'

import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { StateData } from '../types/state-type'
import { EnumModal } from '../enum/enum-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchemaState, ValidationSchemaState } from '../schema/state-schema'

// Graphql
import { GET_STATES } from '@/graphql/state/query'
import { CREATE_STATE, UPDATE_STATE } from '@/graphql/state/mutation'

interface ModalStateProps {
  state?: StateData | null
  openModal?: string
  setOpenModal?: React.Dispatch<React.SetStateAction<string>>
}

export function ModalState({ state, setOpenModal }: ModalStateProps) {
  const { toast } = useToast()

  const [formValues] = useState({
    name: state?.name ? state?.name : '',
    uf: state?.uf ? state?.uf : '',
  })
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<ValidationSchemaState>({
    resolver: zodResolver(FormSchemaState),
    defaultValues: {
      name: formValues.name,
      uf: formValues.uf,
    },
  })

  useEffect(() => {
    setOpen(true)
  }, [setOpenModal])

  const [createState] = useMutation(CREATE_STATE, {
    refetchQueries: [
      {
        query: GET_STATES,
        fetchPolicy: 'network-only',
      },
    ],
  })

  const [updateState] = useMutation(UPDATE_STATE, {
    refetchQueries: [
      {
        query: GET_STATES,
        fetchPolicy: 'network-only',
      },
    ],
  })

  async function handleSubmit(data: ValidationSchemaState) {
    if (state) return update(data)
    else return create(data)
  }

  async function create(data: ValidationSchemaState) {
    await createState({
      variables: {
        data: {
          ...data,
        },
      },
    })
      .then(() => {
        toast({
          title: 'Estado criado com sucesso!',
          className: 'bg-green-500 text-white',
        })

        handleClose()
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

  async function update(data: ValidationSchemaState) {
    await updateState({
      variables: {
        id: state?.id,
        data: {
          ...data,
        },
      },
    })
      .then(() => {
        toast({
          title: 'Estado atualizado com sucesso!',
          className: 'bg-green-500 text-white',
        })

        handleClose()
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

  async function handleClose() {
    await setOpen(false)

    setTimeout(() => {
      // @ts-ignore
      setOpenModal(EnumModal.Closed)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {state ? 'Editar Estado' : 'Cadastrar Estado'}
          </DialogTitle>
        </DialogHeader>
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
              name="uf"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Sigla: </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  {formState.errors.uf && (
                    <FormMessage className="text-red-500" />
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded bg-indigo-600
                  px-4 py-2 font-bold text-white hover:bg-indigo-500"
            >
              Enviar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
