import { Pool } from 'pg'
const pool = new Pool({
  user: 'oklm',
  host: 'localhost',
  database: 'oklm',
  password: 'oklm',
  port: 5432,
})

export default {
  query: (text: string, params?: any) => {
    return pool.query(text, params)
  },
}