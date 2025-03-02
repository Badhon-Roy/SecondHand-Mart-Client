'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from 'next/image';
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
];
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { logout } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const {user, setIsLoading} = useUser();


  const handleLogOut = () => {
    logout();
    setIsLoading(true)
  } 

  return (
    <nav className="text-black shadow-md p-4 sticky top-0 z-[30] bg-white">
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

          {
            user && user?.email ?    <div className='z-[100]'>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Image src={'https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button.png?w=360'}
                  alt='avatar' width={50} height={50} className='rounded-full cursor-pointer'></Image>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className='text-xl text-center font-bold'>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={'/profile'}>
                    <div className='hover:bg-[#ff8e00] w-full px-4 py-2 rounded-[4px] hover:font-bold hover:text-white flex items-center gap-2'>
                      <User />  Profile
                    </div>
                  </Link>
                  <Link href={'/user/dashboard'}>
                    <div className='hover:bg-[#ff8e00] w-full px-4 py-2 rounded-[4px] hover:font-bold hover:text-white flex items-center gap-2'>
                      <LayoutDashboard /> Dashboard
                    </div>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Button onClick={handleLogOut} className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 w-full rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                  <LogOut /> Log out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> :   <Link
              key={'/login'}
              href={'/login'}
              className={`px-4 py-2 rounded-md transition-colors ${pathname === '/login' ? 'text-[#ff8e00] font-bold text-xl' : 'font-medium text-xl'}`}
            >
              Login
            </Link>
          }

       

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
