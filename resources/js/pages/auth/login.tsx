import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <AuthLayout
            title="Bon retour"
            description="Connectez-vous pour reprendre votre experience streaming"
        >
            <Head title="Connexion" />

            <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        {status && (
                            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-200">
                                {status}
                            </div>
                        )}

                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-zinc-200">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="h-11 rounded-xl border-white/15 bg-black/35 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:border-[#E50914] focus-visible:ring-[#E50914]/35"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-zinc-200">Mot de passe</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-zinc-300 hover:text-white"
                                            tabIndex={5}
                                        >
                                            Mot de passe oublie ?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Mot de passe"
                                    className="h-11 rounded-xl border-white/15 bg-black/35 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:border-[#E50914] focus-visible:ring-[#E50914]/35"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember" className="text-zinc-300">Se souvenir de moi</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-3 h-11 w-full rounded-xl bg-[#E50914] text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff1f2b]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Se connecter
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-zinc-300">
                                Vous n&apos;avez pas de compte ?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    S&apos;inscrire
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
