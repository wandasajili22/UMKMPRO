# UMKM Pro - E-commerce Solution

Platform e-commerce modern dan profesional yang dirancang khusus untuk UMKM. Dibangun dengan teknologi terbaru untuk performa maksimal, keamanan tinggi, dan skalabilitas.

## Teknologi
- **Frontend**: React 19 + TypeScript + Vite
- **Backend/DB**: Firebase (Firestore & Auth)
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Animasi**: Framer Motion

## Struktur Folder 📂
```text
/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # Auth & Cart state management
│   ├── lib/            # Firebase config & utilities
│   ├── pages/          # Full page components
│   │   ├── admin/      # Admin dashboard & management
│   │   └── ...         # Customer pages
│   ├── App.tsx         # Routing & Layout setup
│   └── main.tsx        # Entry point
├── firestore.rules     # Keamanan Database (RBAC)
├── firebase-blueprint.json # Skema Data
└── package.json        # Dependencies & Scripts
```

## Fitur Utama ✨
1. **Landing Page Premium**: Hero section dinamis, kategori, dan produk unggulan.
2. **Sistem Auth**: Registrasi dan login aman menggunakan Google atau Email.
3. **Dashboard Admin**: Statistik penjualan, pesanan terbaru, dan manajemen produk.
4. **Keranjang Belanja**: Sinkronisasi otomatis antar perangkat (jika login).
5. **Keamanan Tinggi**: Aturan Firestore (Security Rules) yang ketat berdasarkan Role (Admin/Customer).
6. **Responsive**: Tampilan optimal di Mobile, Tablet, dan Desktop.

## Panduan Instalasi Lokal 🚀
1. **Clone project** dan masuk ke direktori.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Konfigurasi Firebase**:
   Pastikan file `firebase-applet-config.json` sudah ada di root dengan data API Key dari console Firebase Anda.
4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
5. **Build untuk Production**:
   ```bash
   npm run build
   ```

## Perintah Penting (Node.js/Firebase) 🛠️
Karena project ini menggunakan stack modern (Node.js/Firebase), berikut adalah padanan perintah dari Laravel (Artisan):
- `npm run dev`: Seperti `php artisan serve`.
- `firestore.rules`: Seperti `migrations` (untuk skema & keamanan).
- `src/lib/firebase.ts`: Seperti `.env` & `config/database.php`.

---
Dibuat dengan ❤️ untuk UMKM Indonesia agar lebih Go Digital!
