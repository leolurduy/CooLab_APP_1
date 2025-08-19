import React, { useState } from "react";

const DashboardPage = ({
  userProfile,
  setUserProfile,
  organizations,
  setOrganizations,
  odsOptions,
  targetPopulationOptions,
  actualizarOrganizacion
}) => {
  const [activeTab, setActiveTab] = useState('user');
  const [editableUser, setEditableUser] = useState(userProfile);
  const [editableOrg, setEditableOrg] = useState(() => {
    return organizations[0] || {
      name: '', country: '', city: '', address: '', contactPerson: '', contactRole: '',
      ods: [], targetPopulation: [], socialObject: '', contact: { email: '', phone: '', website: '', social: { linkedin: '', tiktok: '', instagram: '', facebook: '', x: '', whatsapp: '' } },
      projects: [], lat: 0, lng: 0
    };
  });

  const saveUser = () => {
    setUserProfile(editableUser);
    alert('Perfil de usuario actualizado');
  };
  const deleteUser = () => {
    const ok = window.confirm('¿Eliminar tu perfil de usuario? Esta acción no se puede deshacer.');
    if (!ok) return;
    setUserProfile({ name: '', email: '', phone: '', role: 'user' });
    alert('Perfil de usuario eliminado');
  };

  const saveOrg = async () => {
    if (!editableOrg || !editableOrg.name) {
      alert('Completa al menos el nombre de la organización');
      return;
    }
    const next = [...organizations];
    if (next.length > 0) {
      next[0] = { ...next[0], ...editableOrg };
    } else {
      next.push({ id: 1, ...editableOrg });
    }
    setOrganizations(next);
    try {
      if (editableOrg.id && typeof actualizarOrganizacion === 'function') {
        await actualizarOrganizacion(editableOrg.id, editableOrg);
      }
    } catch (_) {}
    alert('Organización actualizada');
  };

  const deleteOrgProject = (idx) => {
    const next = { ...editableOrg, projects: (editableOrg.projects || []).filter((_, i) => i !== idx) };
    setEditableOrg(next);
  };
  const addOrgProject = () => {
    const next = { ...editableOrg, projects: [...(editableOrg.projects || []), { title: '', description: '', photos: [], videos: [] }] };
    setEditableOrg(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Panel de Usuario</h1>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex space-x-2">
          <button onClick={() => setActiveTab('user')} className={`px-4 py-2 rounded ${activeTab==='user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Perfil de Usuario</button>
          <button onClick={() => setActiveTab('org')} className={`px-4 py-2 rounded ${activeTab==='org' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Perfil de Organización</button>
        </div>

        {activeTab === 'user' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input className="w-full px-4 py-2 border rounded" value={editableUser.name} onChange={(e)=>setEditableUser({...editableUser,name:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input className="w-full px-4 py-2 border rounded" value={editableUser.email} onChange={(e)=>setEditableUser({...editableUser,email:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input className="w-full px-4 py-2 border rounded" value={editableUser.phone} onChange={(e)=>setEditableUser({...editableUser,phone:e.target.value})} />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={deleteUser} className="px-4 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100">Eliminar perfil</button>
              <button onClick={saveUser} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Guardar</button>
            </div>
          </div>
        )}

        {activeTab === 'org' && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.name} onChange={(e)=>setEditableOrg({...editableOrg,name:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.country} onChange={(e)=>setEditableOrg({...editableOrg,country:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.city} onChange={(e)=>setEditableOrg({...editableOrg,city:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.address} onChange={(e)=>setEditableOrg({...editableOrg,address:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Persona de contacto</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.contactPerson || ''} onChange={(e)=>setEditableOrg({...editableOrg,contactPerson:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.contactRole || ''} onChange={(e)=>setEditableOrg({...editableOrg,contactRole:e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objeto Social</label>
              <textarea className="w-full px-4 py-2 border rounded" rows={3} value={editableOrg.socialObject} onChange={(e)=>setEditableOrg({...editableOrg,socialObject:e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.contact?.email || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,email:e.target.value}})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.contact?.phone || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,phone:e.target.value}})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sitio web</label>
                <input className="w-full px-4 py-2 border rounded" value={editableOrg.contact?.website || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,website:e.target.value}})} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ODS Relacionados (múltiple)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {odsOptions.map((ods) => (
                    <label key={ods} className="flex items-center space-x-2 text-sm">
                      <span className="inline-flex w-4 h-4 bg-indigo-200 rounded-sm items-center justify-center">
                        <svg className="w-3 h-3 text-indigo-700" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>
                      </span>
                      <input
                        type="checkbox"
                        checked={(editableOrg.ods||[]).includes(ods.split('.')[0]) || (editableOrg.ods||[]).includes(ods)}
                        onChange={(e)=>{
                          const base = Array.isArray(editableOrg.ods)? [...editableOrg.ods]:[];
                          const key = ods.split('.')[0];
                          const next = e.target.checked ? [...base.filter(v=>v!==ods && v!==key), key] : base.filter(v=>v!==ods && v!==key);
                          setEditableOrg({...editableOrg, ods: next});
                        }}
                        className="text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">{ods}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temáticas de Interés (múltiple)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {targetPopulationOptions.map((topic) => (
                    <label key={topic} className="flex items-center space-x-2 text-sm">
                      <span className="inline-flex w-4 h-4 bg-green-200 rounded-sm items-center justify-center">
                        <svg className="w-3 h-3 text-green-700" viewBox="0 0 20 20" fill="currentColor"><rect x="4" y="4" width="12" height="12" rx="2"/></svg>
                      </span>
                      <input
                        type="checkbox"
                        checked={(editableOrg.targetPopulation||[]).includes(topic)}
                        onChange={(e)=>{
                          const base = Array.isArray(editableOrg.targetPopulation)? [...editableOrg.targetPopulation]:[];
                          const next = e.target.checked ? [...base, topic] : base.filter(v=>v!==topic);
                          setEditableOrg({...editableOrg, targetPopulation: next});
                        }}
                        className="text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Redes sociales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.linkedin || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),linkedin:e.target.value}}})} placeholder="https://www.linkedin.com/company/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.instagram || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),instagram:e.target.value}}})} placeholder="https://instagram.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.facebook || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),facebook:e.target.value}}})} placeholder="https://facebook.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">X / Twitter</label>
                  <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.x || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),x:e.target.value}}})} placeholder="https://twitter.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                  <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.tiktok || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),tiktok:e.target.value}}})} placeholder="https://www.tiktok.com/@..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (URL)</label>
                  <input className="w-full px-3 py-2 border rounded" value={editableOrg.contact?.social?.whatsapp || ''} onChange={(e)=>setEditableOrg({...editableOrg,contact:{...editableOrg.contact,social:{...(editableOrg.contact?.social||{}),whatsapp:e.target.value}}})} placeholder="https://wa.me/+..." />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {editableOrg.contact?.social?.linkedin && <a target="_blank" rel="noreferrer" className="text-blue-700 hover:underline" href={editableOrg.contact.social.linkedin}>LinkedIn</a>}
                {editableOrg.contact?.social?.instagram && <a target="_blank" rel="noreferrer" className="text-pink-600 hover:underline" href={editableOrg.contact.social.instagram}>Instagram</a>}
                {editableOrg.contact?.social?.facebook && <a target="_blank" rel="noreferrer" className="text-blue-600 hover:underline" href={editableOrg.contact.social.facebook}>Facebook</a>}
                {editableOrg.contact?.social?.x && <a target="_blank" rel="noreferrer" className="text-gray-700 hover:underline" href={editableOrg.contact.social.x}>X/Twitter</a>}
                {editableOrg.contact?.social?.tiktok && <a target="_blank" rel="noreferrer" className="text-black hover:underline" href={editableOrg.contact.social.tiktok}>TikTok</a>}
                {editableOrg.contact?.social?.whatsapp && <a target="_blank" rel="noreferrer" className="text-green-600 hover:underline" href={editableOrg.contact.social.whatsapp}>WhatsApp</a>}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Proyectos</h3>
                <button onClick={addOrgProject} className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Añadir proyecto</button>
              </div>
              <div className="space-y-4">
                {(editableOrg.projects || []).map((proj, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input className="px-3 py-2 border rounded" placeholder="Título" value={proj.title || ''} onChange={(e)=>{
                        const next = [...editableOrg.projects]; next[idx] = { ...next[idx], title: e.target.value }; setEditableOrg({ ...editableOrg, projects: next });
                      }} />
                      <input className="px-3 py-2 border rounded" placeholder="Descripción" value={proj.description || ''} onChange={(e)=>{
                        const next = [...editableOrg.projects]; next[idx] = { ...next[idx], description: e.target.value }; setEditableOrg({ ...editableOrg, projects: next });
                      }} />
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">Fotos (URLs)</span>
                          <button onClick={()=>{
                            const url = prompt('URL de imagen'); if(!url) return; const next = [...(proj.photos||[]), url];
                            const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], photos: next }; setEditableOrg({ ...editableOrg, projects: arr });
                          }} className="text-xs px-2 py-1 bg-gray-100 rounded">Añadir</button>
                        </div>
                        <div className="space-y-1">
                          {(proj.photos||[]).map((u,i)=>(
                            <div key={i} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                              <span className="truncate mr-2">{u}</span>
                              <button onClick={()=>{
                                const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], photos: (arr[idx].photos||[]).filter((_,j)=>j!==i) }; setEditableOrg({ ...editableOrg, projects: arr });
                              }} className="px-2 py-0.5 bg-red-50 text-red-600 rounded">Quitar</button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">Videos (URLs)</span>
                          <button onClick={()=>{
                            const url = prompt('URL de video'); if(!url) return; const next = [...(proj.videos||[]), url];
                            const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], videos: next }; setEditableOrg({ ...editableOrg, projects: arr });
                          }} className="text-xs px-2 py-1 bg-gray-100 rounded">Añadir</button>
                        </div>
                        <div className="space-y-1">
                          {(proj.videos||[]).map((u,i)=>(
                            <div key={i} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                              <span className="truncate mr-2">{u}</span>
                              <button onClick={()=>{
                                const arr = [...editableOrg.projects]; arr[idx] = { ...arr[idx], videos: (arr[idx].videos||[]).filter((_,j)=>j!==i) }; setEditableOrg({ ...editableOrg, projects: arr });
                              }} className="px-2 py-0.5 bg-red-50 text-red-600 rounded">Quitar</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button onClick={()=>deleteOrgProject(idx)} className="px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 text-sm">Eliminar proyecto</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={saveOrg} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Guardar cambios</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

