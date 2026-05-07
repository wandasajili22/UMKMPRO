import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Truck, ShieldCheck, ShoppingCart, Share2, Plus, Minus, Heart } from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { useCart } from "../contexts/CartContext";
import { motion } from "motion/react";

// Mock data
const PRODUCTS = [
  { id: '1', name: 'Tas Tenun Handmade', price: 250000, description: 'Tas yang dibuat dengan teknik tenun tradisional oleh pengrajin lokal. Menggunakan bahan berkualitas tinggi dan pewarna alami yang ramah lingkungan. Cocok untuk kegiatan sehari-hari maupun acara formal.', stock: 15, category: 'Aksesoris', images: ['https://picsum.photos/seed/tas/800/1000', 'https://picsum.photos/seed/tas2/800/1000'], slug: 'tas-tenun-handmade' },
  { id: '2', name: 'Kopi Arabika Gayo 250g', price: 85000, description: 'Kopi Arabika murni dari dataran tinggi Gayo, Aceh. Memiliki cita rasa yang khas dengan body yang kuat dan tingkat keasaman yang seimbang. Diproses dengan standar ekspor.', stock: 50, category: 'Kuliner', images: ['https://picsum.photos/seed/kopi/800/1000'], slug: 'kopi-arabika-gayo' },
  { id: '3', name: 'Lampu Meja Bambu', price: 175000, description: 'Lampu hias meja dari bambu pilihan. Memberikan kesan hangat dan etnik pada ruangan Anda.', stock: 10, category: 'Kriya', images: ['https://picsum.photos/seed/lampu/800/1000'], slug: 'lampu-meja-bambu' },
  { id: '4', name: 'Batik Tulis Solo', price: 450000, description: 'Kain batik tulis asli dari Solo dengan motif klasik. Dibuat secara manual selama berminggu-minggu.', stock: 5, category: 'Fashion', images: ['https://picsum.photos/seed/batik/800/1000'], slug: 'batik-tulis-solo' },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [isLiked, setIsLiked] = useState(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return wishlist.includes(product.id);
    }
    return false;
  });
  const [isSharing, setIsSharing] = useState(false);

  const handleLike = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let newWishlist;
    if (isLiked) {
      newWishlist = wishlist.filter((id: string) => id !== product.id);
    } else {
      newWishlist = [...wishlist, product.id];
    }
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: `Cek produk UMKM lokal terbaik: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (!product) {
    return <div className="py-20 text-center">Produk tidak ditemukan.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-neutral-100"
          >
            <img src={mainImage} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                    mainImage === img ? "border-orange-600" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] sm:text-xs font-bold text-orange-600">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-yellow-500">
                <Star className="h-4 w-4 fill-current" /> 4.9 <span className="hidden sm:inline">(120+ Ulasan)</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">{product.name}</h1>
            <p className="text-2xl sm:text-3xl font-black text-orange-600">{formatCurrency(product.price)}</p>
            <p className="text-sm sm:text-lg text-neutral-500 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-6 border-y border-neutral-100 py-6 sm:py-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 rounded-2xl border border-neutral-200 p-1 sm:p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-xl"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 sm:w-12 text-center text-base sm:text-lg font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-400">Stok: <span className="text-neutral-900 font-bold">{product.stock} pcs</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], quantity });
                  setQuantity(1);
                }}
                className="flex flex-grow order-1 sm:order-none items-center justify-center gap-3 rounded-2xl bg-neutral-900 py-5 font-bold text-white transition-all hover:bg-neutral-800"
              >
                <ShoppingCart className="h-5 w-5" /> Masukkan Keranjang
              </button>
              <div className="flex gap-4 order-none sm:order-none">
                <button
                  onClick={handleLike}
                  className={`flex h-[60px] w-full sm:w-[60px] items-center justify-center rounded-2xl border transition-all ${
                    isLiked 
                      ? "border-red-500 bg-red-50 text-red-500" 
                      : "border-neutral-200 text-neutral-400 hover:border-red-200 hover:text-red-500"
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className={`flex h-[60px] w-full sm:w-[60px] items-center justify-center rounded-2xl border transition-all relative ${
                    isSharing
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 text-neutral-400 hover:border-neutral-900 hover:text-neutral-900"
                  }`}
                >
                  <Share2 className="h-6 w-6" />
                  {isSharing && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-900 px-2 py-1 text-[10px] text-white whitespace-nowrap">
                      Link Disalin!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900">Gratis Ongkir</h4>
                <p className="text-xs text-neutral-500">Khusus pengiriman di Pulau Jawa</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900">Garansi Kualitas</h4>
                <p className="text-xs text-neutral-500">100% Produk asli UMKM lokal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
