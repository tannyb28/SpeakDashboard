import Image from 'next/image';
import Link from 'next/link';

const MainNavbar = () => {
  return (
    <nav className="fixed w-full h-16 bg-dark text-white flex items-center justify-between z-50 border-b border-secondary px-8">
      {/* Logo and Title */}
      <Link href="/" className="flex items-center text-white no-underline px-2 py-1 rounded-lg">
        <Image src="/peakspeak-logo.png" alt="Logo" width={40} height={40} />
        <span className="ml-2 text-2xl font-bold font-mono">PeakSpeak</span>
      </Link>

      {/* Middle Group (Centered) */}
      <div className="hidden md:flex space-x-6 text-sm justify-center flex-grow">
        <Link href="/about" className="text-white font-mono no-underline px-3 py-2 rounded-lg hover:bg-medium transition duration-300">
          About
        </Link>
        <Link href="/team" className="text-white font-mono no-underline px-3 py-2 rounded-lg hover:bg-medium transition duration-300">
          Team
        </Link>
        <Link href="/contact" className="text-white font-mono no-underline px-3 py-2 rounded-lg hover:bg-medium transition duration-300">
          Contact Us
        </Link>
      </div>

      {/* Login Button */}
      <Link href="/dashboard">
        <button className="bg-gradient-to-r from-secondary to-medium text-white rounded-lg px-1 py-1 hover:bg-gradient-to-r hover:from-white hover:to-white transition duration-300">
          <span className="flex font-mono bg-dark text-white text-sm rounded px-4 py-2 transition duration-300 hover:bg-medium">
            Dashboard
          </span>
        </button>
      </Link>
    </nav>
  );
};

export default MainNavbar;
