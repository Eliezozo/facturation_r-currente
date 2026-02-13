import { Head, Link, usePage } from '@inertiajs/react';
import { Clapperboard, Sparkles, Tv, Wifi, Zap } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { dashboard, login, register } from '@/routes';

type WelcomeProps = {
    canRegister?: boolean;
};

type AuthProps = {
    auth: {
        user?: {
            id: number;
            name: string;
        } | null;
    };
};

type ShowcaseItem = {
    title: string;
    genre: string;
    color: string;
};

const showcase: ShowcaseItem[] = [
    { title: 'Neon District', genre: 'Sci-Fi', color: 'from-rose-600/80 to-orange-500/70' },
    { title: 'Zero Hour', genre: 'Thriller', color: 'from-cyan-600/80 to-indigo-600/70' },
    { title: 'House of Waves', genre: 'Drama', color: 'from-emerald-600/80 to-teal-500/70' },
    { title: 'Last Orbit', genre: 'Action', color: 'from-violet-600/80 to-fuchsia-600/70' },
    { title: 'Cold Frequency', genre: 'Mystery', color: 'from-sky-700/80 to-blue-500/70' },
    { title: 'Velvet Ashes', genre: 'Crime', color: 'from-amber-600/80 to-red-500/70' },
];

const marquee = [...showcase, ...showcase];

export default function Welcome({ canRegister = true }: WelcomeProps) {
    const { auth } = usePage<AuthProps>().props;

    return (
        <>
            <Head title="BillApp Streaming">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=outfit:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen overflow-x-hidden bg-[#050505] font-[Outfit] text-white">
                <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_15%,rgba(229,9,20,0.25),transparent_42%),radial-gradient(circle_at_80%_5%,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.16),transparent_35%)]" />
                <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.02)_45%,transparent_52%)] [animation:sheen_8s_linear_infinite]" />

                <header className="fixed top-0 left-0 z-50 w-full px-3 pt-2">
                    <div className="flex items-center justify-between  border border-white/15 bg-black/65 px-70 py-1 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                        <div className="flex items-center gap-3 [animation:fadeUp_700ms_ease-out]">
                            <AppLogo sizeClassName="h-[5rem]" />
                        </div>

                        <nav className="flex items-center gap-3 [animation:fadeUp_900ms_ease-out]">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
                                >
                                    Ouvrir le Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
                                    >
                                        Connexion
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-full bg-[#E50914] px-5 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#ff1f2b]"
                                        >
                                                Créer un compte
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32">
                    <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0b0b0b] p-6 sm:p-8 lg:p-10">
                        <video
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1800&q=80"
                        >
                            <source
                                src="https://cdn.coverr.co/videos/coverr-audience-watching-a-movie-1579/1080p.mp4"
                                type="video/mp4"
                            />
                        </video>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(229,9,20,0.36),transparent_36%),linear-gradient(100deg,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.68)_45%,rgba(5,5,5,0.9)_100%)]" />

                        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
                        <div className="space-y-7">
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-zinc-300 [animation:fadeUp_900ms_ease-out]">
                                <Sparkles className="h-3.5 w-3.5 text-[#E50914]" />
                                Cinema digital nouvelle generation
                            </p>

                            <h1 className="text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl [animation:fadeUp_1100ms_ease-out]">
                                Streaming immersif. Transition fluide. Aucune coupure.
                            </h1>

                            <p className="max-w-2xl text-base text-zinc-300 sm:text-lg [animation:fadeUp_1250ms_ease-out]">
                                Un design premium inspire des plateformes VOD modernes: lecture instantanee,
                                recommandations intelligentes et interface ultra dynamique.
                            </p>

                            <div className="flex flex-wrap gap-4 [animation:fadeUp_1400ms_ease-out]">
                                <a
                                    href="#catalogue"
                                    className="group inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#ff1f2b]"
                                >
                                    <Clapperboard className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
                                    Explorer le catalogue
                                </a>
                                <a
                                    href="#features"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
                                >
                                    Voir les fonctionnalites
                                </a>
                            </div>
                        </div>

                        <div className="relative [animation:fadeUp_1100ms_ease-out]">
                            <div className="absolute -inset-6 rounded-[2rem] bg-[#E50914]/20 blur-3xl [animation:pulseGlow_3.2s_ease-in-out_infinite]" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-6 shadow-2xl transition-transform duration-500 hover:-translate-y-1">
                                <div className="mb-5 flex items-center justify-between text-xs text-zinc-400">
                                    <span className="inline-flex items-center gap-2">
                                        <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                                        LIVE PREVIEW
                                    </span>
                                    <span>4K + Spatial Audio</span>
                                </div>

                                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-4">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(229,9,20,0.55),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.28),transparent_40%),linear-gradient(120deg,#141414,#0a0a0a)] [animation:drift_10s_ease-in-out_infinite]" />
                                    <div className="relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
                                        <div>
                                            <div className="text-xs uppercase tracking-[0.13em] text-zinc-300">Now Streaming</div>
                                            <div className="mt-2 text-2xl font-extrabold">NEON UPRISING</div>
                                        </div>
                                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                                            <Zap className="h-3.5 w-3.5 text-yellow-400" />
                                            Recommandation IA active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>

                    <section id="catalogue" className="mt-16">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Trending Cinematic Feed</h2>
                            <span className="text-sm text-zinc-400">Flux dynamique en continu</span>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] py-5">
                            <div className="absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#121212] to-transparent" />
                            <div className="absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#121212] to-transparent" />
                            <div className="flex w-max gap-4 px-4 [animation:marquee_26s_linear_infinite] hover:[animation-play-state:paused]">
                                {marquee.map((item, index) => (
                                    <article
                                        key={`${item.title}-${index}`}
                                        className={`group relative w-[240px] overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br ${item.color} p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-white/40`}
                                    >
                                        <div className="absolute inset-0 bg-black/35 transition-opacity duration-300 group-hover:opacity-20" />
                                        <div className="relative z-10 flex h-36 flex-col justify-between">
                                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs uppercase tracking-wide">
                                                <Tv className="h-3.5 w-3.5" />
                                                {item.genre}
                                            </span>
                                            <div>
                                                <h3 className="text-lg font-bold">{item.title}</h3>
                                                <p className="mt-1 text-xs text-zinc-100/80">Lecture instantanee</p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="features" className="mt-16 grid gap-4 md:grid-cols-3">
                        {[
                            ['Streaming adaptatif', 'Qualite auto-optimisee jusqu en 4K selon votre bande passante.'],
                            ['Profils intelligents', 'Suggestions personnalisees avec historique de visionnage.'],
                            ['Synchronisation cloud', 'Reprenez instantanement sur TV, mobile et desktop.'],
                        ].map(([title, text], index) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-white/10 bg-[#141414] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E50914]/70 hover:bg-[#181818]"
                                style={{ animation: `fadeUp ${1300 + index * 120}ms ease-out` }}
                            >
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="mt-2 text-sm text-zinc-300">{text}</p>
                            </div>
                        ))}
                    </section>
                </main>
            </div>

            <style>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(16px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                @keyframes sheen {
                    from {
                        transform: translateX(-20%);
                    }
                    to {
                        transform: translateX(20%);
                    }
                }

                @keyframes drift {
                    0% {
                        transform: scale(1) translate(0, 0);
                    }
                    50% {
                        transform: scale(1.05) translate(-2%, 2%);
                    }
                    100% {
                        transform: scale(1) translate(0, 0);
                    }
                }

                @keyframes pulseGlow {
                    0% {
                        opacity: 0.45;
                    }
                    50% {
                        opacity: 0.8;
                    }
                    100% {
                        opacity: 0.45;
                    }
                }
            `}</style>
        </>
    );
}
