"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/home';
import Carte from '../components/Carte';
import Graph from '../components/Graph';
import Contact from '../components/Contact';

export default function Page() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'carte':
                return <Carte />;
            case 'graph':
                return <Graph />;
            case 'contact':
                return <Contact />;
            default:
                return <Home />;
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <Navbar setCurrentPage={setCurrentPage} />
            <div className='flex-grow'>
                {renderPage()}
            </div>
            <Footer />
        </div>
    );
}