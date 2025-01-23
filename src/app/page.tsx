"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/home';
import About from '../components/About';
import Graph from '../components/Graph';
import Contact from '../components/Contact';

export default function Page() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'about':
                return <About />;
			case 'graph':
				return <Graph />;
            case 'contact':
                return <Contact />;
            default:
                return <Home />;
        }
    };

    return (
        <div className='w-full h-full'>
            <Navbar setCurrentPage={setCurrentPage} />
            {renderPage()}
        </div>
    );
}