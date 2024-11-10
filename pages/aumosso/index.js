import { useState, useEffect } from "react";

const Aumosso = () => {
    const [pode, setPode] = useState(null);

    return (
        <>
            {pode === null && <div style={{ maxWidth: '50%', margin: 'auto' }}>
                <h1>Será que jah pohdir allmossçssar???</h1>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={() => setPode(true)} style={{ color: 'green' }}>Pohdir sin</button>
                    <button onClick={() => setPode(false)} style={{ color: 'red' }}>Pohdir ñn man</button>
                </div>
            </div>}

            {pode === false ?
                (<>
                    <p>MAS EU QUERO ALLMOSSARR AGRRR!!!</p>
                    <img src="https://thumbs.dreamstime.com/b/emoticon-com-fome-esfomeado-emoji-61019308.jpg" />
                </>) : ''}

            {pode === true ?
                (<>
                    <p>CADEEE, VAMO ALMOSSAR!!!</p>
                    <img src="https://thumbs.dreamstime.com/b/emoticon-com-fome-18251487.jpg" /> : ''
                </>) : ''}
        </>
    )
}

export default Aumosso;
