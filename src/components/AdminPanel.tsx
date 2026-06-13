import React, { useState } from 'react';
import { 
  Users, Briefcase, FileText, Settings, Key, AlertTriangle, ShieldCheck, 
  Check, X, DollarSign, PlusCircle, Activity, BarChart2, Truck, UserCheck, Trash2
} from 'lucide-react';
import { Driver, Business, Job, Vehicle } from '../types';

interface AdminPanelProps {
  drivers: Driver[];
  companies: Business[];
  jobs: Job[];
  vehicles: Vehicle[];
  onApproveDriver: (driverId: string) => void;
  onRejectDriver: (driverId: string) => void;
  onAssignDriver: (jobId: string, driverId: string) => void;
  onUpdateVehicleStatus: (vehicleId: string, status: Vehicle['status']) => void;
  onDeleteJob: (jobId: string) => void;
}

export default function AdminPanel({
  drivers,
  companies,
  jobs,
  vehicles,
  onApproveDriver,
  onRejectDriver,
  onAssignDriver,
  onUpdateVehicleStatus,
  onDeleteJob
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'matching' | 'payroll' | 'fleet' | 'analytics'>('overview');

  // Stats
  const pendingDrivers = drivers.filter(d => d.status === 'pending');
  const activeJobs = jobs.filter(j => j.status !== 'completed' && j.status !== 'cancelled');
  const pendingJobs = jobs.filter(j => j.status === 'pending');
  const completedJobsCount = jobs.filter(j => j.status === 'completed').length;
  
  // Platform financial calculation approximations (EUR)
  const totalGrossRevenue = jobs.filter(j => j.status === 'completed').reduce((sum, j) => sum + j.price, 0);
  const totalCommissionRevenue = totalGrossRevenue * 0.08; // 8% total system yield

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#030712] border-r border-white/5 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          
          {/* Admin title */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-sm text-white block">CargoElectra Merkez</span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Yönetici Paneli</span>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'overview' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Genel Durum
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition relative ${
                activeTab === 'approvals' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sürücü Onayları
              {pendingDrivers.length > 0 && (
                <span className="absolute right-4 top-3 bg-cyan-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingDrivers.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition relative ${
                activeTab === 'matching' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sevk Atama masası
              {pendingJobs.length > 0 && (
                <span className="absolute right-4 top-3 bg-cyan-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingJobs.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'payroll' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Bordro ve Muhasebe
            </button>
            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'fleet' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Araç Envanteri
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition ${
                activeTab === 'analytics' ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-3' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sistem Analitiği
            </button>
          </nav>

        </div>

        {/* Console info */}
        <div className="pt-6 border-t border-white/5 text-[9px] text-gray-500 font-mono space-y-1">
          <div>YER: Zagreb HQ (HR d.o.o.)</div>
          <div>ADMIN ID: admin_master_01</div>
          <div>SİSTEM PUANI: 99.8% OK</div>
        </div>
      </aside>

      {/* ADMIN CONTENT PORT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">CARGOELECTRA MAFSALI</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Platform Yönetim Özeti</h1>
            </div>

            {/* General metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">Toplam Ciro (Completed)</span>
                <div className="text-3xl font-bold text-white font-mono">€{totalGrossRevenue.toLocaleString()}</div>
                <p className="text-[10px] text-gray-500 leading-none">Net tamamlanmış sevkiyat faturaları.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">Komisyon Geliri (%8 Ortalama)</span>
                <div className="text-3xl font-bold text-cyan-400 font-mono">€{totalCommissionRevenue.toFixed(2)}</div>
                <p className="text-[10px] text-gray-500 leading-none">CargoElectra d.o.o. brüt kar payı.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">Aktif Nakliye Gücü</span>
                <div className="text-3xl font-bold text-white font-mono">{activeJobs.length} Rota</div>
                <p className="text-[10px] text-gray-500 leading-none">Atanan veya taşınan aktif sevkler.</p>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-2">
                <span className="text-xs text-gray-400 uppercase font-mono">Bekleyen Sürücü Kaydı</span>
                <div className="text-3xl font-bold text-amber-400 font-mono">{pendingDrivers.length} Aday</div>
                <p className="text-[10px] text-gray-500 leading-none">Evrak incelemesi bekleyen kuryeler.</p>
              </div>

            </div>

            {/* Quick overview of jobs list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="liquid-glass border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="text-md font-medium text-white mb-2">Onay Bekleyen Şirket Talepleri</h3>
                {pendingJobs.length === 0 ? (
                  <p className="text-xs text-gray-500 font-mono">Atanmamış yeni sipariş kaydı bulunmuyor.</p>
                ) : (
                  <div className="space-y-3">
                    {pendingJobs.map((job) => (
                      <div key={job.id} className="p-4 rounded-xl bg-black border border-white/10 flex justify-between items-center text-xs font-mono">
                        <div>
                          <p className="text-white font-semibold">{job.cargoType}</p>
                          <p className="text-gray-400 block text-[10px] lowercase font-light">Müşteri: {job.companyName}</p>
                        </div>
                        <button
                          onClick={() => setActiveTab('matching')}
                          className="px-3 py-1.5 bg-cyan-500 text-black rounded-lg text-[10px] font-bold cursor-pointer hover:bg-cyan-400"
                        >
                          Sürücü Ata
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="liquid-glass border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="text-md font-medium text-white mb-2">Kiralık Filo Doluluk</h3>
                <div className="space-y-2">
                  {vehicles.map((v) => (
                    <div key={v.id} className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-300">{v.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        v.status === 'available' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/10' : 'bg-amber-900/40 text-amber-400'
                      }`}>
                        {v.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== SÜRÜCÜ ONAYLARI TAB ==================== */}
        {activeTab === 'approvals' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">MÜRACAAT EVRAKLARI</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Sürücü Onay Masası</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Hırvatistan oturma, pasaport ve ehliyet evrakları taranmış olan kurye adaylarının başvurularına onay verebilir veya reddedebilirsiniz.
              </p>
            </div>

            <div className="space-y-4">
              {drivers.map((drv) => (
                <div key={drv.id} className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-mono font-bold">
                        {drv.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{drv.name} ({drv.nationality})</h4>
                        <span className="text-[10px] text-gray-400 block font-mono">Email: {drv.email} | Tel: {drv.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        drv.status === 'active' ? 'bg-emerald-950/40 text-emerald-400' :
                        drv.status === 'pending' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/10' : 'bg-red-950/40 text-red-400'
                      }`}>
                        {drv.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs font-mono border-t border-white/5 pt-4">
                    
                    <div className="space-y-1">
                      <span className="text-gray-500 block uppercase text-[10px]">KİMLİK KONTROLÜ</span>
                      <span className={drv.documents.idUploaded ? 'text-emerald-400' : 'text-red-400'}>
                        {drv.documents.idUploaded ? '✓ ONAYLANDI (PASAPORT)' : '✗ EKSİK'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gray-500 block uppercase text-[10px]">SÜRÜCÜ EHLİYETİ</span>
                      <span className={drv.documents.idUploaded ? 'text-emerald-400' : 'text-red-400'}>
                        {drv.documents.licenseUploaded ? '✓ AB UYUMLU (✓)' : '✗ EKSİK'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gray-500 block uppercase text-[10px]">ÇALIŞMA GÖÇMEN İZNİ</span>
                      <span className={drv.documents.workPermitUploaded ? 'text-emerald-400' : 'text-red-400'}>
                        {drv.documents.workPermitUploaded ? '✓ RESMİ (RADNA DOZVOLA)' : '✗ ADAYDAN EVRAK BEKLENİYOR'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gray-500 block uppercase text-[10px]">SÖZLEŞME TİPİ</span>
                      <span className="text-white uppercase">{drv.salaryMode.replace('_', ' ')}</span>
                    </div>

                  </div>

                  {drv.status === 'pending' && (
                    <div className="pt-4 border-t border-white/5 flex justify-end gap-2 text-xs">
                      <button
                        onClick={() => onRejectDriver(drv.id)}
                        className="bg-red-950/40 text-red-400 hover:bg-red-900/20 px-4 py-2 rounded-lg font-semibold cursor-pointer border border-red-500/10"
                      >
                        Talebi Reddet
                      </button>
                      <button
                        onClick={() => onApproveDriver(drv.id)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold cursor-pointer"
                      >
                        Sözleşmeyi Onayla ve Aktifleştir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SEVK ATAMA MASASI TAB ==================== */}
        {activeTab === 'matching' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">AKILLI MATCHMAKING</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Lojistik Sevk Atama Masası</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Talebi girilmiş sevklerin üzerine onaylı sürücülerimizden birini doğrudan yerleştirerek rotayı live tracking moduna geçirebilirsiniz.
              </p>
            </div>

            <div className="space-y-6">
              {jobs.filter(j => j.status === 'pending' || j.status === 'assigned' || j.status === 'in_progress').map((job) => {
                
                // Get eligible drivers (active status, matching vehicle or similar)
                const eligibleDrivers = drivers.filter(d => d.status === 'active');

                return (
                  <div key={job.id} className="p-6 rounded-2xl border border-white/5 bg-[#030712] space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-mono">
                          <span className="text-white font-bold">{job.id}</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-gray-400">Gönderici: {job.companyName}</span>
                        </div>
                        <h4 className="text-md font-medium text-white">{job.cargoType} ({job.weight})</h4>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#39FF14] block font-mono">€{job.price}</span>
                        <span className="text-[10px] text-gray-500 block font-mono">Tarife: {job.dateTimeWindow}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-black rounded-xl text-xs space-y-1 leading-relaxed text-gray-300 font-light">
                      <p>📦 <span className="font-semibold text-gray-400 font-mono uppercase text-[9px]">Yükleme:</span> {job.pickupAddress}</p>
                      <p>🏁 <span className="font-semibold text-gray-400 font-mono uppercase text-[9px]">Teslimat nokta:</span> {job.deliveryAddress}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
                      
                      <div className="space-y-1">
                        <span className="text-gray-500 block uppercase text-[10px]">GÖREVLİ SÜRÜCÜ</span>
                        <span className="text-white">{job.driverName ? '✓ ' + job.driverName : '✗ Atama Bekleniyor'}</span>
                      </div>

                      {job.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 mr-2 uppercase text-[10px]">UYGUN SÜRÜCÜSÜMÜZÜ ATA:</span>
                          <select 
                            onChange={(e) => {
                              if (e.target.value) {
                                onAssignDriver(job.id, e.target.value);
                              }
                            }}
                            className="bg-black border border-white/15 text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
                          >
                            <option value="">Seçiniz...</option>
                            {eligibleDrivers.map(d => (
                              <option key={d.id} value={d.id}>{d.name} ({d.city} - {d.vehicleType})</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <span className="text-emerald-400 font-bold uppercase text-[10px]">ROTALAMA BAŞLADI</span>
                          <button
                            onClick={() => onDeleteJob(job.id)}
                            className="text-red-400 hover:text-red-300 font-bold uppercase text-[10px] ml-4 cursor-pointer"
                          >
                            Talebi Sifirla/Sil
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}

              {jobs.filter(j => j.status === 'pending' || j.status === 'assigned' || j.status === 'in_progress').length === 0 && (
                <div className="text-center py-24 text-gray-500">
                  Şu an atama yapılması gereken sevk veya rota bulunmuyor.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== BORDRO VE MUHASEBE TAB ==================== */}
        {activeTab === 'payroll' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">IK PAYOUTS</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Maaş & Bordro Muhasebe Takvimi</h1>
              <p className="text-gray-400 text-sm mt-2 font-light">
                Ajans çalışanlarımızın ve bağımsız Wolt/Bolt kuryelerimizin net maaş hesaplamaları, acente komisyonu düşümleri ve nihai banka talimat listeleri aşağıda gösterilmiştir.
              </p>
            </div>

            <div className="liquid-glass border border-white/5 rounded-2xl overflow-hidden p-6 md:p-8 space-y-6">
              <h3 className="text-md font-medium text-white">Sürücü Hakediş Çizelgesi (Bu Ay)</h3>
              
              <div className="space-y-4">
                {drivers.filter(d => d.status === 'active').map((drv) => {
                  const gross = drv.earningsThisMonth * 1.08;
                  const comm = drv.earningsThisMonth * 0.08;
                  const net = drv.earningsThisMonth;
                  
                  return (
                    <div key={drv.id} className="p-5 rounded-xl bg-black border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs font-mono">
                      <div>
                        <div className="text-sm font-semibold text-white">{drv.name}</div>
                        <p className="text-gray-500 text-[10px] mt-1">Sözleşme Modeli: {drv.salaryMode.toUpperCase()} | Tamamlanan İş: {drv.completedJobsCount}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6">
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">BRÜT</span>
                          <span className="text-white font-bold">€{gross.toFixed(0)}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">KOMİSYON (%8)</span>
                          <span className="text-red-400 font-semibold">-€{comm.toFixed(0)}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase">ÖDENECEK NET</span>
                          <span className="text-emerald-400 font-extrabold">€{net.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== ARAÇ ENVANTERİ TAB ==================== */}
        {activeTab === 'fleet' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">FİZİKSEL FİLO</span>
                <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Kiralama Envanter Odası</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vehicles.map((v) => (
                <div key={v.id} className="p-6 rounded-2xl border border-white/5 bg-[#030712] flex flex-col justify-between space-y-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img src={v.image} alt={v.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-cyan-400 uppercase block mb-1">{v.type}</span>
                      <h4 className="text-sm font-semibold text-white leading-tight">{v.name}</h4>
                      <p className="text-[11px] text-gray-500 font-light mt-1">{v.specs}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-gray-500 block uppercase">KİRA TARİFESİ</span>
                      <span className="text-[#39FF14] block">€{v.weeklyPrice}/Hafta</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <select 
                        value={v.status}
                        onChange={(e) => onUpdateVehicleStatus(v.id, e.target.value as any)}
                        className="bg-black border border-white/15 text-white rounded-lg px-2.5 py-1 text-[11px] cursor-pointer"
                      >
                        <option value="available">Kullanılabilir</option>
                        <option value="rented">Kiralandı</option>
                        <option value="maintenance">Bakımda</option>
                      </select>
                      <span className={`w-2 h-2 rounded-full ${
                        v.status === 'available' ? 'bg-emerald-400' :
                        v.status === 'rented' ? 'bg-amber-400 animate-pulse' : 'bg-red-400'
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== ANALYTICS TAB ==================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">VERİ KANALLARI</span>
              <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Platform Performans Panosu</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-2xl border border-white/5 bg-[#030712] space-y-4">
                <h3 className="text-md font-medium text-white mb-2">Finansal Verim (Rapor)</h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Toplam Sevkiyat Değeri:</span>
                    <span className="text-white font-bold">€{totalGrossRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">CargoElectra Komisyon Kazancı (%8):</span>
                    <span className="text-[#39FF14] font-bold">€{totalCommissionRevenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Brüt Dağıtılmış Sürücü Maaşı:</span>
                    <span className="text-white font-bold">€{(totalGrossRevenue - totalCommissionRevenue).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl border border-white/5 bg-[#030712] space-y-4">
                <h3 className="text-md font-medium text-white mb-2">Operasyonel Orti</h3>
                <div className="space-y-3 font-mono text-xs text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Toplam Kayıtlı Sürücü:</span>
                    <span className="text-white font-bold">{drivers.length} şoför</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Platform Partner Firmaları:</span>
                    <span className="text-white font-bold">{companies.length} d.o.o.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamamlanan Nakliye Oranı:</span>
                    <span className="text-[#39FF14] font-bold">100% SUCCESS RATIO</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
