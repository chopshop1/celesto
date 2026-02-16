import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

export function getDb() {
	const sql = neon(env.DATABASE_URL!);
	return drizzle({ client: sql, schema });
}

// Lazy proxy that creates the connection on first use
export const db = new Proxy({} as ReturnType<typeof getDb>, {
	get(_, prop) {
		const instance = getDb();
		return (instance as unknown as Record<string | symbol, unknown>)[prop];
	}
});
