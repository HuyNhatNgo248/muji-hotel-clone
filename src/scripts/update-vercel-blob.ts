import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { put, list } from '@vercel/blob'

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Set the MEDIA_DIR to the absolute path of the media folder in the root directory
const MEDIA_DIR = path.resolve(__dirname, '../../media') // Adjust if needed

// Helper to get all blob file names from Vercel Blob
async function getAllBlobFileNames(): Promise<Set<string>> {
  let cursor: string | undefined = undefined
  const blobNames = new Set<string>()

  do {
    const listResult: { blobs: { url: string }[]; cursor?: string } = await list({
      cursor,
      limit: 1000,
    })
    for (const blob of listResult.blobs) {
      // Extract the file name from the blob URL
      const match = blob.url.match(/\/([^\/?#]+)(?:[?#]|$)/)
      if (match) {
        blobNames.add(match[1])
      }
    }
    cursor = listResult.cursor
  } while (cursor)

  return blobNames
}

async function uploadFile(filePath: fs.PathOrFileDescriptor, fileName: string) {
  const fileBuffer = fs.readFileSync(filePath)
  const blob = await put(`api/media/file/${fileName}`, fileBuffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  console.log(`Uploaded ${fileName} -> ${blob.url}`)
}

async function uploadMissingFiles() {
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`Media directory does not exist: ${MEDIA_DIR}`)
    return
  }

  const existingBlobNames = await getAllBlobFileNames()
  const files = fs.readdirSync(MEDIA_DIR)

  // Prepare an array of upload promises for files that don't exist in blob storage
  const uploadPromises = files
    .filter((fileName) => {
      const filePath = path.join(MEDIA_DIR, fileName)
      return fs.statSync(filePath).isFile() && !existingBlobNames.has(fileName)
    })
    .map(async (fileName) => {
      const filePath = path.join(MEDIA_DIR, fileName)
      try {
        return await uploadFile(filePath, fileName)
      } catch (err) {
        console.error(`Failed to upload ${fileName}:`, err)
      }
    })

  // Run uploads in parallel
  await Promise.all(uploadPromises)

  // Optionally, log skipped files
  files.forEach((fileName) => {
    if (existingBlobNames.has(fileName)) {
      console.log(`Skipping ${fileName}, already exists in blob storage.`)
    }
  })
}

uploadMissingFiles()
