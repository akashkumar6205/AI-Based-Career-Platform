import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage({ onSwitchToSignup, onClose, isModal = false }) {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const result = await login(email, password);
        setIsSubmitting(false);

        if (result.success) {
            if (isModal && onClose) {
                onClose();
            } else {
                navigate('/');
            }
        } else {
            setError(result.error);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setIsSubmitting(true);
        
        // In a real application, you would initialize the Google Auth SDK:
        // window.gapi.auth2.getAuthInstance().signIn() or use @react-oauth/google
        // to retrieve an idToken.
        // For development/mock purposes, we send a mock token containing the email.
        const mockEmail = email || "google.user@example.com";
        const mockIdToken = `mock-${mockEmail}`;

        const result = await googleLogin(mockIdToken);
        setIsSubmitting(false);

        if (result.success) {
            if (isModal && onClose) {
                onClose();
            } else {
                navigate('/');
            }
        } else {
            setError(result.error);
        }
    };

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent justify-center items-center w-full">
            <form
                onSubmit={handleSubmit}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius,8px)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius,8px)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            to="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                        </Link>
                        <h1 className="text-title mb-1 mt-4 text-xl font-semibold text-white">Sign In to CareerShield</h1>
                        <p className="text-sm text-gray-400">Welcome! Enter your details to get started</p>
                    </div>

                    {error && (
                        <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm text-gray-300">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-700/50 border border-gray-600 text-white"
                            />
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-title text-sm text-gray-300">
                                    Password
                                </Label>
                                <Button
                                    asChild
                                    variant="link"
                                    size="sm"
                                    className="p-0 h-auto text-emerald-400 hover:text-emerald-300">
                                    <Link
                                        to="#"
                                        className="link intent-info variant-ghost text-sm">
                                        Forgot your Password ?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                className="input sz-md variant-mixed bg-gray-700/50 border border-gray-600 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </div>

                    <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed border-gray-700" />
                        <span className="text-muted-foreground text-xs text-gray-400">Or continue With</span>
                        <hr className="border-dashed border-gray-700" />
                    </div>

                    <div className="grid grid-cols-1">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-2 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white w-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262">
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span>Google</span>
                        </Button>
                    </div>
                </div>

                <div className="p-3 bg-gray-800/50 text-center border-t border-gray-700">
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{' '}
                        {isModal && onSwitchToSignup ? (
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                                className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium bg-transparent border-none p-0 cursor-pointer"
                            >
                                Sign Up
                            </button>
                        ) : (
                            <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium">
                                Sign Up
                            </Link>
                        )}
                    </p>
                </div>
            </form>
        </section>
    );
}
