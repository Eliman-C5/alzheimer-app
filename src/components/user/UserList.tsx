import { generatePDF } from '@/helpers/generatePDF'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import QRcode from 'qrcode.react'
import {Button} from "@nextui-org/react";
import {UserIcon} from './UserIcon';
import React, { useContext } from 'react'
import { AnchorIcon } from './AnchorIcon';
import { client } from '@/sanity/schemas';
import { FormContext } from '@/context/FormProvider';

type UserListProps = {
  adultname: string,
  adultage: number,
  id: number,
  image: string,
  illnes: string, 
  userphone: number,
  docId: string
}

export const UserList = ({adultname, adultage, id, docId, image, illnes, userphone}: UserListProps) => {

  const {info, setInfo} = useContext(FormContext);

  const deleteUser = (e: any) => {
    // Cambia la llamada para actualizar la lista de usuarios después de eliminar
    client
      .delete(docId)
      .then(() => {
        // Actualiza la lista después de eliminar
        client.fetch('*[_type == "users"]').then(res => {
          console.log(res, id)
          setInfo(res);
        });
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

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
                className='text-[16px] lg:text-[20px]'
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
          <Button 
            color="danger" 
            variant="bordered" 
            startContent={<UserIcon/>} 
            onClick={(e) => deleteUser(e)} 
            id={`${docId}`}
          >
            Borrar Paciente
          </Button>
        </CardFooter>
      </Card>
  )
}
