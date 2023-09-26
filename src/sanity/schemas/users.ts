// Crear el schema
// Configurar el cliente de Sanity desde el componente de el formulario
// Si el usuario entra a profile/[id], hacer una consulta a sanity para ver si existe ese id unico y traer los datos 

export default {
  name: 'users',
  type: 'document',
	title: 'Users',
  fields: [
    {
      name: 'username',
      type: 'string',
      title: 'Nombre del responsable'
    },
    {
      name: 'adultname',
      type: 'string',
      title: 'Nombre de el adulto mayor'
    },
    {
      name: 'adultage',
      type: 'number',
      title: 'Edad del adulto mayor'
    },
    {
      name: 'userphone',
      type: 'number',
      title: 'Número de contacto del responsable'
    },
    {
      name: 'image',
      type: 'string',
      title: 'Imagen del adulto mayor'
    },
    {
      name: 'id',
      type: 'number',
      title: 'ID'
    },
    {
      name: 'email',
      type: 'string',
      title: 'email'
    },
    {
      name: 'genre',
      type: 'string',
      title: 'Género de el adulto mayor'
    },
    {
      name: 'illnes',
      type: 'string',
      title: 'Sufre de alguna enfermedad o tiene alguna patología?'
    },
    {
      name: 'adultAddress',
      type: 'string',
      title: 'Ingresar dirección del lugar de residencia del adulto mayor'
    },
  ]
}