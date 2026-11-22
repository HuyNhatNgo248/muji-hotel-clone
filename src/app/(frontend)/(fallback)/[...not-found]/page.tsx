import { notFound } from 'next/navigation'

// Any unknown URL renders ../not-found.tsx with a real 404 status
export default function CatchAll() {
  notFound()
}
