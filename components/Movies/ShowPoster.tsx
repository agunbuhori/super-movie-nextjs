import React, { useEffect } from "react";

const ShowPoster: React.FC<{src: string}> = React.memo((props) => {

    const handleScroll = (e: Event) => {
        e.preventDefault();
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    return (
        <div style={{background: 'rgba(0, 0, 0, 0.8)'}} className="fixed flex-col top-0 left-0 w-full h-full flex justify-center items-center">
            <img src={props.src} alt="" className="h-3/4"/>
            <button className="p-2 text-white font-semibold">Close</button>
        </div>
    )
})

export default ShowPoster;