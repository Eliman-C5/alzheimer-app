import { schemaTypes } from './src/sanity/schemas/index';
import { SanityClient, defineConfig } from "sanity";
import {deskTool} from 'sanity/desk'
// import schemas from './src/sanity/schemas'

const config = defineConfig({
  projectId: 'dzds4vsu',
  dataset: 'real',
  title: 'alzhaimer web app',
  apiVersion: '2023-06-16',
  basePath: '/admin',
  plugins: [deskTool()],
  schema: { 
    types: schemaTypes
  }
})

export default config