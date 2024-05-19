'use client';

import Link from 'next/link';
import Image from 'next/image';
import { noImagePath } from '@/app/constants';


interface BillionProps {
    name: string;
    id: number;
    poster_path: string;
    net_worth: number;
    industries: string[];
}


export default function Billion({
    name,
    id,
    poster_path,
    net_worth,
    industries,
}: BillionProps) {
    const formattedNetWorth = Math.round(net_worth / 1000);
    const validPosterPath = poster_path && poster_path !== 'https:undefined' ? poster_path : noImagePath;

    return (
        <li key={id}>
            <Link href={`/person/${id}`} className='flex flex-col gap-1.5'>
                <Image src={validPosterPath} alt={name} width={200} height={300} className='w-full h-auto hover:scale-105 transition'/>
                <div className='font-bold'>{name}</div>
                <div className='text-xs'>{formattedNetWorth} Billions / {industries}</div>
            </Link>
        </li>
    );
}
