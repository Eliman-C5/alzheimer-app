import { downloadQRCode } from '@/helpers/downloadQRCode'
import { generatePDF } from '@/helpers/generatePDF'
import { formComponentTypes } from '@/interfaces/app_interfaces';
import { useRouter } from 'next/navigation';
import QRcode from 'qrcode.react'

export const QRfromProfile = ({isDataCorrect, profileId}: formComponentTypes) => {

  const router = useRouter();

  return (
    <div className={`${isDataCorrect ? 'block' : 'hidden'} mt-8 flex flex-col gap-4`}>
        <button 
          onClick={() => router.push(`/profile/${profileId}`)} 
          className={`rounded-[15px] bg-blue-400 text-white hover:opacity-90 py-[6px] px-[10px] font-bold`}
        >
          Ir a la página de perfil del usuario
        </button>
        <p className='text-center'>o</p>
        <div className="bg-[#e4e4e4] p-4 my-4">
          <QRcode 
            id="qrcode-canvas" 
            level="H" 
            size={300} 
            value={`https://alzheimer-app.vercel.app/profile/${profileId}`} 
          />
        </div>
        <div className="flex flex-col gap-4">
          <a 
            onClick={() => generatePDF} 
            className='text-center cursor-pointer rounded-[15px] border border-blue-400 bg-white text-blue-400 hover:opacity-90 p-[6px] font-bold'
          >
            Descargar el QR en PDF
          </a>
          <a 
            onClick={downloadQRCode} 
            className='text-center cursor-pointer rounded-[15px] bg-blue-400 text-white hover:opacity-90 p-[6px] font-bold'
          >
            Descargar el QR en PNG
          </a>
        </div>
      </div>
  )
}
