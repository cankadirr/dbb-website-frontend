import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ==================================================================================
// ÖNEMLİ NOT: Strapi API Veri Yapısı Üzerine
// ==================================================================================
// Bu arayüz (interface), Strapi'den gelen GERÇEK veri yapısını yansıtmaktadır.
// Hata ayıklama sürecinde öğrendiğimiz gibi, Strapi'nin varsayılan olarak 
// { data: [{ id: 1, attributes: { title: "..." } }] } şeklinde bir yapı göndermesini beklerken,
// bizim API'miz doğrudan [{ id: 1, Title: "..." }] şeklinde bir dizi döndürdü.
// Bu yüzden `attributes` sarmalayıcısı YOKTUR ve alan adları BÜYÜK HARFLE başlamaktadır (PascalCase).
// Gelecekte benzer bir sorunla karşılaşırsan, ilk yapacağın şey
// `console.log(JSON.stringify(data))` ile gelen verinin yapısını kontrol etmek olmalıdır.
interface HizmetKarti {
  id: number;
  Title: string;
  Description: string;
  Link: string;
}

// Strapi'den veriyi çekecek olan asenkron fonksiyon
async function getHizmetKartlari() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hizmet-kartlari?populate=*`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Veri çekilemedi. Status: ${res.status}`);
    }
    const data = await res.json();
    
    // NOT: Gelen verinin yapısı bazen { data: [...] } içinde, bazen de doğrudan [...] şeklinde olabilir.
    // Bu satır, her iki duruma da hazırlıklı olmamızı sağlar.
    return data.data || data; 
  } catch (error) {
    console.error("Strapi'den veri çekilirken hata oluştu:", error);
    return [];
  }
}

export default async function ServiceSection() {
  const services = await getHizmetKartlari();

  if (!services || services.length === 0) {
    return <p>Hizmetler yüklenemedi veya hiç hizmet bulunmuyor.</p>;
  }

  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* NOT: Gelen veride 'attributes' olmadığı ve alan adları büyük harfle başladığı için
            doğrudan 'service.Title' ve 'service.Description' olarak erişiyoruz. */}
        {services.map((service: HizmetKarti) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{service.Title}</CardTitle>
              <CardDescription>{service.Description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="secondary" className="w-full">
                <Link href={service.Link}>Daha Fazla Bilgi</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}