'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { EnumModal } from '../enum/enum-modal'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import { Pencil, Trash } from 'lucide-react'
import { useMutation, useQuery } from '@apollo/client'
import { QueryState, StateData } from '../types/state-type'
import { GET_STATES } from '@/graphql/state/query'
import { DELETE_STATE } from '@/graphql/state/mutation'
import { useToast } from '@/components/ui/use-toast'
import { ModalState } from '../modal'
import { DialogConfirmDelete } from '@/components/dialog-confirm-delete'

export default function TableState() {
  const { toast } = useToast()

  const [idSelected, setIdSelected] = useState<number | null>(null)
  const [stateData, setStateData] = useState<StateData | null>(null)
  const [openModal, setOpenModal] = useState<string>(EnumModal.Closed)

  const [filters] = useState({
    id: undefined,
    name: undefined,
    uf: undefined,
    active: true,
    order: {
      key: 'id',
      value: 'desc',
    },
  })

  const [pagination] = useState({
    page: 0,
    lastPage: 0,
    rowsPerPage: 10,
    count: 0,
  })

  const { data, loading, error } = useQuery<QueryState>(GET_STATES, {
    variables: {
      filters,
      perPage: pagination.rowsPerPage,
      currentPage: pagination.page + 1,
    },
    fetchPolicy: 'network-only',
  })

  const [del] = useMutation(DELETE_STATE, {
    refetchQueries: [
      {
        query: GET_STATES,
        fetchPolicy: 'network-only',
      },
    ],
  })

  // useEffect(() => {
  //   if (
  //     data?.states?.pagination?.count &&
  //     data?.states?.pagination?.pagesCount !== null
  //   ) {
  //     setPagination({
  //       ...pagination,
  //       count: data?.states?.pagination?.count,
  //       pagesCount: data?.states?.pagination?.pagesCount,
  //     })
  //   }
  // }, [data])

  // const handlePageChange = (newPage: any) => {
  //   setPagination({
  //     ...pagination,
  //     page: newPage,
  //   })
  // }

  // const handleRowsPerPageChange = (event: any) => {
  //   setPagination({
  //     ...pagination,
  //     page: event.target.value == 25 ? 0 : pagination.page,
  //     rowsPerPage: parseInt(event.target.value, 10),
  //   })
  // }

  async function edit(data: StateData) {
    await setStateData(data)
    setOpenModal(EnumModal.Update)
  }

  function deleteSelected() {
    del({
      variables: {
        id: idSelected,
      },
      fetchPolicy: 'network-only',
    })
      .then(() => {
        closeModalDelete()

        toast({
          title: 'Estado deletado com sucesso!',
          className: 'bg-green-500 text-white',
        })
      })
      .catch((e) => {
        closeModalDelete()

        console.error(e)
        toast({
          variant: 'default',
          title: 'Algo invalido!',
          description: `${e}`,
          className: 'bg-red-500 text-white',
        })
      })
  }

  function openModalDelete(data: StateData) {
    setOpenModal(EnumModal.Delete)
    setIdSelected(data.id)
  }

  function closeModalDelete() {
    setOpenModal(EnumModal.Closed)
  }

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error....</p>

  return (
    <>
      <div className="flex px-4 py-4 pl-28">
        <Card className="min-h-full min-w-full overflow-x-scroll">
          <CardHeader className="flex flex-row flex-wrap justify-between">
            <CardTitle className="flex text-2xl font-bold">Estados</CardTitle>
            <CardDescription>
              <Button
                onClick={() => setOpenModal(EnumModal.Create)}
                className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
              >
                Cadastrar Estado
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Table>
                  <TableCaption>Pagination</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Código</TableHead>
                      <TableHead className="text-left">Nome</TableHead>
                      <TableHead className="text-left">Sigla</TableHead>
                      <TableHead className="text-left">Situação</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.states?.items?.map((state) => (
                      <TableRow key={state.id}>
                        <TableCell className="text-left font-medium">
                          {state.id}
                        </TableCell>
                        <TableCell className="text-left font-medium">
                          {state.name}
                        </TableCell>
                        <TableCell className="text-left font-medium">
                          {state.uf}
                        </TableCell>
                        <TableCell className="text-left font-medium">
                          {state.active === true ? (
                            <Badge className="bg-blue-500 hover:bg-blue-500">
                              Ativo
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500 hover:bg-red-500">
                              Inativo
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="flex flex-row items-center justify-end gap-1">
                          <Pencil
                            color="#3b82f6"
                            className="cursor-pointer"
                            onClick={() => edit(state)}
                          />
                          <Trash
                            color="#ef4444"
                            className="cursor-pointer"
                            onClick={() => openModalDelete(state)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {openModal === EnumModal.Create && (
        <ModalState openModal={openModal} setOpenModal={setOpenModal} />
      )}

      {openModal === EnumModal.Update && (
        <ModalState
          state={stateData}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}

      {openModal === EnumModal.Delete && (
        <DialogConfirmDelete
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClickYes={deleteSelected}
          onClickNo={closeModalDelete}
        />
      )}
    </>
  )
}
