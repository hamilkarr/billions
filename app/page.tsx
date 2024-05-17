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
        <ul>
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
