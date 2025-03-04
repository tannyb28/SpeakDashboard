'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Person } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DashboardTopBar = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Logout function: remove token and redirect to login page
    const logout = () => {
        Cookies.remove("peakspeak-token", { path: '/' });
        setTimeout(() => {
            window.location.href = "/login";
        }, 100); // delay in milliseconds
    };    

    return (
        <nav className="fixed w-full h-16 bg-light text-dark flex items-center justify-between z-50 border-b border-secondary px-8">
            {/* Logo and Title */}
            <Link href="/dashboard" className="flex items-center no-underline px-2 py-1 rounded-lg">
                <Image src="/light-logo.png" alt="Logo" width={40} height={40} />
                <span className="ml-2 text-2xl font-bold font-mono">PeakSpeak</span>
            </Link>
    
            {/* Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <div onClick={toggleDropdown} className="cursor-pointer">
                    {profileImage ? (
                        <Image src={profileImage} width={10} height={10} alt="Profile" className="w-10 h-10 rounded-full" />
                    ) : (
                        <div className="bg-gradient-to-r from-secondary to-medium text-white rounded-lg px-1 py-1 hover:bg-gradient-to-r hover:from-medium hover:to-bright transition duration-300">
                            <span>
                                <Person className="text-white" />
                            </span>
                        </div>
                    )}
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                        {/* <Link href="/dashboard/account" className="block px-4 py-2 text-dark hover:bg-light-gray transition duration-300">
                            Account
                        </Link> */}
                        <button className="block w-full text-left px-4 py-2 text-dark rounded-lg hover:bg-light transition duration-300" onClick={logout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default DashboardTopBar;