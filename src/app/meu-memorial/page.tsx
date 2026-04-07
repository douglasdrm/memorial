import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { 
  Heart, 
  MessageSquare, 
  Check, 
  X, 
  Eye, 
  Calendar,
  Clock,
  ExternalLink,
  Edit2
} from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function getMyMemoriais(userId: string) {
  return await prisma.memorial.findMany({
    where: { concessao: { familiaId: userId } },
    include: {
      mensagens: {
        where: { status: "PENDENTE" },
        orderBy: { dataCriacao: "desc" }
      },
      _count: {
        select: { homenagens: true }
      }
    }
  });
}

export default async function FamiliaDashboard() {
  const session = await auth();
  const memoriais = await getMyMemoriais(session?.user?.id as string);

  async function updateMessageStatus(formData: FormData) {
      "use server";
      const id = formData.get("id") as string;
      const status = formData.get("status") as any;
      await prisma.mensagemMemorial.update({
          where: { id },
          data: { status }
      });
      revalidatePath("/meu-memorial");
  }

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Minhas Homenagens</h2>
            <p className="text-ink-500 text-sm font-medium">Gerencie as mensagens e o memorial dos seus entes queridos.</p>
      </div>

      {memoriais.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center flex flex-col items-center gap-6 border border-peach-900/10 shadow-sm">
              <div className="w-20 h-20 bg-peach-50 rounded-full flex items-center justify-center text-4xl">🤍</div>
              <p className="text-ink-500 max-w-sm">
                  Sua conta ainda não possui memoriais vinculados. <br/>
                  Entre em contato com sua paróquia para ativar seu acesso.
              </p>
          </div>
      ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {memoriais.map((m) => (
                  <div key={m.id} className="flex flex-col gap-8 bg-white p-10 rounded-[3rem] border border-peach-900/10 shadow-lg relative overflow-hidden group">
                      
                      {/* Memorial Info */}
                      <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-2">
                              <h3 className="font-serif text-3xl text-ink-900">{m.nomeFalecido}</h3>
                              <div className="flex items-center gap-2 text-ink-400 text-[10px] font-bold uppercase tracking-widest">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {m.dataFalecimento ? new Date(m.dataFalecimento).toLocaleDateString('pt-BR') : '--'}
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <Link 
                                href={`/memorial/${m.concessaoId}`} 
                                target="_blank"
                                className="p-3 bg-peach-50 rounded-2xl text-peach-600 hover:bg-peach-600 hover:text-white transition-all shadow-sm"
                              >
                                  <ExternalLink className="w-5 h-5" />
                              </Link>
                          </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                           <div className="bg-peach-50/50 p-4 rounded-2xl flex items-center gap-3">
                                <Heart className="w-5 h-5 text-peach-500" />
                                <div className="flex flex-col leading-none">
                                    <span className="text-[9px] uppercase font-bold text-ink-400 tracking-widest">Tributos</span>
                                    <span className="text-lg font-serif">{m._count.homenagens}</span>
                                </div>
                           </div>
                           <div className="bg-white border border-peach-900/10 p-4 rounded-2xl flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-ink-300" />
                                <div className="flex flex-col leading-none">
                                    <span className="text-[9px] uppercase font-bold text-ink-400 tracking-widest">Pendentes</span>
                                    <span className="text-lg font-serif">{m.mensagens.length}</span>
                                </div>
                           </div>
                      </div>

                      {/* Moderation Section */}
                      <div className="flex flex-col gap-6 pt-6 border-t border-peach-900/10">
                           <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-ink-400">Novas Mensagens para Aprovar</h4>
                           
                           {m.mensagens.length === 0 ? (
                               <p className="text-xs text-ink-400 italic">Nenhuma mensagem nova aguardando aprovação.</p>
                           ) : (
                               <div className="flex flex-col gap-4">
                                   {m.mensagens.map((msg) => (
                                       <div key={msg.id} className="p-6 bg-peach-50/30 rounded-[2rem] border border-peach-900/10 flex flex-col gap-4">
                                           <div className="flex items-center justify-between">
                                               <span className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Enviado por: {msg.autor}</span>
                                               <span className="text-[9px] text-ink-400">{new Date(msg.dataCriacao).toLocaleDateString('pt-BR')}</span>
                                           </div>
                                           <p className="text-sm italic text-ink-700 leading-relaxed">"{msg.conteudo}"</p>
                                           <div className="flex items-center gap-3 pt-2">
                                               <form action={updateMessageStatus} className="flex-1">
                                                   <input type="hidden" name="id" value={msg.id} />
                                                   <input type="hidden" name="status" value="APROVADO" />
                                                   <button type="submit" className="w-full bg-peach-600 hover:bg-peach-900 text-white py-3 rounded-xl text-[9px] uppercase font-bold tracking-widest transition flex items-center justify-center gap-2">
                                                       <Check className="w-3.5 h-3.5" /> Aprovar e Publicar
                                                   </button>
                                               </form>
                                               <form action={updateMessageStatus}>
                                                   <input type="hidden" name="id" value={msg.id} />
                                                   <input type="hidden" name="status" value="REJEITADO" />
                                                   <button type="submit" className="px-5 border border-red-200 text-red-400 hover:bg-red-50 py-3 rounded-xl transition text-[9px] uppercase font-bold tracking-widest">
                                                       <X className="w-3.5 h-3.5" />
                                                   </button>
                                               </form>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                           )}
                      </div>

                  </div>
              ))}
          </div>
      )}

    </div>
  );
}
