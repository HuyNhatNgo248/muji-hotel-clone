import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

// Frontend pages are cached; any CMS edit purges all of them (small site, cheap to re-render)
const purge = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Not inside a Next.js request (payload CLI, scripts): nothing to purge
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  purge()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purge()
  return doc
}
