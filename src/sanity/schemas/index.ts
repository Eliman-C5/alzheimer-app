import { createClient } from "next-sanity";
import users from "./users";

export const client = createClient({
  projectId: 'dzds4vsu',
  dataset: 'real',
  useCdn: false,
  apiVersion: '2023-06-16', // use current date (YYYY-MM-DD) to target the latest API version
  token: 'skwoJbOPRR5VbGHQkoYgdvDGTiAO0bYo8cyO3AO5B0IPneNS0FPCj3TioUEprFRm5ZZg3X1BLgYYVzMkyeJmAKZWJFHrVxWuq0rNj7cuRN1TiPj6hdkAG6TRJMEMZfAtYvpVT46aVGKqlD7VzWb49OC1yFggH8j2OjGo2z1ZoH8npSrYlsmT' // Only if you want to update content with the client
})

export const schemaTypes = [users]