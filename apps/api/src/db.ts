import { MongoClient, Db } from 'mongodb'

let db: Db | null = null

export async function getDb(): Promise<Db> {
  if (db) return db

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)
  await client.connect()
  db = client.db('rikki')
  return db
}
