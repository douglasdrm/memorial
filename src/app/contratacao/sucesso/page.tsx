import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle2, MapPin, Calendar, User, Printer, ArrowRight, Download } from "lucide-react";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function ContratacaoSucessoPage({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) return <div>ID não fornecido.</div>;

  const concessao = await prisma.concessao.findUnique({
    where: { id },
    include: {
      nicho: { include: { paroquia: true } },
      usuario: true,
      memorial: true,
    }
  });

  if (!concessao) return <div className="p-20 text-center">Concessão não encontrada.</div>;

  return (
    <div className="min-h-screen bg-cream-500 font-sans py-12 px-6 flex flex-col items-center gap-10">
      
      {/* Success Badge */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 bg-sage-600 text-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-1">
            <h1 className="font-serif text-4xl text-ink-900">Reserva Confirmada</h1>
            <p className="text-ink-500 text-sm font-medium">Agradecemos a confiança. O nicho já está vinculado à sua família.</p>
        </div>
      </div>

      {/* The Receipt Structure (A4-ish look) */}
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-cream-900/30 overflow-hidden print:shadow-none print:border-none">
        {/* Receipt Header */}
        <div className="bg-cream-50/50 p-10 border-b border-cream-900/10 flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-ink-400 tracking-[0.2em]">Recibo de Concessão</span>
                <h2 className="font-serif text-3xl text-ink-900 uppercase leading-none">{concessao.nicho.paroquia.nome}</h2>
                <div className="flex items-center gap-2 text-ink-500 text-[10px] font-bold">
                    <MapPin className="w-3 h-3" /> {concessao.nicho.paroquia.endereco}
                </div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
                <span className="text-[10px] uppercase font-bold text-ink-400">Nº do Comprovante</span>
                <span className="font-serif text-xl text-ink-900">#{concessao.id.substring(0, 8).toUpperCase()}</span>
                <span className="text-[10px] font-bold text-sage-600">{new Date(concessao.dataInicio).toLocaleDateString('pt-BR')}</span>
            </div>
        </div>

        {/* Receipt Body */}
        <div className="p-10 flex flex-col gap-12">
            
            {/* Owner & Item */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase font-bold text-ink-400 tracking-widest border-b border-cream-900/20 pb-2">Informações do Titular</span>
                    <div className="flex flex-col gap-1">
                        <span className="font-serif text-lg text-ink-900">{concessao.usuario.nome}</span>
                        <span className="text-xs text-ink-500">{concessao.usuario.cpf}</span>
                        <span className="text-xs text-ink-500">{concessao.usuario.email}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase font-bold text-ink-400 tracking-widest border-b border-cream-900/20 pb-2">Detalhes da Unidade</span>
                    <div className="flex flex-col gap-1">
                        <span className="font-serif text-lg text-ink-900">Nicho {concessao.nicho.identificador}</span>
                        <span className="text-xs text-ink-500">{concessao.nicho.andar}º Pavimento</span>
                        <span className="text-sm font-bold text-sage-900 mt-2">Valor Total: R$ {concessao.nicho.preco?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            {/* Note & Security */}
            <div className="bg-cream-50 p-6 rounded-2xl border border-cream-900/20 text-xs text-ink-500 italic leading-relaxed">
                Este recibo comprova a reserva administrativa do nicho supracitado. A titularidade definitiva está sujeita à assinatura presencial do termo de concessão na secretaria paroquial em até 7 dias úteis, portando este documento e identificação original.
            </div>

            {/* Signature Area (Optional for print) */}
            <div className="hidden print:flex flex-col items-center gap-1 mt-20">
                <div className="w-64 border-t border-ink-900"></div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-ink-500">Assinatura do Titular</span>
            </div>
        </div>

        {/* Action Bar (Below the card) */}
        <div className="p-8 bg-sage-900 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 print:hidden">
            <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition"
            >
                <Printer className="w-4 h-4" /> Imprimir Comprovante
            </button>
            
            <div className="flex items-center gap-3">
                 <Link 
                    href="/portal/login"
                    className="flex items-center gap-2 bg-sage-600 hover:bg-white text-white hover:text-sage-900 px-6 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition shadow-lg"
                >
                    Acessar Meu Painel <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      </div>

      <div className="max-w-3xl w-full flex flex-col gap-6 text-center text-ink-400">
         <p className="text-xs font-medium">Um e-mail de confirmação com os detalhes foi enviado para {concessao.usuario.email}.</p>
         <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-ink-900 transition underline underline-offset-4">
                <Download className="w-3.5 h-3.5" /> Baixar PDF do Contrato
            </button>
         </div>
      </div>

    </div>
  );
}
