'use client'

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export function NavbarDropdown() {

  const { data: session } = useSession();
  
  // const redirectFunction = () => {
    
  //   signOut()
    
  //   setTimeout(() => {
  //     redirect('/')
  //   }, 3000)
    
  // }

  return (
  <>
    {
      session ? 
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="bordered" 
            className="my-auto text-[14px] sm:text-[16px]"
          >
            Cuenta
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="registrar">
            <Link href='/registrar'>
            Registrar
            </Link>
          </DropdownItem>
          <DropdownItem key="datos">
            <Link href='/datos'>
            Lista
            </Link>
          </DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Salir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> :
      <button onClick={() => signIn()} className='btn-navbar text-[14px] sm:text-[16px]'>Ingresar</button>
    }
  </>
    
  );
}
