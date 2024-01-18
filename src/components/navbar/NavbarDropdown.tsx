'use client'

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

export function NavbarDropdown() {

  const { data: session } = useSession();
  
  const router = useRouter();
  
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
          <DropdownItem 
            key="registrar"
            onClick={() => router.push('/registrar')}
          >
            Registrar
          </DropdownItem>
          <DropdownItem 
            key="datos"
            onClick={() => router.push('/datos')}
          >
            Lista
          </DropdownItem>
          <DropdownItem 
            key="delete" 
            className="text-danger" 
            color="danger"
            onClick={() => signOut()}
          >
            Salir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> :
      <button onClick={() => signIn()} className='btn-navbar text-[14px] sm:text-[16px]'>Ingresar</button>
    }
  </>
    
  );
}
