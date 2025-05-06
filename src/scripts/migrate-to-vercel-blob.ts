// upload-media-to-vercel-blob.js
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { put, list, del } from '@vercel/blob'

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Set the MEDIA_DIR to the absolute path of the media folder in the root directory
const MEDIA_DIR = path.resolve(__dirname, '../../media') // Adjust if needed

async function deleteAllBlobs() {
  try {
    let cursor: string | undefined = undefined
    do {
      const listResult: { blobs: { url: string }[]; cursor?: string } = await list({
        cursor,
        limit: 1000,
      })
      if (listResult.blobs.length > 0) {
        // Delete all blobs in this batch
        await del(listResult.blobs.map((blob) => blob.url))
      }
      cursor = listResult.cursor
    } while (cursor)
    console.log('All blobs were deleted')
  } catch (err) {
    console.error('Error deleting blobs:', err)
  }
}

async function uploadFile(filePath: fs.PathOrFileDescriptor, fileName: string) {
  const fileBuffer = fs.readFileSync(filePath)
  const blob = await put(`api/media/file/${fileName}`, fileBuffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  console.log(`Uploaded ${fileName} -> ${blob.url}`)
}

async function uploadAllFiles() {
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`Media directory does not exist: ${MEDIA_DIR}`)
    return
  }

  const files = fs.readdirSync(MEDIA_DIR)
  for (const fileName of files) {
    const filePath = path.join(MEDIA_DIR, fileName)
    if (fs.statSync(filePath).isFile()) {
      try {
        await uploadFile(filePath, fileName)
      } catch (err) {
        console.error(`Failed to upload ${fileName}:`, err)
      }
    }
  }
}

deleteAllBlobs()
uploadAllFiles()
