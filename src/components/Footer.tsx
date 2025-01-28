import { Card } from './ui/card';

export default function Footer() {
    return (
        <Card className='flex text-xs justify-center w-fit mx-auto mt-4 px-2 py-1 rounded-xl gap-4 mb-4'>
            <p className='font-bold'>© 2025 Projet Tutoré. Tous droits réservés.</p>
        </Card>
    );
}