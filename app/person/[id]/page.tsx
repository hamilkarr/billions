import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { apiURL, noImagePath } from '../../constants';

interface assetsProps {
    ticker: string;
    numberOfShares: number;
    exerciseOptionPrice: number;
}

export const metadata: Metadata = {
    title: 'Billion',
};

async function getBillionaire(id: string) {
    const response = await fetch(apiURL + `/person/${id}`);
    const json = await response.json();
    return json;
}

export default async function Billionaire({params: {id}}: {params: {id: string}}) {
    const billionaire = await getBillionaire(id);
    const validPosterPath = billionaire.squareImage && billionaire.squareImage !== 'https:undefined' ? billionaire.squareImage : noImagePath;
    const formattedNetWorth = Math.round(billionaire.netWorth / 1000);

    return (
        <section className='w-11/12 mx-auto my-20'>
            <article className='flex flex-col gap-3 bg-slate-800 px-5 py-16'>
                <picture>
                    <Image src={validPosterPath} alt={billionaire.name} width={300} height={300}/>
                </picture>
                <strong className='text-2xl block my-1'>{billionaire.name}</strong>
                <div>NetWorth: {formattedNetWorth} Billion</div>
                <div>Country: {billionaire.country}</div>
                <div>Industries: {billionaire.industries.join(', ')}</div>
                <p>
                    {billionaire.bio}
                </p>
            </article>

            <article className='mt-12 bg-slate-800 px-5 py-16'>
                <h2 className='text-2xl font-bold mb-4'>Financial Assets</h2>
                <ul className='grid grid-cols-4 gap-4'>
                    {billionaire.financialAssets.map(
                        (asset: assetsProps) => (
                            <li key={asset.ticker} className='p-3 rounded-lg border border-gray-500 *:text-sm flex flex-col gap-2 min-h-28'>
                                <div>{asset.ticker}</div>
                                <div>Shares: {asset.numberOfShares.toLocaleString()}</div>
                                {asset.exerciseOptionPrice && <div>Exercise Price: ${asset.exerciseOptionPrice}</div>}
                            </li>
                        )
                    
                    )}
                </ul>
            </article>
        </section>
    );
}
