import { Button } from './ui/button';

export default function Navbar({ setCurrentPage }) {
    return (
        <div className='flex justify-center w-fit backdrop-blur-lg mx-auto mt-4 px-2 py-1 rounded-xl shadow-lg gap-4'>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('home')}>
                Home
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('about')}>
                About
            </Button>
            <Button variant='link' className='font-bold' onClick={() => setCurrentPage('contact')}>
                Contact
            </Button>
        </div>
    );
}