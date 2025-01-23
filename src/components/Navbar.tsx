import { Cable } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function Navbar({ setCurrentPage }) {
    return (
        <Card className='flex justify-center w-fit backdrop-blur-lg mx-auto my-4 gap-2'>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('home')}>
                <Cable />
                Projet Tutoré
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('about')}>
                About
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('graph')}>
                Graph
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('contact')}>
                Contact
            </Button>
        </Card>
    );
}