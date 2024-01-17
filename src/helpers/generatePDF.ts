import jsPDF from 'jspdf';

export const generatePDF = (id: number) => {

  // Defines the pdf
  let pdf = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: [300, 300],
    putOnlyUsedFonts:true
  })
  
  // Transforms the canvas into a base64 image
  
  let image64
  
  id ? image64 = document.querySelector(`.qrcode-canvas-datos-${id}`) as HTMLCanvasElement:
  image64 = document.querySelector('#qrcode-canvas') as HTMLCanvasElement
      
  image64.toDataURL()

  // Adds the image to the pdf
  pdf.addImage(image64, 'png', 100, 50, 100, 100)

  // Downloads the pdf
  pdf.save('QR.pdf')

}