import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Diyarbakır B.B.
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/haberler" className="hover:text-gray-300">Haberler</Link></li>
            <li><Link href="/duyurular" className="hover:text-gray-300">Duyurular</Link></li>
            <li><Link href="/iletisim" className="hover:text-gray-300">İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}