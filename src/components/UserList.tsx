import { generatePDF } from '@/helpers/generatePDF'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import QRcode from 'qrcode.react'
import {Button} from "@nextui-org/react";
import {UserIcon} from './UserIcon';
import React from 'react'
import { AnchorIcon } from './AnchorIcon';

type UserListProps = {
  adultname: string,
  adultage: number,
  id: number,
  deleteUser: Function,
  image: string,
  illnes: string, 
  userphone: number
}

export const UserList = ({adultname, adultage, id, deleteUser, image, illnes, userphone}: UserListProps) => {

  return (
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={image}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{adultname}</p>
            <p className="text-small text-default-500">{adultage} años</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className='gap-4 py-6'>
        <QRcode className={`qrcode-canvas-datos-${id}`} level="H" size={100} value={`https://alzheimer-app.vercel.app/profile/${id}`} />
          <div className="">
            <p>Con {adultage} años de edad sufre de {illnes}. Se le puede contactar al {userphone}</p>
            <p>
              Si gustas puedes descargar su código QR en formato PDF o puedes ir su página de <Link
                isExternal
                showAnchorIcon
                href={`https://alzheimer-app.vercel.app/profile/${id}`}
                anchorIcon={<AnchorIcon />}
              >
                perfil
              </Link>
            </p>
          </div>
          <Button color="primary" variant="shadow" className='max-w-[160px]' 
            onClick={() => generatePDF(id) } 
          >
            Descargar PDF
          </Button>
        </CardBody>
        <Divider/>
        <CardFooter>
          <Button color="danger" variant="bordered" startContent={<UserIcon/>} onClick={() => deleteUser(id)}>
            Borrar Paciente
          </Button>
        </CardFooter>
      </Card>
  )
}
