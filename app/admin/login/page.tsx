import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0f1421 0%, #1a2035 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, #202657, #1b7eb2)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="NS BVC" className="w-10 h-10 object-contain" />
          </div>
          <h1
            className="text-white text-2xl font-black uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            Admin Panel
          </h1>
          <p className="text-white/40 text-sm mt-1">NS Beach Volleyball Club</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
