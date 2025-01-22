import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
    return (
        <div className='flex justify-center w-fit backdrop-blur-lg mx-auto mt-4 px-2 py-1 rounded-xl shadow-lg gap-4'>
            <Button variant='link' className='font-bold'>
                <Link href="/">Home</Link>
            </Button>
            <Button variant='link' className='font-bold'>
                <Link href="/about">About</Link>
            </Button>
            <Button variant='link' className='font-bold'>
                <Link href="/contact">Contact</Link>
            </Button>
        </div>
    );
}