// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Header } from './globals/Header/config'
import { Footer } from './globals/Footer/config'
import { menus } from './globals/menus/config'
import { HomePage } from './globals/home/config'
import { Impressum } from './globals/impressum/config'
import { Datenschutzerklärung } from './globals/datenschutzerklärung/config'
import { Robots } from './globals/robots/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: 'https://laura-fies-2025.vercel.app',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
  'https://laura-fies-2025.vercel.app',
  'http://localhost:3000'
],
  collections: [Users, Media],
  globals: [
    Header,
    Footer,
    menus,
    HomePage,
    Impressum,
    Datenschutzerklärung,
    Robots,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
     vercelBlobStorage({
      enabled: true,
      collections: {
        media: true, // Media collection uploads go to Vercel Blob
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_xikuicPGrqcC0oTL_pq7csh075IiaGdGpYAUM5HLPiy3ZcL", // Set in Vercel env
    }),
  ],
})
