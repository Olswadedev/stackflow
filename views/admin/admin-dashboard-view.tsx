"use client";

import { useState, useMemo } from "react";
import { MOCK_USERS_INITIAL, MockUser } from "@/lib/data/users.mock";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { Search, LayoutDashboard, UserCheck, UserMinus, Archive, RotateCcw, Trash2, Power, Pencil, X, Check } from "lucide-react";

export function AdminDashboardView() {
  const [users, setUsers] = useState<MockUser[]>(MOCK_USERS_INITIAL);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [editingUser, setEditingUser] = useState<MockUser | null>(null);

  // --- ACTIONS ---

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
      setEditingUser(null);
    }
  };

  const toggleActive = (id: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const nextActive = !user.actif; 
        return { ...user, actif: nextActive, enLigne: nextActive };
      }
      return user;
    }));
  };

  const archiveUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, archived: true, enLigne: false } : u));
  };

  const restoreUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, archived: false, actif: true, enLigne: true } : u));
  };

  // --- STATS SYNCHRONISÉES ---
  const stats = useMemo(() => {
    const nonArchived = users.filter(u => !u.archived);
    return {
      total: nonArchived.length,
      online: nonArchived.filter(u => u.enLigne && u.actif).length,
      offline: nonArchived.filter(u => !u.enLigne || !u.actif).length,
      archived: users.filter(u => u.archived).length
    };
  }, [users]);

  const chartData = [
    { name: "Connectés", count: stats.online },
    { name: "Hors ligne", count: stats.offline },
  ];

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.prenom} ${u.nom}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    
    if (filter === "Archives") return u.archived && matchesSearch;
    if (u.archived) return false;
    if (filter === "Connectés") return u.enLigne && u.actif && matchesSearch;
    if (filter === "Hors ligne") return (!u.enLigne || !u.actif) && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0c0814] text-white p-8 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-violet-600 h-10 w-10 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-violet-500/20">S</div>
          <span className="text-zinc-300 font-medium">Synthèse</span>
        </div>
        <div className="text-sm text-zinc-500">Espace admin — <span className="text-violet-400 font-bold">Kouassi</span></div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total" value={stats.total} icon={<LayoutDashboard size={18}/>} color="text-white" />
        <StatCard title="Connectés" value={stats.online} icon={<UserCheck size={18}/>} color="text-emerald-400" />
        <StatCard title="Hors ligne" value={stats.offline} icon={<UserMinus size={18}/>} color="text-zinc-500" />
        <StatCard title="Archives" value={stats.archived} icon={<Archive size={18}/>} color="text-orange-400" />
      </div>

      {/* GRAPHIQUE */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 mb-8 backdrop-blur-md">
        <h2 className="text-[10px] font-bold text-zinc-500 mb-6 uppercase tracking-widest">Répartition en temps réel</h2>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
              <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{backgroundColor: '#161021', border: '1px solid #4f46e540', borderRadius: '8px'}}/>
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MODAL ÉDITION */}
      {editingUser && (
        <div className="mb-8 p-6 border border-violet-500/30 bg-violet-500/5 rounded-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-violet-400 uppercase tracking-tight">Modifier l'utilisateur</h3>
            <button onClick={() => setEditingUser(null)} className="text-zinc-500 hover:text-white"><X size={18}/></button>
          </div>
          <form onSubmit={handleSaveEdit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="bg-zinc-950 border border-white/10 p-2.5 rounded-xl text-sm outline-none focus:border-violet-500" value={editingUser.prenom} onChange={e => setEditingUser({...editingUser, prenom: e.target.value})} placeholder="Prénom"/>
            <input className="bg-zinc-950 border border-white/10 p-2.5 rounded-xl text-sm outline-none focus:border-violet-500" value={editingUser.nom} onChange={e => setEditingUser({...editingUser, nom: e.target.value})} placeholder="Nom"/>
            <select className="bg-zinc-950 border border-white/10 p-2.5 rounded-xl text-sm outline-none focus:border-violet-500" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value as any})}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="bg-violet-600 hover:bg-violet-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"><Check size={16}/> Mettre à jour</button>
          </form>
        </div>
      )}

      {/* TABLEAU */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-zinc-600" size={16} />
            <input type="text" placeholder="Rechercher nom, email..." className="bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm w-full md:w-80 outline-none focus:border-violet-500 transition-all" onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5">
            {["Tous", "Connectés", "Hors ligne", "Archives"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-violet-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>{f}</button>
            ))}
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-zinc-500 border-b border-white/5 uppercase text-[10px] font-bold tracking-[0.1em]">
              <th className="pb-4">Utilisateur</th>
              <th className="pb-4 text-center">Statut</th>
              <th className="pb-4 text-center">Rôle</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.01/] transition-colors group">
                <td className="py-4">
                  <div className="font-semibold text-zinc-200">{user.prenom} {user.nom}</div>
                  <div className="text-[11px] text-zinc-500">{user.email}</div>
                </td>
                <td className="py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${user.enLigne && user.actif ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-800 text-zinc-500 border-transparent"}`}>
                    {user.enLigne && user.actif ? "EN LIGNE" : "HORS LIGNE"}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-lg border border-white/5 bg-zinc-950/50 ${user.role === 'admin' ? 'text-violet-400' : 'text-zinc-400'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {user.archived ? (
                      <button onClick={() => restoreUser(user.id)} className="p-2 bg-violet-600/10 text-violet-400 rounded-lg hover:bg-violet-600 hover:text-white transition-all shadow-sm"><RotateCcw size={15} /></button>
                    ) : (
                      <>
                        <button onClick={() => setEditingUser(user)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm" title="Modifier"><Pencil size={15} /></button>
                        <button onClick={() => toggleActive(user.id)} className={`p-2 rounded-lg transition-all shadow-sm ${user.actif ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500" : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500"} hover:text-white`} title={user.actif ? "Désactiver" : "Activer"}><Power size={15} /></button>
                        <button onClick={() => archiveUser(user.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Supprimer"><Trash2 size={15} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && <div className="text-center py-12 text-zinc-600 italic text-sm">Aucune donnée correspondante</div>}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: any, icon: any, color: string }) {
  return (
    <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-white/20 transition-all">
      <div>
        <div className={`text-2xl font-bold ${color} tracking-tight`}>{value}</div>
        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.1em]">{title}</div>
      </div>
      <div className="text-zinc-800">{icon}</div>
    </div>
  );
}