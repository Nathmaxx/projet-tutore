import { Cable, ChartArea, Contact, Map } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface NavbarProps {
    setCurrentPage: (page: string) => void;
}

export default function Navbar({ setCurrentPage }: NavbarProps) {
    return (
        <Card className='flex justify-center w-fit backdrop-blur-lg mx-auto my-4 gap-2'>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('home')}>
                <Cable />
                Projet Tutoré
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('carte')}>
                <Map />
                Carte
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('graph')}>
                <ChartArea />
                Graph
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('contact')}>
                <Contact />
                Contact
            </Button>
        </Card>
    );
}