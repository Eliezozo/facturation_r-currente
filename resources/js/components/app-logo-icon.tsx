import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BillApp logo">
            <rect x="6" y="6" width="52" height="52" rx="16" fill="#D40B16" />
            <rect x="18" y="14" width="28" height="36" rx="8" fill="#F8FAFC" />
            <path d="M24 23H40" stroke="#B00510" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 29H40" stroke="#B00510" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 35H31" stroke="#B00510" strokeWidth="3" strokeLinecap="round" />
            <path d="M33 42L41 37L33 32V42Z" fill="#B00510" />
        </svg>
    );
}
