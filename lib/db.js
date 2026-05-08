import fs from "fs/promises"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function readCollection(collection) {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, `${collection}.json`)
  try {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeCollection(collection, data) {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, `${collection}.json`)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export async function addRecord(collection, record) {
  const records = await readCollection(collection)
  const newRecord = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    ...record,
    createdAt: new Date().toISOString(),
  }
  records.push(newRecord)
  await writeCollection(collection, records)
  return newRecord
}

export async function getRecords(collection) {
  return readCollection(collection)
}

export async function getRecordById(collection, id) {
  const records = await readCollection(collection)
  return records.find((r) => r.id === id) || null
}

export async function deleteRecord(collection, id) {
  const records = await readCollection(collection)
  const filtered = records.filter((r) => r.id !== id)
  if (filtered.length === records.length) return false
  await writeCollection(collection, filtered)
  return true
}
