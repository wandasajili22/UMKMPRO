import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Globe, Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try { 
      setLoading(true); 
      setError("");
      await signInWithPopup(auth, new GoogleAuthProvider()); 
      navigate("/"); 
    }
    catch (e: any) { 
      console.error(e);
      setError("Gagal masuk dengan Google.");
    } finally { 
      setLoading(false); 
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try { 
      setLoading(true); 
      setError("");
      await signInWithEmailAndPassword(auth, email, password); 
      navigate("/"); 
    }
    catch (e: any) { 
      console.error(e);
      if (e.code === "auth/user-not-found" || e.code === "auth/wrong-password") {
        setError("Email atau password salah.");
      } else if (e.code === "auth/invalid-credential") {
        setError("Kredensial tidak valid.");
      } else {
        setError("Gagal masuk. Silakan periksa koneksi Anda atau daftar akun baru.");
      }
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-20 px-4">
      <div className="w-full max-w-md space-y-8 rounded-[2rem] border bg-white p-10 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-black">Selamat Datang</h2>
          <p className="text-neutral-500">Masuk untuk belanja</p>
        </div>
        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin} 
            disabled={loading} 
            className="flex w-full items-center justify-center gap-3 rounded-2xl border py-4 font-bold hover:bg-neutral-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Globe className="text-red-500"/>} Masuk dengan Google
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-400">Atau</span>
            </div>
          </div>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full rounded-2xl border bg-neutral-50 py-4 px-4 pr-4" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full rounded-2xl border bg-neutral-50 py-4 px-4 pr-4" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            {error && <p className="text-xs font-bold text-red-600">{error}</p>}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full rounded-2xl bg-neutral-900 py-4 font-bold text-white hover:bg-neutral-800"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Masuk"}
            </button>
            <p className="text-center text-sm">
              Belum punya akun? <Link to="/register" className="font-bold text-orange-600 hover:underline">Daftar</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
