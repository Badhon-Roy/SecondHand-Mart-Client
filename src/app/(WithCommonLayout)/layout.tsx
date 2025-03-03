
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="fixed top-20 left-0 right-0 z-10">
            <div className="relative w-full h-[6px] bg-gray-200 rounded-full shadow-md">
                <ScrollProgress className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-300" />
            </div>
        </div>
            <main className='min-h-screen'>{children}</main>
            <Footer />

        </>
    );
};

export default CommonLayout;