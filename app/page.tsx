// Sizin mevcut import'larınız:
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ServiceSection from "@/components/custom/ServiceSection";

// YENİ EKLENEN TEK SATIR:
import HeroSection from "@/components/custom/HeroSection"; 

// Sizin fonksiyon adınız korunuyor: HomePage
export default function HomePage() {
  return (
    // Sizin kullandığınız Fragment (<>) yapısı korunuyor.
    <>
      {/* 
        Eski, statik hero alanı kodunu sildik.
        Yerine, içeriğini Strapi'den alan dinamik bileşenimizi koyduk.
        Bu bileşen kendi <section> etiketini ve stillerini zaten içinde barındırıyor.
      */}
      <HeroSection />

      {/* 
        Hizmet Kartları Alanı zaten dinamikti ve olduğu gibi kalıyor.
        Bu bileşen de kendi <section> etiketini içinde barındırıyor.
      */}
      <ServiceSection />
    </>
  );
}