import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-rgb(11,8,20) text-white flex justify-center items-center">
      <div className="flex space-x-4">
        <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition">
          Terms of Service
        </Link>
        <p className="text-sm text-gray-400">© 2024 TNL Uplift. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
