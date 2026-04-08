import LoginForm from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <LoginForm
      portalTitle="Painel de Controle"
      portalSubtitle="Acesso Administrativo & Gerencial"
      allowedRoles={["ADMIN_GERAL", "GERENTE"]}
      redirectPath="/admin"
      showRequestAccess={true}
    />
  );
}
