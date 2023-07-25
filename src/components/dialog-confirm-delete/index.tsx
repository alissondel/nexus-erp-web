import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ModalProps {
  openModal?: string
  setOpenModal: React.Dispatch<React.SetStateAction<string>>
  onClickYes: () => void
  onClickNo: () => void
}

export function DialogConfirmDelete({
  onClickNo,
  onClickYes,
  setOpenModal,
}: ModalProps) {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(true)
  }, [setOpenModal])

  async function handleClose() {
    await setOpen(false)

    setTimeout(() => {
      setOpenModal('CLOSED')
    }, 1000)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="uppercase text-red-500">
            Você tem certeza que deseja inativar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita, isso irá inativar o item e poderá
            voltar somenta entrando em contato com os adminstradores do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClickNo}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClickYes}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
