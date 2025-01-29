import { Cable, ChartArea, Contact, Map } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Link from 'next/link';


export default function Navbar() {
    return (
        <div className='w-full h-20 flex items-center justify-center'>
            <Card className='flex text-3xl justify-center w-fit backdrop-blur-lg mx-auto gap-2 '>
                <Link
                    href={'/'}
                >
                    <Button variant='link' className='font-bold tracking-tighter'>
                        <Cable />
                        PROJET TUTORÉ
                    </Button>
                </Link>
                <Link
                    href={'/carte'}
                >
                    <Button variant='link' className='font-bold'>
                        <Map />
                        Carte
                    </Button>
                </Link>
                <Link 
                    href={'/graphes'}
                >
                    <Button variant='link' className='font-bold'>
                        <ChartArea />
                        Graphes
                    </Button>
                </Link>
                <Link 
                    href={'/contact'}
                >
                    <Button variant='link' className='font-bold'>
                        <Contact />
                        Contact
                    </Button>
                </Link>
            </Card>
        </div>
    );
}