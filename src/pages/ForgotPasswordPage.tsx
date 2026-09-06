import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@services/authService';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setMessage('Password reset link sent to your email. Check your inbox!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.message || 'Failed to send reset link');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Reset Password</h1>
        <p className="text-center text-gray-500 mb-8">Enter your email to receive a reset link</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />

          <Button type="submit" isLoading={loading} className="w-full">
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
