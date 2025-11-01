import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

// ==================================================================================
// DÜZELTME: TypeScript arayüzünü, gelen gerçek "düz" veri yapısına göre güncelliyoruz.
// Artık 'attributes' sarmalayıcısı yok.
// ==================================================================================
interface FooterVerisi {
  id: number;
  adres: string;
  telefon: string;
  email: string;
  facebookLinki: string;
  twitterLinki: string;
  instagramLinki: string;
  telifHakkiMetni: string;
}

// Strapi'den veriyi çekecek olan asenkron fonksiyon
async function getFooterData() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer-bilgi`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Footer verisi çekilemedi. Status: ${res.status}`);
    }
    const jsonData = await res.json();
    // Single Type'lar veriyi { data: ... } içinde döndürür. Biz içindeki kısmı alıyoruz.
    return jsonData.data as FooterVerisi;
  } catch (error) {
    console.error("Strapi'den Footer verisi çekilirken hata oluştu:", error);
    return null;
  }
}

export default async function Footer() {
  // getFooterData'dan gelen veri artık doğrudan { id, adres, ... } şeklinde.
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }

  // ==================================================================================
  // DÜZELTME: Verileri artık 'footerData.attributes' yerine doğrudan 'footerData'dan alıyoruz.
  // ==================================================================================
  const { 
    adres, 
    telefon, 
    email, 
    facebookLinki, 
    twitterLinki, 
    instagramLinki, 
    telifHakkiMetni 
  } = footerData;

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">İletişim</h3>
          <p className="text-sm">{adres}</p>
          <p className="text-sm mt-2">Telefon: {telefon}</p>
          <p className="text-sm">E-posta: {email}</p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Hızlı Linkler</h3>
          <ul className="text-sm space-y-2">
            <li><Link href="/hakkimizda" className="hover:underline">Hakkımızda</Link></li>
            <li><Link href="/projeler" className="hover:underline">Projeler</Link></li>
            <li><Link href="/iletisim" className="hover:underline">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Bizi Takip Edin</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <Link href={facebookLinki} target="_blank" rel="noopener noreferrer">
              <Facebook className="h-6 w-6 hover:text-blue-600" />
            </Link>
            <Link href={twitterLinki} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-6 w-6 hover:text-blue-400" />
            </Link>
            <Link href={instagramLinki} target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6 hover:text-pink-500" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center text-xs mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
        <p>{telifHakkiMetni}</p>
      </div>
    </footer>
  );
}