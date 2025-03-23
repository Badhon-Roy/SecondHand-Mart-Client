'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, LayoutDashboard, LogOut, Menu, Search, User, X } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from 'next/image';
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
import { getAllListing } from '@/services/listing';
import { IListing } from '@/types';
import { protectedRotes } from '@/constants';
import logoImage from "../../app/assets/logo.png"



const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/offers', label: 'Offers' },
];

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  console.log(user);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllListing();
        setData(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on query
  useEffect(() => {
    if (query) {
      const filtered = data.filter((product: IListing) =>
        product?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [query, data]);

  // Handle navigation & clear search
  const handleSelectProduct = (productId: string) => {
    router.push(`/products/${productId}`);
    setQuery("");
    setFilteredData([]);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const handleClose = () => setOpen(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true)
    if(protectedRotes?.some(route => pathname.match(route))){
      router.push('/')
    }
  }

  return (
    <nav className="text-black shadow-md p-4 sticky top-0 z-[30] bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 ">
          <Image src={logoImage} alt='logo' width={30} height={40} className='object-cover rounded-full' />
          <div className="flex flex-col leading-tight">
            <h2 className="text-xl font-bold tracking-wide">SecondHand</h2>
            <p className="text-sm font-medium text-gray-700">Mart</p>
          </div>
        </Link>


        <div className="relative md:block hidden">
          {/* Search Input */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white shadow-lg border-2 border-[#ff8e00] rounded overflow-hidden"
          >
            <div className="xl:px-4 px-2 text-[#ff8e00]">
              <Search className="text-xl" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 py-3 px-2 text-lg focus:outline-none xl:w-full lg:w-[120px] "
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] xl:px-6 px-3 py-3 text-white font-semibold text-lg transition-all hover:from-[#e9a912] hover:to-[#ff6f00]"
            >
              Search
            </button>
          </form>

          {/* Auto-Suggestions Dropdown */}
          {filteredData.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredData.map((product: IListing) => (
                <li
                  key={product._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectProduct(product._id)} // Navigate & clear input
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>






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
            user && user?.email ? <div className='z-[100]'>
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Image src={'https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button.png?w=360'}
                    alt='avatar' width={50} height={50} className='rounded-full cursor-pointer'></Image>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className='text-xl text-center font-bold'>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={'/favorite'}>
                      <div className='hover:bg-[#ff8e00] w-full px-4 py-2 rounded-[4px] hover:font-bold hover:text-white flex items-center gap-2'>
                        <Heart />  Favorite
                      </div>
                    </Link>
                    <Link href={`/${user?.role}/dashboard`}>
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
            </div> : <Link
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

                <div className="relative">
                  {/* Search Input */}
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center bg-white shadow-lg border-2 border-[#ff8e00] rounded overflow-hidden"
                  >
                    <div className="px-2 text-[#ff8e00]">
                      <Search className="text-xl" />
                    </div>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {setQuery(e.target.value)}}
                      placeholder="Search for products..."
                      className="md:flex-1 py-2 px-1 focus:outline-none w-full"
                    />
                  </form>

                  {/* Auto-Suggestions Dropdown */}
                  {filteredData?.length > 0 && (
                    <ul className="absolute w-full bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredData?.map((product: IListing) => (
                        <li
                          key={product?._id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleClose();
                            handleSelectProduct(product?._id);
                          }}
                        >
                          {product?.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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


                {
                  user && user?.email ? <div>
                    <Link
                      key={'favorite'}
                      href={'/favorite'}
                      className={`block px-4 py-2 text-lg rounded-md transition-colors ${pathname === '/favorite' ? 'bg-white text-black' : 'hover:bg-white/20'}`}
                      onClick={handleClose}
                    >
                      Favorite
                    </Link>
                    <Link
                      key={'dashboard'}
                      href={'/user/dashboard'}
                      className={`block px-4 py-2 text-lg rounded-md transition-colors ${pathname === '/favorite' ? 'bg-white text-black' : 'hover:bg-white/20'}`}
                      onClick={handleClose}
                    >
                      Dashboard
                    </Link>
                    <Button onClick={handleLogOut} className="border-2 border-white bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] px-8 py-6 w-full rounded-[4px] text-white font-semibold text-[18px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-[#e9a912] hover:to-[#ff6f00] hover:shadow-lg active:scale-95 focus:outline-none cursor-pointer">
                      <LogOut /> Log out
                    </Button>
                  </div> : <Link
                    key={'/login'}
                    href={'/login'}
                    className={`px-4 py-2 rounded-md transition-colors ${pathname === '/login' ? 'text-[#ff8e00] font-bold text-xl' : 'font-medium text-xl'}`}
                  >
                    Login
                  </Link>
                }



              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
