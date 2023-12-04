import React, { useState, useEffect, useRef } from 'react';

function CatCanvas() {
    const [showCanvas, setShowCanvas] = useState(false);
    const [cats, setCats] = useState([]);
    const moveIntervalRefs = useRef([]);

    const catImages = [
        "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/test.gif",
        "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/test1.gif",
        "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/cat2.gif",
        "https://stylekorean-image.s3.ap-northeast-2.amazonaws.com/oms/cat3.gif",
    ];

    useEffect(() => {
        return () => {
            moveIntervalRefs.current.forEach(interval => {
                clearInterval(interval);
            });
        };
    }, []);

    const handleButtonClick = () => {
        setShowCanvas(!showCanvas);
    };

    const placeCat = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        const direction = Math.random() > 0.5 ? 'left' : 'right';

        const randomImage = catImages[Math.floor(Math.random() * catImages.length)];

        const newCat = {
            x,
            y,
            offset: 0,
            opacity: 1,
            id: Date.now(),
            direction,
            imageUrl: randomImage
        };

        setCats((prevCats) => [...prevCats, newCat]);

        if (randomImage === catImages[1]) {
            const moveInterval = setInterval(() => {
                setCats((prevCats) => prevCats.map(cat => {
                    if (cat.id === newCat.id) {
                        const movement = cat.direction === 'left' ? -5 : 5;
                        return {
                            ...cat,
                            offset: cat.offset + movement,
                            opacity: cat.opacity - 0.001
                        };
                    }
                    return cat;
                }));
            }, 50);

            moveIntervalRefs.current.push(moveInterval);

            setTimeout(() => {
                clearInterval(moveInterval);
                setCats((prevCats) => prevCats.filter(cat => cat.id !== newCat.id));
            }, 4000);
        } else {
            setTimeout(() => {
                setCats((prevCats) => prevCats.filter(cat => cat.id !== newCat.id));
            }, 4000);
        }
    };

    return (
        <>
            {!showCanvas && (
                <button type="button" className="holi_thmb _effect_trigger" onClick={handleButtonClick}>
                    Show/Hide Canvas
                </button>
            )}

            {showCanvas && (
                <div className="cat_wrap" onClick={placeCat}>
                    {cats.map(cat => (
                        <img
                            key={cat.id}
                            src={cat.imageUrl}
                            alt="cat"
                            style={{
                                position: 'absolute',
                                top: `${cat.y}px`,
                                left: `${cat.x + cat.offset}px`,
                                transform: 'translate(-50%, -50%)',
                                width: "200px",
                                height: "200px",
                                opacity: cat.opacity,
                                transform: cat.direction === 'left' ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scaleX(-1)', // 방향에 따라 이미지 반전
                                backgroundColor: 'transparent',
                            }}
                        />
                    ))}
                    <button type="button" className="canvas_close" onClick={() => setShowCanvas(false)}>Close</button>
                </div>
            )}
        </>
    );
}

export default CatCanvas;