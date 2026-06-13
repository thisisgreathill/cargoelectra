import React, { useState } from 'react';
import { 
  PlusCircle, MapPin, Truck, FileText, UserCheck, ShieldAlert, CreditCard, 
  ChevronRight, ArrowRight, DollarSign, Clock, Navigation, Check, Download, Map
} from 'lucide-react';
import { Business, Job, Driver } from '../types';

interface CompanyPortalProps {
  business: Business;
  jobs: Job[];
  drivers: Driver[];
  onPostJob: (jobData: Omit<Job, 'id' | 'companyId' | 'companyName' | 'createdAt' | 'status'>) => void;
  onCancelJob: (jobId: string) => void;
}

export default function CompanyPortal({
  business,
  jobs,
  drivers,
  onPostJob,
  onCancelJob
}: CompanyPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'post' | 'active' | 'drivers' | 'invoices'>('dashboard');
  
  // Job Post State
  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const [cargoType, setCargoType] = useState('Parcels (Boxes & Documents)');
  const [vehicle, setVehicle] = useState<'scooter' | 'bike' | 'car' | 'van'>('scooter');
  const [timeWindow, setTimeWindow] = useState('Bugün, 15:00 - 18:00');
  const [weight, setWeight] = useState('10 kg');
  const [price, setPrice] = useState('25.00');
  const [instructions, setInstructions] = useState('');
  const [jobPosted, setJobPosted] = useState(false);

  // Filter jobs for this company
  const companyJobs = jobs.filter(j => j.companyId === business.id);
  const pendingJobs = companyJobs.filter(j => j.status === 'pending');
  const inProgressJobs = companyJobs.filter(j => j.status === 'in_progress');
  const assignedJobs = companyJobs.filter(j => j.status === 'assigned');
  const completedJobs = companyJobs.filter(j => j.status === 'completed');

  // Spent sum
  const spentThisMonth = completedJobs.reduce((sum, j) => sum + j.price, 0);

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickup && delivery && weight) {
      onPostJob({
        pickupAddress: pickup,
        deliveryAddress: delivery,
        cargoType,
        vehicleNeeded: vehicle,
        dateTimeWindow: timeWindow,
        price: parseFloat(price) || 25,
        weight,
        instructions
      });
      setPickup('');
      setDelivery('');
      setInstructions('');
      setJobPosted(true);
      setTimeout(() => {
        setJobPosted(false);
        setActiveTab('active');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#030712] border-r border-white/5 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          
          {/* Business Profile */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-lg font-bold">
              {business.name[0]}
            </div>
            <div>
              <span className="font-medium text-sm text-white block truncate max-w-[140px]">{business.name}</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Şirket Portalı</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Ulaşım Tablosu
            </button>
            <button
              onClick={() => setActiveTab('post')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'post' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Yeni Sevk Talebi +
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition relative ${
                activeTab === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              canlı sevk takip
              {(inProgressJobs.length + assignedJobs.length) > 0 && (
                <span className="absolute right-4 top-3 bg-emerald-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {inProgressJobs.length + assignedJobs.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'drivers' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sürücü Listem
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'invoices' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Faturalandırma
            </button>
          </nav>
        </div>

        {/* Info */}
        <div className="pt-6 border-t border-white/5 text-[9px] text-gray-500 font-mono space-y-1">
          <div>OIB: {business.oib}</div>
          <div>PLAN: {business.plan.toUpperCase()}</div>
          <div>BÖLGE: {business.city}, HR</div>
        </div>
      </aside>

      {/* PORTAL MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* ==================== DASHBOARD TAB ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase">ÖZET PROGRAM</span>
                <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Lojistik İzleme</h1>
              </div>
              <button
                onClick={() => setActiveTab('post')}
                className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                Sipariş Talebi Gir
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">AKTİF SEVK SAYISI</span>
                <div className="text-3xl font-bold text-white font-mono">{inProgressJobs.length + assignedJobs.length}</div>
                <p className="text-[10px] text-gray-500 leading-none">Bugün yolda olan taşımalar.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">BEKLEYEN EŞLEŞMELER</span>
                <div className="text-3xl font-bold text-cyan-400 font-mono">{pendingJobs.length}</div>
                <p className="text-[10px] text-gray-500 leading-none">Onay bekleyen sevkler.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">AYLIK HARCAMA</span>
                <div className="text-3xl font-bold text-[#39FF14] font-mono">€{spentThisMonth.toLocaleString()}</div>
                <p className="text-[10px] text-gray-500 leading-none">Tamamlanan işlerin toplamı.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">PAKET INTEGRITY</span>
                <div className="text-sm font-semibold text-emerald-400 truncate mt-1">
                  {business.plan.toUpperCase()} PLAN
                </div>
                <p className="text-[10px] text-gray-500 leading-none">Aylık faturalandırma aktiftir.</p>
              </div>

            </div>

            {/* Active Shipments overview */}
            <div className="liquid-glass border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-6">Mevcut Sevk Durum Başlıkları</h3>
              {companyJobs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-mono text-xs">
                  Sisteme tanımlı hiçbir nakliye kaydınız bulunmamaktadır.
                </div>
              ) : (
                <div className="space-y-4">
                  {companyJobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="p-4 rounded-xl bg-black border border-white/15 flex justify-between items-center text-xs font-mono">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{job.cargoType}</span>
                          <span className="text-[10px] bg-white/5 border border-white/10 text-gray-400 rounded px-1">{job.id}</span>
                        </div>
                        <p className="text-gray-400 font-light text-[11px]">Varış: {job.deliveryAddress}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[#39FF14] block">€{job.price}</span>
                        <span className={`text-[9px] uppercase tracking-wider ${
                          job.status === 'completed' ? 'text-emerald-400' :
                          job.status === 'in_progress' ? 'text-amber-400' : 'text-gray-400'
                        }`}>{job.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== POST JOB TAB ==================== */}
        {activeTab === 'post' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase">YENİ NAKLİYE GİRİŞİ</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Sevk Formu</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Her yeni sevk talebi, CargoElectra kurye havuzunun Zagreb, Rijeka veya Split bölgelerine anında iletilir ve merkez ofis tarafından onaylı bir şoföre atanır.
              </p>
            </div>

            <div className="max-w-3xl liquid-glass border border-white/5 p-8 rounded-3xl">
              {jobPosted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg text-white font-medium">Sipariş Talebiniz Alındı!</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Kargo sevk talebi başarıyla işlendi. CargoElectra yöneticileri 5-15 dakika içinde en uygun sürücüyü konuma yönlendirip sizinle irtibata geçecektir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitJob} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-400">YÜKLEME (ALIM) ADRESİ</label>
                      <input 
                        type="text" 
                        required
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Örn: Radnička cesta 52, Zagreb"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-400">TESLİMAT ADRESİ</label>
                      <input 
                        type="text" 
                        required
                        value={delivery}
                        onChange={(e) => setDelivery(e.target.value)}
                        placeholder="Örn: Ilica 10, Zagreb"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-400">YÜK / KARGO TÜRÜ</label>
                      <select 
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Parcels (Boxes & Documents)">E-Ticaret Paketleri / Kutular</option>
                        <option value="Fresh Produce / Frozen Seafood">Soğuk Hava Gıda / Deniz Mahsulleri</option>
                        <option value="Automotive Parts & Assemblies">Oto Yedek Parça / Paletler</option>
                        <option value="Documents & Mail">Gizli Evrak / Dosya</option>
                        <option value="Other">Diğer Malzemeler</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-gray-400">GEREKLİ TASİT TÜRÜ</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['scooter', 'bike', 'car', 'van'].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setVehicle(v as any)}
                            className={`p-2.5 rounded-lg text-[10px] font-mono border text-center cursor-pointer uppercase transition ${
                              vehicle === v ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-black border-white/10 text-gray-400'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gray-400">TESLİMAT ZAMAN ARALIĞI</label>
                      <input 
                        type="text" 
                        required
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gray-400">TAHMİNİ AĞIRLIK</label>
                      <input 
                        type="text" 
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase text-gray-400">DENGE FİYATI (EUR)</label>
                      <input 
                        type="text" 
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-gray-400">ÖZEL TALİMATLAR / SÜRÜCÜ NOTU</label>
                    <textarea 
                      rows={3}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Örn: Hassas cam ürünler barındırır, soğuk hava dengesi sarsılmasın."
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-0"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-white hover:bg-gray-200 text-black py-4 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    Sevk Talebini Onayla
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              )}
            </div>
          </div>
        )}

        {/* ==================== ACTIVE WATCH TRACK TAB ==================== */}
        {activeTab === 'active' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase">COĞRAFİ MERKEZ</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Canlı GPS Sevk Takibi</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Yola çıkan sürücülerinizin anlık koordinatlarını interaktif haritamız yardımıyla izleyebilirsiniz. Şoförlerin şahsi telefon numaraları koruma altındadır.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Tracker Map Mock */}
              <div className="lg:col-span-8 p-6 rounded-2xl border border-white/5 bg-[#030712] flex flex-col justify-between min-h-[400px]">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono text-gray-400 block uppercase">Canlı Pozisyon Map Onerısı</span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      BAĞLANTI AKTİF
                    </span>
                  </div>
                  
                  {/* Vector map display */}
                  <div className="h-64 border border-white/10 rounded-xl relative overflow-hidden bg-[#0A0F1E] flex items-center justify-center">
                    
                    {/* Abstract Highway Lines representation */}
                    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0,20 Q 50,80 100,30" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" />
                      <path d="M 0,70 L 100,40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" />
                      <circle cx="50" cy="55" r="3" fill="#00BFFF" opacity="0.6" />
                      <circle cx="35" cy="40" r="2" fill="#06B6D4" opacity="0.6" />
                      <circle cx="80" cy="20" r="4" fill="#39FF14" opacity="0.4" />
                    </svg>

                    {/* Roving marker pins */}
                    {(assignedJobs.length + inProgressJobs.length) > 0 ? (
                      <div className="relative text-center space-y-2 z-10">
                        <Navigation className="w-8 h-8 text-emerald-400 animate-bounce mx-auto" />
                        <p className="text-xs font-mono font-bold text-white">HIRVATİSTAN LOJİSTİK SÜRÜCÜSÜ</p>
                        <p className="text-[10px] text-gray-400 font-light max-w-xs leading-none">
                          Hırvatistan sınırlarında 1 aktif araç ve sürücü otonom olarak sisteme sinyal gönderiyor.
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 font-mono text-xs z-10">Harita ağında şu an hareket halinde araç bulunmuyor...</p>
                    )}

                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-500 font-mono leading-relaxed">
                  💡 Sürücülerimizin GPS bilgileri saniyede bir güncellenir. Teslimat sırasında herhangi bir kesinti olması durumunda sisteme entegre kurye sigortası derhal rücu operasyonunu başlatır.
                </div>
              </div>

              {/* Status List */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-xs font-mono uppercase text-gray-400">SEVK TAKİP DEKONTU</h3>
                {companyJobs.filter(j => j.status !== 'completed').map((job) => (
                  <div key={job.id} className="p-4 rounded-xl border border-white/5 bg-[#030712] space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-400 uppercase">{job.id}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-300 uppercase font-bold">{job.status}</span>
                    </div>
                    <div className="text-xs font-semibold text-white">{job.cargoType}</div>
                    <p className="text-[10px] text-gray-400 font-light truncate leading-none">Atanan Driver: {job.driverName || 'Atama Bekleniyor'}</p>
                    {job.driverPhone && <p className="text-[10px] text-gray-500 font-mono leading-none">Sürücü İrtibat: {job.driverPhone}</p>}
                    
                    {job.status === 'pending' && (
                      <button 
                        onClick={() => onCancelJob(job.id)}
                        className="w-full text-center py-2 bg-red-950/40 hover:bg-red-900/20 text-red-400 rounded-lg text-[10px] font-semibold cursor-pointer border border-red-500/10"
                      >
                        Sevk Kaydını İptal Et
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ==================== DRIVERS LIST TAB ==================== */}
        {activeTab === 'drivers' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase">ÖZEL HAVUZ</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">CargoElectra Sürücü Ağım</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Şirketinizin teslimatlarında öncelikli olarak görev alan, verifications süreçleri CargoElectra tarafından tamamlanmış özel kurye listeniz aşağıda gösterilmiştir.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.filter(d => d.status === 'active').map((drv) => (
                <div key={drv.id} className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 font-mono font-bold">
                      {drv.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{drv.name}</h4>
                      <span className="text-[10px] text-gray-400 font-mono block">Konum: {drv.city}, HR</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-white/5 pt-4">
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase">RATING</span>
                      <span className="text-white">⭐ {drv.rating} / 5</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase">ARAÇ TİPİ</span>
                      <span className="text-white uppercase">{drv.vehicleType}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-500 block leading-none font-mono">İlave iletişim süreçleri için CargoElectra B2B kargo masası ile temas kurun.</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== INVOICES TAB ==================== */}
        {activeTab === 'invoices' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase">MALİ DETAYLAR</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Aylık Rapor ve Faturalarım</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                CargoElectra d.o.o. tarafından her ay sonunda kesilen e-fatura detaylarınızı ve sevk raporlarınızı PDF olarak indirebilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-8 space-y-4">
                <h3 className="text-md font-medium text-white">Fatura Geçmişi</h3>
                
                <div className="p-5 rounded-2xl border border-white/5 bg-[#030712] flex justify-between items-center text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-white block font-semibold">INV-2026-6-CE_BIZ_01</span>
                    <span className="text-gray-500 block text-[10px]">Tarih: 01.06.2026 | Wolt/B2B Cargo faturaları</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-white font-bold block">€{spentThisMonth.toLocaleString()}</span>
                      <span className="text-emerald-400 block text-[10px]">ÖDENDİ</span>
                    </div>
                    <button className="p-2.5 bg-white text-black hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-white/5 bg-[#030712] flex justify-between items-center text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-white block font-semibold">INV-2026-5-CE_BIZ_01</span>
                    <span className="text-gray-500 block text-[10px]">Tarih: 01.05.2026 | Wolt/B2B Cargo faturaları</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-white font-bold block">€450.00</span>
                      <span className="text-emerald-400 block text-[10px]">ÖDENDİ</span>
                    </div>
                    <button className="p-2.5 bg-white text-black hover:bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Billing right stats */}
              <div className="md:col-span-4 p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-6">
                <h3 className="text-md font-medium text-white">Ödeme Koşulları</h3>
                <div className="space-y-4 text-xs font-light text-gray-300">
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] text-gray-500">CARGOELECTRA OIB VERGİ HESABI</span>
                    <p className="font-mono text-xs text-white">HR12485960381</p>
                  </div>
                  <p>• Ödemelerinizi vadeli sözleşmeler çerçevesinde her ayın 5. gününe kadar banka transferi ile yapabilirsiniz.</p>
                  <p>• Geciken ödemelerde günlük %0.02 yasal faiz oranı uygulanacaktır.</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
