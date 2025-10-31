import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// ==================================================================================
// DÜZELTME: TypeScript arayüzünü, gelen gerçek "düz" veri yapısına göre güncelliyoruz.
// Artık 'attributes' sarmalayıcısı yok.
// ==================================================================================
interface HeroAlanVerisi {
  id: number;
  baslik: string;
  altBaslik: string;
  butonYazisi: string;
  butonLinki: string;
  arkaPlanGorseli: any; 
}

// Strapi'den "Hero Alanı" verisini çekecek olan asenkron fonksiyon
async function getHeroData() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-alani?populate=*`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Hero verisi çekilemedi. Status: ${res.status}`);
    }
    const jsonData = await res.json();
    // NOT: Single Type'lar veriyi { data: ... } içinde döndürür. Biz içindeki kısmı alıyoruz.
    return jsonData.data as HeroAlanVerisi;
  } catch (error) {
    console.error("Strapi'den Hero verisi çekilirken hata oluştu:", error);
    return null;
  }
}

export default async function HeroSection() {
  // getHeroData'dan gelen veri artık doğrudan { id, baslik, ... } şeklinde.
  const heroData = await getHeroData();

  if (!heroData) {
    return null;
  }

  // ==================================================================================
  // DÜZELTME: Verileri artık 'heroData.attributes' yerine doğrudan 'heroData'dan alıyoruz.
  // ==================================================================================
  const { baslik, altBaslik, butonYazisi, butonLinki, arkaPlanGorseli } = heroData;
  
  // Strapi'den gelen görsel URL'ini alıyoruz. Bu kısım genellikle doğru çalışır.
  const imageUrl = arkaPlanGorseli?.data?.attributes?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${arkaPlanGorseli.data.attributes.url}`
    : null;

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Diyarbakır Arka Plan Görseli"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
      )}
      
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div className="container mx-auto px-4 text-center z-20 relative">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          {baslik}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          {altBaslik}
        </p>
        <Button asChild size="lg">
          <Link href={butonLinki}>{butonYazisi}</Link>
        </Button>
      </div>
    </section>
  );
}