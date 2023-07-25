'use client'

import { useState } from 'react'

import {
  Search,
  Package,
  UserPlus,
  Settings,
  ArrowLeft,
  ShoppingBag,
  ChevronDown,
  AlertTriangle,
  LayoutDashboard,
  CircleDollarSign,
} from 'lucide-react'
import Link from 'next/link'
import { APP_ROUTES } from '@/constants/app-routes'

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true)
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false)

  const Menus = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard />,
      route: APP_ROUTES.private.dashboard,
    },
    {
      title: 'Em Breve',
      icon: <AlertTriangle />,
      route: APP_ROUTES.private.state,
    },
    {
      title: 'Vendas',
      icon: <UserPlus />,
      submenu: true,
      spacing: true,
      submenuItems: [
        { title: 'Pedido de Venda', route: APP_ROUTES.private.dashboard },
        { title: 'Cancelar Venda', route: APP_ROUTES.private.dashboard },
        { title: 'Finalizar Venda', route: APP_ROUTES.private.dashboard },
      ],
    },
    {
      title: 'Financeiro',
      icon: <CircleDollarSign />,
      submenu: true,
      submenuItems: [
        { title: 'Abertura do Caixa', route: APP_ROUTES.private.dashboard },
        { title: 'Fechamento do Caixa', route: APP_ROUTES.private.dashboard },
        { title: 'Contas à Pagar', route: APP_ROUTES.private.dashboard },
        { title: 'Contas à Receber', route: APP_ROUTES.private.dashboard },
      ],
    },
    {
      title: 'Estoque',
      icon: <Package />,
      submenu: true,
      submenuItems: [
        { title: 'Cadastro de Marca', route: APP_ROUTES.private.brand },
        { title: 'Cadastro de Grupo', route: APP_ROUTES.private.dashboard },
        { title: 'Cadastro de Sub Grupo', route: APP_ROUTES.private.dashboard },
        { title: 'Cadastro de Categoria', route: APP_ROUTES.private.category },
        { title: 'Cadastro de Produto', route: APP_ROUTES.private.product },
        { title: 'Entrada de Estoque', route: APP_ROUTES.private.dashboard },
        { title: 'Pedido de Compra', route: APP_ROUTES.private.dashboard },
      ],
    },
    {
      title: 'Configuração',
      icon: <Settings />,
      submenu: true,
      submenuItems: [
        { title: 'Permissões', route: APP_ROUTES.private.dashboard },
        { title: 'Impressoras', route: APP_ROUTES.private.dashboard },
        { title: 'Cupom Fiscal', route: APP_ROUTES.private.dashboard },
        { title: 'Nota Fiscal', route: APP_ROUTES.private.dashboard },
        { title: 'Clientes', route: APP_ROUTES.private.dashboard },
        { title: 'Usuários', route: APP_ROUTES.private.user },
        { title: 'Fornecedor', route: APP_ROUTES.private.dashboard },
        { title: 'Cidade', route: APP_ROUTES.private.city },
        { title: 'Estado', route: APP_ROUTES.private.state },
      ],
    },
  ]

  return (
    <div className="fixed float-left flex">
      <div
        className={`h-screen ${
          open ? 'w-72' : 'w-20'
        }  relative bg-slate-100 p-5 pt-8 duration-300 dark:bg-blue-800`}
      >
        <ArrowLeft
          className={`absolute -right-3 top-9 cursor-pointer rounded-full
          border-dark-purple bg-white text-3xl text-dark-purple
            ${!open && 'rotate-180'}
          `}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <ShoppingBag
            size={!open ? 40 : 25}
            className="float-left ml-2 mr-2 mt-1.5 block cursor-pointer rounded"
          />
          <h1
            className={`origin-left text-2xl font-medium ${
              !open && 'scale-0'
            } duration-75`}
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
            className={`w-full bg-transparent text-base text-black focus:outline-none ${
              !open && 'hidden'
            }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <Link key={index} href={menu.route ? menu.route : ''}>
              <li
                className={` flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-zinc-500 ${
                  menu.spacing ? 'mt-9' : 'mt-2'
                }`}
              >
                <span className="float-left block text-2xl" title={menu.title}>
                  {menu.icon ? menu.icon : <LayoutDashboard />}
                </span>
                <span
                  className={`flex-1 text-base font-medium duration-200 ${
                    !open && 'hidden'
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <ChevronDown
                    className={`${subMenuOpen && 'rotate-180'}`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && subMenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((subMenuItem, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center gap-x-4 rounded-md p-2 px-5 text-sm hover:bg-slate-500"
                    >
                      <Link href={subMenuItem.route}>{subMenuItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
