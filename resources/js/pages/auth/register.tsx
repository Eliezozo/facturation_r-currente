import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title="Creer votre compte streaming"
            description="Demarrez votre experience premium en moins d une minute"
        >
            <Head title="Inscription" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-zinc-200">Nom complet</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Votre nom complet"
                                    className="h-11 rounded-xl border-white/15 bg-black/35 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:border-[#E50914] focus-visible:ring-[#E50914]/35"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-zinc-200">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="h-11 rounded-xl border-white/15 bg-black/35 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:border-[#E50914] focus-visible:ring-[#E50914]/35"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-zinc-200">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    className="h-11 rounded-xl border-white/15 bg-black/35 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:border-[#E50914] focus-visible:ring-[#E50914]/35"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-zinc-200">
                                    Confirmer le mot de passe
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirmer le mot de passe"
                                    className="h-11 rounded-xl border-white/15 bg-black/35 text-white placeholder:text-zinc-500 transition-all duration-300 focus-visible:border-[#E50914] focus-visible:ring-[#E50914]/35"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-3 h-11 w-full rounded-xl bg-[#E50914] text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff1f2b]"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Commencer le streaming
                            </Button>
                        </div>

                        <div className="text-center text-sm text-zinc-300">
                            Vous avez deja un compte ?{' '}
                            <TextLink href={login()} tabIndex={6} className="text-zinc-100 hover:text-white">
                                Se connecter
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
