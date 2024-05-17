'use client';

import Link from 'next/link';
import Image from 'next/image';


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

    return (
        <li key={id}>
            <Link href={`/person/${id}`}>
                <img src={poster_path} alt={name} className='w-50 h-auto'/>
                <div>{name}</div>
                <div>{formattedNetWorth} Billions/ {industries}</div>
            </Link>
        </li>
    );
}
