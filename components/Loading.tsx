import Img from 'next/image';

export function Loading(): JSX.Element {
    return (
        <div className="w-full py-5 flex justify-center items-center">
            <Img width={100} height={100} className="w-20 h-20" src="/rolling.gif" alt=""/>
        </div>
    )
}