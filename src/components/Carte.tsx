import {DatePickerWithRange} from "@/components/DatePickerWithRange";

export default function Carte() {
    return (
        <div className='flex justify-center w-fit backdrop-blur-lg mx-auto mt-4 px-2 py-1 rounded-xl shadow-lg gap-4'>
            <div className='font-bold'>
                Page de la carte
            </div>
            <DatePickerWithRange />
        </div>
    );
}