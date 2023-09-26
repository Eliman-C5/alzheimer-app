export const getIdPath = (pathname: any) => {

  const pathArray = pathname.split('')
    
    let idPath = ''
    
    pathArray.map((path: any) => {
      
      path === '0' ||
      path === '1' ||
      path === '2' ||
      path === '3' ||
      path === '4' ||
      path === '5' ||
      path === '6' ||
      path === '7' ||
      path === '8' ||
      path === '9'
    ? 
      idPath += path
    : ''
    
    })
    
    return idPath
}
