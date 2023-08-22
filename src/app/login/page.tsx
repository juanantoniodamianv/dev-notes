import { AuthButtonServer } from "@/app/components/auth-button-server";

export default function Login() {
  return (
    <section className="grid place-content-center min-h-screen">
      <h3>Sign in today and get latest Dev Notes</h3>
      <AuthButtonServer />
    </section>
  );
}
