export const downloadQRCode = () => {
  const canvas = document.querySelector("#qrcode-canvas") as HTMLCanvasElement
  if (!canvas) throw new Error("<canvas> not found in the DOM")

  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream")
  const downloadLink = document.createElement("a")
  downloadLink.href = pngUrl
  downloadLink.download = "QR code.png"
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}