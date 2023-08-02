'use client'

import { APP_ROUTES } from '@/constants/app-routes'
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  CircleDollarSign,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingBag,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true)

  const [menuVenda, setMenuVenda] = useState<boolean>(false)
  const [menuFinanceiro, setMenuFinanceiro] = useState<boolean>(false)
  const [menuEstoque, setMenuEstoque] = useState<boolean>(false)
  const [menuConfiguracao, setMenuConfiguracao] = useState<boolean>(false)

  return (
    <div className="fixed float-left flex">
      <div
        className={`relative h-screen bg-blue-800 p-5 pt-8 duration-300 dark:bg-zinc-800
        ${open ? 'w-72' : 'w-20'}  `}
      >
        <ArrowLeft
          className={`absolute -right-3 top-9 cursor-pointer rounded-full
          border-dark-purple bg-white text-3xl text-dark-purple
            ${!open && 'rotate-180'}
          `}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex" title="Nexus ERP">
          <ShoppingBag
            size={!open ? 40 : 25}
            className="float-left ml-2 mr-2 mt-1.5 block cursor-pointer rounded text-white"
          />
          <h1
            className={`origin-left text-2xl font-medium text-white duration-75 ${
              !open && 'scale-0'
            }`}
          >
            Nexus ERP
          </h1>
        </div>
        <div
          className={`mt-6 flex items-center rounded-md bg-zinc-200 py-2 dark:bg-light-white ${
            !open ? 'px-2.5' : 'px-4'
          }`}
        >
          <Search
            className={`float-left block cursor-pointer text-lg text-black ${
              open && 'mr-2'
            }`}
          />
          <input
            type="search"
            placeholder="Pesquisar... "
            className={`w-full cursor-pointer bg-transparent text-base text-black focus:outline-none dark:text-white ${
              !open && 'hidden'
            }`}
          />
        </div>
        <ul className="pt-2">
          <li
            className={`mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-zinc-500`}
            title="Dashboard"
          >
            <span className="float-left block text-2xl text-white">
              <LayoutDashboard />
            </span>
            <span
              className={`flex-1 text-base font-medium text-white duration-200 ${
                !open && 'hidden'
              }`}
            >
              Dashboard
            </span>
          </li>
          <li
            className={`mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-zinc-500`}
            title="Em Breve"
          >
            <span className="float-left block text-2xl text-white">
              <AlertTriangle />
            </span>
            <span
              className={`flex-1 text-base font-medium text-white duration-200 ${
                !open && 'hidden'
              }`}
            >
              Em Breve
            </span>
          </li>
          <li
            className={`mt-9 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-white hover:bg-zinc-500`}
            title="Vendas"
          >
            <span className="float-left block text-2xl text-white">
              <UserPlus />
            </span>
            <span
              className={`flex-1 text-base font-medium text-white duration-200 ${
                !open && 'hidden'
              }`}
            >
              Vendas
            </span>
            <ChevronDown
              className={`${menuVenda && 'rotate-180'}`}
              onClick={() => setMenuVenda(!menuVenda)}
            />
          </li>
          {menuVenda && open && (
            <ul>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Pedido de Venda</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Cancelar Venda</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Finalizar Venda</Link>
              </li>
            </ul>
          )}
          <li
            className={`mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-white hover:bg-zinc-500`}
            title="Financeiro"
          >
            <span className="float-left block text-2xl">
              <CircleDollarSign />
            </span>
            <span
              className={`flex-1 text-base font-medium duration-200 ${
                !open && 'hidden'
              }`}
            >
              Financeiro
            </span>
            <ChevronDown
              className={`${menuFinanceiro && 'rotate-180'}`}
              onClick={() => setMenuFinanceiro(!menuFinanceiro)}
            />
          </li>
          {menuFinanceiro && open && (
            <ul>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Abertura do Caixa
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Fechamento do Caixa
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Contas à Pagar</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Contas à Receber
                </Link>
              </li>
            </ul>
          )}
          <li
            className={`mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-white hover:bg-zinc-500`}
            title="Estoque"
          >
            <span className="float-left block text-2xl">
              <Package />
            </span>
            <span
              className={`flex-1 text-base font-medium duration-200 ${
                !open && 'hidden'
              }`}
            >
              Estoque
            </span>
            <ChevronDown
              className={`${menuEstoque && 'rotate-180'}`}
              onClick={() => setMenuEstoque(!menuEstoque)}
            />
          </li>
          {menuEstoque && open && (
            <ul>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.brand}>Cadastro de Marca</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Cadastro de Grupo
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Cadastro de Sub Grupo
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.category}>
                  Cadastro de Categoria
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.product}>
                  Cadastro de Produto
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Entrada de Estoque
                </Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>
                  Pedido de Compra
                </Link>
              </li>
            </ul>
          )}
          <li
            className={`mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-white hover:bg-zinc-500`}
            title="Configurações"
          >
            <span className="float-left block text-2xl">
              <Settings />
            </span>
            <span
              className={`flex-1 text-base font-medium duration-200 ${
                !open && 'hidden'
              }`}
            >
              Configurações
            </span>
            <ChevronDown
              className={`${menuConfiguracao && 'rotate-180'}`}
              onClick={() => setMenuConfiguracao(!menuConfiguracao)}
            />
          </li>
          {menuConfiguracao && open && (
            <ul>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Permissões</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Cupom Fiscal</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Nota Fiscal</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Clientes</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.user}>Usuários</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.dashboard}>Fornecedor</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.city}>Cidade</Link>
              </li>
              <li
                className="flex cursor-pointer items-center gap-x-4 rounded-md
                p-2 px-5 text-sm text-white hover:bg-slate-500"
              >
                <Link href={APP_ROUTES.private.state}>Estado</Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  )
}
