import { Camera, Trash2, Loader2, ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { saveMemorialPhoto, deleteMemorialPhoto } from "@/lib/actions/memorial";

interface Props {
  memorialId: string;
  fotosIniciais: any[];
}

export default function GalleryEditor({ memorialId, fotosIniciais }: Props) {
  const [fotos, setFotos] = useState(fotosIniciais);
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fotos.length >= 10) {
        alert("O limite inicial é de 10 fotos.");
        return;
    }

    setIsUploading(true);
    
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${memorialId}/${Math.random()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        // 1. Upload para o Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('memoriais')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Pegar URL Pública
        const { data: { publicUrl } } = supabase.storage
            .from('memoriais')
            .getPublicUrl(filePath);

        // 3. Salvar no Banco via Server Action
        const novaFoto = await saveMemorialPhoto(memorialId, publicUrl);
        setFotos([...fotos, novaFoto]);

    } catch (error) {
        console.error(error);
        alert("Erro ao subir imagem. Verifique se o bucket 'memoriais' existe no seu Supabase.");
    } finally {
        setIsUploading(false);
    }
  }

  async function handleDelete(fotoId: string) {
      if (!confirm("Deseja remover esta foto da galeria?")) return;
      try {
          await deleteMemorialPhoto(memorialId, fotoId);
          setFotos(fotos.filter(f => f.id !== fotoId));
      } catch (error) {
          console.error(error);
          alert("Erro ao remover foto.");
      }
  }

  return (
    <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* Upload Button */}
            <label className={`
                aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 group transition cursor-pointer
                ${isUploading ? 'bg-cream-50 border-cream-900/30' : 'bg-cream-50 border-cream-900/50 hover:border-sage-500 hover:bg-sage-50'}
            `}>
                <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleUpload} 
                    disabled={isUploading || fotos.length >= 10}
                    accept="image/*"
                />
                {isUploading ? (
                    <Loader2 className="w-6 h-6 text-sage-600 animate-spin" />
                ) : (
                    <Camera className="w-6 h-6 text-ink-300 group-hover:text-sage-600 transition" />
                )}
                <span className="text-[8px] uppercase font-bold tracking-widest text-ink-400">
                    {isUploading ? 'Subindo...' : 'Adicionar Foto'}
                </span>
            </label>

            {/* Gallery Item Display */}
            {fotos.map((foto) => (
                <div key={foto.id} className="aspect-square bg-cream-100 rounded-2xl relative group overflow-hidden border border-cream-900/10">
                    <img src={foto.urlFoto} alt="Memorial" className="w-full h-full object-cover transition group-hover:scale-110" />
                    <div className="absolute inset-0 bg-ink-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-2">
                        <button 
                            type="button" 
                            onClick={() => handleDelete(foto.id)}
                            className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <div className="p-4 bg-sage-50 border border-sage-500/10 rounded-xl flex items-center gap-3">
            <ImageIcon className="w-4 h-4 text-sage-600" />
            <span className="text-[10px] font-bold text-sage-900/80 uppercase tracking-widest leading-none">
                Total: {fotos.length} de 10 fotos permitidas
            </span>
        </div>
    </div>
  );
}
