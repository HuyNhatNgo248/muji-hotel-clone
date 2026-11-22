import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-16 px-4">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-start mb-12">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold tracking-tight mr-4">MUJI</span>
          <span className="text-xl font-bold">無印良品</span>
        </Link>
      </header>

      {/* Main Content */}
      <section className="w-full max-w-2xl bg-white rounded-lg shadow-none flex flex-col py-12 px-6">
        {/* Japanese Title */}
        <h1 className="text-2xl font-bold mb-4">お探しのページは見つかりませんでした</h1>
        {/* Japanese Description */}
        <p className="mb-4">
          申し訳ありませんが、このページアドレスは存在しません。削除されているか、アドレスが変更されているか、現在アクセスできなくなっている可能性があります。
        </p>
        {/* Japanese Link */}
        <Link href="/" className="text-base font-semibold mb-8 underline">
          無印良品ネットストア
        </Link>

        {/* English Title */}
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        {/* English Description */}
        <p className="mb-4">
          We’re sorry, the page you’ve requested does not exist at this address. It may be deleted,
          changed its address, or unable to access right now.
        </p>
        {/* English Link */}
        <Link href="/en" className="text-base font-semibold mb-8 underline">
          MUJI GLOBAL
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-2xl flex justify-center mt-16 text-xs text-gray-400">
        Copyright ©Ryohin Keikaku Co., Ltd.
      </footer>
    </main>
  )
}
