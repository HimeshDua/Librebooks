import LoginForm from '@/components/auth/login-form';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';

export default async function LoginPage() {
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}
