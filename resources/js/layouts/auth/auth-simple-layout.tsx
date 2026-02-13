import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import type { AuthLayoutProps } from '@/types';
import { home } from '@/routes';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#050505] p-6 text-white md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(229,9,20,0.25),transparent_36%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_34%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.03)_45%,transparent_58%)] [animation:authSheen_9s_linear_infinite]" />

            <div className="relative w-full max-w-md">
                <div className="rounded-3xl border border-white/15 bg-[#111111]/90 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-9">
                    <div className="mb-8 flex flex-col items-center gap-4 text-center">
                        <Link href={home()} className="group inline-flex items-center gap-3">
                            <div className="transition-transform duration-300 group-hover:scale-105">
                                <AppLogo />
                            </div>
                        </Link>

                        <div className="space-y-2">
                            <h1 className="text-2xl leading-tight font-bold text-white">
                                {title}
                            </h1>
                            <p className="text-sm text-zinc-300">{description}</p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>

            <style>{`
                @keyframes authSheen {
                    from {
                        transform: translateX(-20%);
                    }
                    to {
                        transform: translateX(20%);
                    }
                }
            `}</style>
        </div>
    );
}
