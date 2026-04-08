import LoginForm from "@/components/auth/LoginForm";

export default function PortalLoginPage() {
  return (
    <LoginForm
      portalTitle="Portal da Família"
      portalSubtitle="Acesso ao Memorial e Homenagens"
      allowedRoles={["FAMILIA", "ADMIN_GERAL"]}
      redirectPath="/meu-memorial"
    />
  );
}
