'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from 'next/image';
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/messages', label: 'Messages' },
  { href: '/login', label: 'Login' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <nav className="text-black shadow-md p-4 sticky top-0 z-[100] bg-white">
      <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
          <Image src='https://ecommerceni.co.uk/wp-content/uploads/sites/4/2022/11/ECNI-logo-3-removebg-preview.png' alt='logo' width={50} height={50} className='object-cover rounded-full' />
          <div className="flex flex-col leading-tight">
            <h2 className="text-xl font-bold tracking-wide">SecondHand</h2>
            <p className="text-sm font-medium text-gray-700">Mart</p>
          </div>
        </Link>
        
        {/* Desktop Navbar */}
        <div className="hidden lg:flex space-x-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-md transition-colors ${pathname === href ? 'text-[#ff8e00] font-bold text-xl' : 'font-medium text-xl'}`}
            >
              {label}
            </Link>
          ))}
        </div>
        
        {/* Mobile Drawer */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4 bg-[#ff8e00] text-black">
              <button className="absolute top-4 right-4" onClick={handleClose}>
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block px-4 py-2 text-lg rounded-md transition-colors ${pathname === href ? 'bg-white text-black' : 'hover:bg-white/20'}`}
                    onClick={handleClose}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
