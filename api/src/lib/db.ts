import { Pool, QueryResult, QueryResultRow } from 'pg';

// Create PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'astro_ai',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Properly typed query function
export const query = <T extends QueryResultRow>(
  text: string,
  params?: (string | number | Date | null)[]
): Promise<QueryResult<T>> => {
  console.log('Executing query:', text, params);
  return pool.query<T>(text, params);
};

export default pool;