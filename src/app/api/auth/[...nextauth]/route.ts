import { options } from '@/app/options'
import NextAuth from 'next-auth'
//import GoogleProvider from 'next-auth/providers/google'

const handler=NextAuth(options)

export {handler as GET , handler as POST}