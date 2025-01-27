"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../components/home';
import Carte from '../components/Carte';
import Graph from '../components/Graph';
import Contact from '../components/Contact';

import { AnimatedNoise } from "../components/ui/AnimatedNoise";

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
		<div className='w-full h-screen flex flex-col justify-between overflow-hidden'>
			<div className="absolute h-screen w-screen -z-10 overflow-hidden">
				<AnimatedNoise opacity={0.07} />
			</div>
			<Navbar setCurrentPage={setCurrentPage} />
			<div className='flex-grow h-full'>
				{renderPage()}
			</div>
			<Footer />
		</div>
	);
}