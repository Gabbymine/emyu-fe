import { useNavigate } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

interface ErrorPageProps {
  code?: number;
  title?: string;
  message?: string;
}

export default function ErrorPage({
  code = 500,
  title = "Terjadi Kesalahan",
  message = "Kami sedang mengalami masalah. Silakan coba lagi nanti.",
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#991B1B] text-[#F8F6EF] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-4 text-[#FFD4A3]">{code}</h1>
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8 text-[#F8F6EF]/80 max-w-md">{message}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#FFD4A3] text-[#991B1B] rounded-lg font-semibold hover:bg-[#FFF9F3] transition"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 border-2 border-[#FFD4A3] text-[#FFD4A3] rounded-lg font-semibold hover:bg-[#FFD4A3]/10 transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
