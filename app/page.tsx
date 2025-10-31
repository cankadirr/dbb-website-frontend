import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">
        Diyarbakır Büyükşehir Belediyesi
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Yeni Kurumsal Web Sitesi Projesi Başladı
      </p>
      <Button className="mt-4 transition-colors hover:bg-white hover:text-black">Burası Bir Buton</Button>
    </main>
  );
}
