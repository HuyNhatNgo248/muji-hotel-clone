import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h2 className="text-4xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="text-white bg-black hover:bg-gray-800 py-3 px-6 rounded-md transition-all"
      >
        Return to Homepage
      </Link>
    </div>
  )
}
