import { useState, useEffect } from 'react';

export default function useSlideIn(ref) {
    const [height, setHeight] = useState();
    const [scroll, setScroll] = useState();
    const [top, setTop] = useState();
    const [width, setWidth] = useState();

    function resizeHandler() {
        setTop(ref.current.offsetTop);
        setScroll(document.body.scrollHeight);
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        resizeHandler()
        setHeight(window.innerHeight);
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler)
    }, [])

    return { height, scroll, top, width }
}