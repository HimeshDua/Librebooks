import SignUpForm from '@/components/auth/signup-form';
import Footer from '@/components/nav/footer';
import Header from '@/components/nav/header';

export default async function SignupPage() {
  return (
    <div className="container max-w-screen min-h-[94vh] mx-auto">
      <Header />
      <SignUpForm />
      <Footer />
    </div>
  );
}
