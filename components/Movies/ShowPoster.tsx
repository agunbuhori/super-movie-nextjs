import React, { useEffect } from "react";
import Img from 'next/image';

interface Props {
    src: string, 
    close: Function
}

export function ShowPoster(props: Props) {

    const handleScroll = (e: Event) => {
        e.preventDefault();
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <div style={{background: 'rgba(0, 0, 0, 0.8)'}} className="fixed transition flex-col top-0 left-0 w-full h-full flex justify-center items-center">
            <Img src={props.src} alt="" className="h-3/4"/>
            <button className="p-2 text-white font-semibold" onClick={() => props.close()}>Close</button>
        </div>
    )
}

export default React.memo(ShowPoster);