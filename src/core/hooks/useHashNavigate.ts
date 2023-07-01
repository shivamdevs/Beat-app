import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavFun = (to: string, replace?: boolean) => void;

export default function useHashNavigate(): NavFun {

    const navigate = useNavigate();
    const location = useLocation();

    function nav(to: string, replace?: boolean) {
        navigate(`${to}${location.hash}`, { replace });
    }
    return nav;
}

type NavTog = () => void;

export function useHashNavigateToggle(hash?: string): [NavTog, boolean] {
    const navigate = useNavigate();
    const location = useLocation();

    const [hasHash, setHasHash] = React.useState<boolean>(false);

    React.useEffect(() => {
        setHasHash(!!(location.hash && location.hash.split("#")[1] === hash));
    }, [location.hash, hash]);

    function toggle() {
        if (hasHash) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`#${hash}`, { replace: true });
        }
    }

    return [toggle, hasHash];
}