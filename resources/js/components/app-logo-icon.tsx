import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="56" height="56" rx="14" fill="currentColor" opacity="0.2" />
            <rect x="10" y="10" width="44" height="44" rx="10" fill="currentColor" />
            <path d="M27 22L44 32L27 42V22Z" fill="#ffffff" />
        </svg>
    );
}
