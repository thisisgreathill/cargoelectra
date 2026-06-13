import React, { useState } from 'react';
import { 
  User, MapPin, DollarSign, Calendar, Upload, Shield, Clock, HelpCircle, 
  MessageSquare, Send, CheckCircle2, AlertCircle, Trash2, Key, Truck, ChevronRight
} from 'lucide-react';
import { Driver, Job, Vehicle, ChatMessage } from '../types';

interface DriverPortalProps {
  driver: Driver;
  jobs: Job[];
  vehicles: Vehicle[];
  chatMessages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  onUpdateJobStatus: (jobId: string, status: Job['status']) => void;
  onUploadDocument: (docKey: keyof Driver['documents']) => void;
  onReturnVehicle: (vehicleId: string) => void;
}

export default function DriverPortal({
  driver,
  jobs,
  vehicles,
  chatMessages,
  onSendMessage,
  onUpdateJobStatus,
  onUploadDocument,
  onReturnVehicle
}: DriverPortalProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'routes' | 'earnings' | 'documents' | 'vehicle' | 'support'>('dashboard');
  const [chatInput, setChatInput] = useState('');

  // Get active routes for this driver
  const driverJobs = jobs.filter(j => j.driverId === driver.id);
  const activeRoutes = driverJobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled');
  const completedCount = driverJobs.filter(j => j.status === 'completed').length;

  const currentRentedVehicle = vehicles.find(v => v.id === driver.vehicleId);

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      onSendMessage(chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#030712] border-r border-white/5 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          
          {/* Sürücü Profil Kartı */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 text-lg font-bold">
              {driver.name[0]}
            </div>
            <div>
              <span className="font-medium text-sm text-white block">{driver.name}</span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Sürücü Portalı</span>
            </div>
          </div>

          {/* Menü Ağacı */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'dashboard' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition relative ${
                activeTab === 'routes' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Rotalarım
              {activeRoutes.length > 0 && (
                <span className="absolute right-4 top-3 bg-cyan-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeRoutes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'earnings' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Kazanç Raporu
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition relative ${
                activeTab === 'documents' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Evraklarım
              {(!driver.documents.idUploaded || !driver.documents.licenseUploaded || !driver.documents.workPermitUploaded) && (
                <span className="absolute right-4 top-3 bg-amber-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  !
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('vehicle')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'vehicle' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Kiralık Aracım
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'support' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Admin Canlı Destek
            </button>
          </nav>
        </div>

        {/* Cihaz/Durum Bilgisi */}
        <div className="pt-6 border-t border-white/5 text-[9px] text-gray-500 font-mono space-y-1">
          <div>OIB: HR9274581002</div>
          <div>LİSANS SÜRÜMÜ: v1.1.2</div>
          <div>BÖLGE: {driver.city}, HR</div>
        </div>
      </aside>

      {/* PORTAL MAIN AREA */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* ==================== DASHBOARD TAB ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">YÖNETİM PANELİ</span>
                <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Sürücü Özeti</h1>
              </div>
              <div className="flex gap-4 font-mono text-xs">
                <span className="px-3 py-1 bg-emerald-950/30 text-emerald-400 border border-emerald-500/10 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  GÖREV ALMAYA HAZIR
                </span>
                <span className="px-3 py-1 bg-cyan-950/30 text-cyan-400 border border-cyan-500/10 rounded-full">
                  Puan: {driver.rating} ★
                </span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">BU AY KAZANILAN</span>
                <div className="text-3xl font-bold text-[#39FF14] font-mono">€{driver.earningsThisMonth.toLocaleString()}</div>
                <p className="text-[10px] text-gray-500 leading-none">Cuma günleri net hakedişiniz yatar.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">SEVK KAPSAMI</span>
                <div className="text-3xl font-bold text-white font-mono">{completedCount} / {driverJobs.length}</div>
                <p className="text-[10px] text-gray-500 leading-none">Tamamlanan kargo teslimatlarınız.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">KİRALIK ARAÇ</span>
                <div className="text-lg font-semibold text-cyan-400 truncate mt-1">
                  {currentRentedVehicle ? currentRentedVehicle.name : 'Yok (Yedeksiz Sürüş)'}
                </div>
                <p className="text-[10px] text-gray-500 leading-none">Haftalık mahsuplaşma aktiftir.</p>
              </div>

            </div>

            {/* Today's Tasks */}
            <div className="liquid-glass border border-white/5 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-medium text-white mb-6">Bugün Gerçekleştirilecek Sevkler</h3>
              {activeRoutes.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="p-3 bg-white/5 rounded-full w-fit mx-auto text-gray-500">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-md text-white font-normal">Tüm Rotalarınız Tamamlandı!</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Şu an adınıza atanmış bekleyen sevk bulunmuyor. Yeni bir teslimat faturası geldiğinde kargo merkezi sizi yönlendirecektir.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeRoutes.map((job) => (
                    <div key={job.id} className="p-5 rounded-xl bg-black border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-900/30 text-cyan-300 font-mono font-bold uppercase">{job.id}</span>
                          <span className="text-xs text-gray-400 font-mono italic">{job.dateTimeWindow}</span>
                        </div>
                        <div className="text-sm font-medium text-white">{job.cargoType} ({job.weight})</div>
                        <div className="space-y-1 text-xs text-gray-400 font-light">
                          <p>🎯 <span className="font-semibold text-gray-300">YÜKLEME:</span> {job.pickupAddress}</p>
                          <p>🏁 <span className="font-semibold text-gray-300">TESLİMAT:</span> {job.deliveryAddress}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                        <div className="text-md font-bold text-white font-mono">Hakediş: €{job.price}</div>
                        <div className="flex gap-2">
                          {job.status === 'assigned' && (
                            <button
                              onClick={() => onUpdateJobStatus(job.id, 'in_progress')}
                              className="px-4 py-2 bg-cyan-500 text-black hover:bg-cyan-400 text-xs font-semibold rounded-lg cursor-pointer"
                            >
                              Yola Çıktım
                            </button>
                          )}
                          {job.status === 'in_progress' && (
                            <button
                              onClick={() => onUpdateJobStatus(job.id, 'completed')}
                              className="px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-semibold rounded-lg cursor-pointer"
                            >
                              Teslim Ettim
                            </button>
                          )}
                          <span className={`text-[10px] uppercase font-mono px-2 py-1 rounded inline-block ${
                            job.status === 'in_progress' ? 'bg-amber-400/20 text-amber-400' : 'bg-gray-800 text-gray-400'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== ACTIVE ROUTES TAB ==================== */}
        {activeTab === 'routes' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">COĞRAFİ ATAŞMANLAR</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Aktif ve Geçmiş Sevk Rotaları</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Route list */}
              <div className="lg:col-span-12 space-y-4">
                {driverJobs.map((job) => (
                  <div key={job.id} className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] border border-white/10 px-2 py-0.5 rounded font-mono text-white bg-black uppercase">{job.id}</span>
                        <span className="text-xs text-gray-400">{job.createdAt.slice(0, 10)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-gray-400 font-light">Ödeme:</span>
                        <span className="text-[#39FF14] font-semibold">€{job.price}</span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          job.status === 'completed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' :
                          job.status === 'cancelled' ? 'bg-red-950/40 text-red-400' : 'bg-amber-950/40 text-amber-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-md font-medium text-white">{job.cargoType}</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-gray-300">
                      <div className="space-y-2 border-r border-white/5 pr-4">
                        <p className="font-semibold text-gray-400 font-mono text-[10px] uppercase">YÜKLEME NOKTASI</p>
                        <p>{job.pickupAddress}</p>
                        {job.instructions && <p className="text-[11px] text-cyan-400 italic font-mono">NOT: {job.instructions}</p>}
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-400 font-mono text-[10px] uppercase">TESLİMAT NOKTASI</p>
                        <p>{job.deliveryAddress}</p>
                      </div>
                    </div>

                    {job.status !== 'completed' && job.status !== 'cancelled' && (
                      <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                        {job.status === 'assigned' && (
                          <button
                            onClick={() => onUpdateJobStatus(job.id, 'in_progress')}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Rotalamayı Başlat (Yola Başla)
                          </button>
                        )}
                        {job.status === 'in_progress' && (
                          <button
                            onClick={() => onUpdateJobStatus(job.id, 'completed')}
                            className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Teslimatı Kapat (Fatura Çıkar)
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {driverJobs.length === 0 && (
                  <div className="text-center py-24 text-gray-500 bg-[#030712] rounded-2xl border border-white/5">
                    Halkımızda hiçbir rota kaydı bulunamadı.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== MY EARNINGS TAB ==================== */}
        {activeTab === 'earnings' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">FİNANSAL GÜVENCE</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Ödeme ve Hakediş Detayları</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-8 space-y-6">
                
                {/* Board */}
                <div className="p-8 rounded-2xl border border-white/5 bg-[#030712] space-y-6">
                  <h3 className="text-lg font-medium text-white">Bu Haftaki Hak Ediş İcmali</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5 text-center sm:text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-mono uppercase">BRÜT HAKEDİŞ</span>
                      <span className="text-2xl font-bold text-white font-mono">€{(driver.earningsThisMonth * 1.08).toFixed(0)}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-mono uppercase">AGENCY CUT (%8)</span>
                      <span className="text-2xl font-bold text-red-400 font-mono">- €{(driver.earningsThisMonth * 0.08).toFixed(0)}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 font-mono uppercase">HESABA GEÇEN NET</span>
                      <span className="text-2xl font-bold text-[#39FF14] font-mono">€{driver.earningsThisMonth.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl text-xs text-gray-400 leading-relaxed font-light">
                    ⚠️ <span className="font-semibold text-white">Lütfen dikkat:</span> Vergileriniz, SGK işveren payları ve kaskolarınız CargoElectra d.o.o. tarafından resmen yatırılmakta olup, yukarıda gösterilen net ücret cuma günleri banka hesabınıza yatırılacak kesin meblağdır.
                  </div>
                </div>

                {/* History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Geçmiş Ödeme Dekontları</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-white/5 bg-[#030712] flex justify-between items-center text-xs font-mono">
                      <div className="space-y-1">
                        <span className="text-white">MAAŞ_ÖDEMESİ_05_HZRN</span>
                        <span className="text-gray-500 block text-[10px]">Taksit Aralığı: 29.05 - 04.06.2026</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#39FF14] font-bold block">€420.00</span>
                        <span className="text-emerald-400 block text-[10px]">ÖDENDİ</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-[#030712] flex justify-between items-center text-xs font-mono">
                      <div className="space-y-1">
                        <span className="text-white">MAAŞ_ÖDEMESİ_29_MYS</span>
                        <span className="text-gray-500 block text-[10px]">Taksit Aralığı: 22.05 - 28.05.2026</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#39FF14] font-bold block">€395.00</span>
                        <span className="text-emerald-400 block text-[10px]">ÖDENDİ</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right column: Bank logs */}
              <div className="md:col-span-4 p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-6">
                <h3 className="text-md font-medium text-white">Banka Tanımı</h3>
                <div className="space-y-3 text-xs">
                  <p className="text-gray-400 font-light">Maaşınızın yatırılacağı resmi banka hesabı:</p>
                  <div className="p-3 bg-black rounded-lg text-xs font-mono text-gray-300 space-y-1">
                    <p className="font-semibold text-white">Zagrebačka Banka d.d.</p>
                    <p>IBAN: HR92 2440 0093 1827 49</p>
                    <p>ALICI: {driver.name}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono block">IBAN değişikliği taleplerinizi destek hattından iletebilirsiniz.</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== DOCUMENTS TAB ==================== */}
        {activeTab === 'documents' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">MEVZUATSAL KONTROL</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Yasal Belgeler & Onaylar</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Hırvatistan çalışma hukukuna uyumluluk için bu belgelerin asıllarını sisteme yüklemeniz zorunludur. Yanlış evrak durumlarında hesap kapatılır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] flex flex-col justify-between h-48">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">BELGE 01</span>
                  <h4 className="text-sm font-medium text-white">Kimlik Belgesi / Pasaport</h4>
                  <p className="text-gray-500 text-xs mt-1 font-light">Ön ve arka yüz okunaklı şekilde taranmalıdır.</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${driver.documents.idUploaded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {driver.documents.idUploaded ? 'YÜKLENDİ' : 'EKSİK'}
                  </span>
                  {!driver.documents.idUploaded && (
                    <button 
                      onClick={() => onUploadDocument('idUploaded')}
                      className="p-2 bg-white text-black hover:bg-gray-200 rounded-lg text-xs cursor-pointer"
                    >
                      Yükle
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] flex flex-col justify-between h-48">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">BELGE 02</span>
                  <h4 className="text-sm font-medium text-white">Sürücü Ehliyeti</h4>
                  <p className="text-gray-500 text-xs mt-1 font-light">Hırvatistan'da geçerli lisans veya AB denkliği.</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${driver.documents.licenseUploaded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {driver.documents.licenseUploaded ? 'YÜKLENDİ' : 'EKSİK'}
                  </span>
                  {!driver.documents.licenseUploaded && (
                    <button 
                      onClick={() => onUploadDocument('licenseUploaded')}
                      className="p-2 bg-white text-black hover:bg-gray-200 rounded-lg text-xs cursor-pointer"
                    >
                      Yükle
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] flex flex-col justify-between h-48">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">BELGE 03</span>
                  <h4 className="text-sm font-medium text-white">Çalışma ve Oturum İzni</h4>
                  <p className="text-gray-500 text-xs mt-1 font-light">Yabancı uyruklu sürücüler için (Radna Dozvola).</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${driver.documents.workPermitUploaded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {driver.documents.workPermitUploaded ? 'YÜKLENDİ' : 'EKSİK'}
                  </span>
                  {!driver.documents.workPermitUploaded && (
                    <button 
                      onClick={() => onUploadDocument('workPermitUploaded')}
                      className="p-2 bg-white text-black hover:bg-gray-200 rounded-lg text-xs cursor-pointer"
                    >
                      Yükle
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== MY VEHICLE RENTAL TAB ==================== */}
        {activeTab === 'vehicle' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">FLEET INVENTORY</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Ticari Kiralama Bilgilerim</h1>
            </div>

            {currentRentedVehicle ? (
              <div className="liquid-glass border border-white/5 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 h-48 rounded-xl overflow-hidden">
                    <img 
                      src={currentRentedVehicle.image} 
                      alt={currentRentedVehicle.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase block">{currentRentedVehicle.type} kiralama aktif</span>
                      <h3 className="text-xl font-normal text-white">{currentRentedVehicle.name}</h3>
                      <p className="text-xs text-gray-400 font-light mt-1">{currentRentedVehicle.specs}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-white/5 pt-4">
                      <div>
                        <span className="text-gray-500 block uppercase text-[10px]">ÖDEME MODELİ</span>
                        <span className="text-white block font-semibold">Cuma Hakedişinden Tahsil</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block uppercase text-[10px]">HAFTALIK ÇALIŞMA TARİFESİ</span>
                        <span className="text-[#39FF14] block font-semibold">€{currentRentedVehicle.weeklyPrice} / Hafta</span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button 
                        onClick={() => onReturnVehicle(currentRentedVehicle.id)}
                        className="bg-red-500 hover:bg-red-400 text-black px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition"
                      >
                        Aracı İade Et (Dönem Kapat)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-24 border border-white/5 bg-[#030712] rounded-2xl space-y-4">
                <p className="text-gray-400 font-light text-sm max-w-sm mx-auto">
                  Üzerinize tanımlı aktif kiralık araç bulunamadı. Kendi şahsi aracınızla sevk alıyorsunuz veya Wolt/Bolt siparişi teslim ediyorsunuz.
                </p>
                <span className="text-xs text-gray-600 block">Araç kiralamak için lütfen ana sayfadaki "Kiralık Filo" sayfamıza göz atın.</span>
              </div>
            )}
          </div>
        )}

        {/* ==================== SUPPORT TAB ==================== */}
        {activeTab === 'support' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">YAZIŞMA KANALI</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">CargoElectra Merkez Ofis Canlı Destek</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Maaş işlemleri, yeni sözleşmeler veya aktif kaza/hasar bildirimleri için genel merkezimizle anlık faks/chat hattı yardımıyla yazışabilirsiniz.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] h-[500px] flex flex-col justify-between">
              
              {/* Chat lines */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'driver' 
                        ? 'bg-cyan-950/40 border border-cyan-500/15 ml-auto text-cyan-100' 
                        : 'bg-white/5 border border-white/5 text-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-1">
                      <span>{msg.senderName} ({msg.sender})</span>
                      <span>{msg.timestamp.slice(11, 16)}</span>
                    </div>
                    {msg.message}
                  </div>
                ))}

                {chatMessages.length === 0 && (
                  <p className="text-center text-gray-500 text-xs py-12 font-mono">Merkez ofis ile konuşma başlatmak için yazın...</p>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSend} className="pt-4 border-t border-white/5 flex gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Zorunlu sorunuzu veya kaza detayını buraya girin..."
                  className="flex-1 bg-black border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button 
                  type="submit" 
                  className="p-3 bg-white hover:bg-gray-200 text-black rounded-xl text-xs font-semibold flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
