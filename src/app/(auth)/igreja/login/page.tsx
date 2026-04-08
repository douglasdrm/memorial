import LoginForm from "@/components/auth/LoginForm";

export default function IgrejaLoginPage() {
  return (
    <LoginForm
      portalTitle="Painel Paroquial"
      portalSubtitle="Gestão de Nichos e Concessões"
      allowedRoles={["ADMIN_PAROQUIA", "ADMIN_GERAL"]}
      redirectPath="/igreja"
    />
  );
}
