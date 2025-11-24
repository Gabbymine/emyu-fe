import { useNavigate } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#991B1B] text-[#F8F6EF] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-4 text-[#FFD4A3]">404</h1>
          <h2 className="text-4xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-xl mb-8 text-[#F8F6EF]/80">
            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#FFD4A3] text-[#991B1B] rounded-lg font-semibold hover:bg-[#FFF9F3] transition"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 border-2 border-[#FFD4A3] text-[#FFD4A3] rounded-lg font-semibold hover:bg-[#FFD4A3]/10 transition"
            >
              Lihat Produk
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
