import { FormContext } from '@/context/FormProvider'
import React, { useContext, useState } from 'react'

export const UploadImage = () => {

  const {images, setImages} = useContext(FormContext)
  
  const getImage = (e: any) => {
    
    if (!e.target.files) return;
    
    console.log(e.target.files[0])
    
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', 't4zcamhq')
    
    fetch('https://api.cloudinary.com/v1_1/datsipxkz/image/upload', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      console.log(data, data.url)
      setImages(data.url)
    })
    .catch(err => console.log(err))
    
  }
  
  return (
    <div className='my-8 flex flex-col gap-4'>
      <label>Carga una imagen de aproximadamente 500px de ancho y alto</label>
      <input 
        type='file' 
        accept="image/png, image/jpeg" 
        className='border-dashed bg-white border-black'
        onChange={getImage}
        required
      />
    </div>
  )
}
