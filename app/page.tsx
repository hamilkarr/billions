import { Metadata } from 'next';
import { apiURL } from './constants';
import Billion from '../components/billion';

export const metadata: Metadata = {
    title: 'Billions',
};

async function getBillions() {
    const response = await fetch(apiURL);
    const json = await response.json();
    return json;
}

export default async function HomePage() {
    const billions = await getBillions();
    return (
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto w-4/5 mt-20'>
            {billions.map((billion: any) => 
                (<Billion
                    key={billion.id}
                    name={billion.name}
                    id={billion.id}
                    poster_path={billion.squareImage}
                    net_worth={billion.netWorth}
                    industries={billion.industries}
                />)
            )}
        </ul>
    );
}
