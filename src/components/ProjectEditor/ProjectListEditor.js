import React, { useState } from "react";

const ProjectListEditor = ({ onChange }) => {
  const [projects, setProjects] = useState([
    { title: "", description: "", city: "", address: "", beneficiaries: { direct: { men: "", women: "" }, indirect: { men: "", women: "" } }, photos: [], videos: [] }
  ]);

  const update = (next) => {
    setProjects(next);
    if (typeof onChange === 'function') onChange(next);
  };

  const addProject = () => update([...projects, { title: "", description: "", city: "", address: "", beneficiaries: { direct: { men: "", women: "" }, indirect: { men: "", women: "" } }, photos: [], videos: [] }]);
  const removeProject = (idx) => update(projects.filter((_, i) => i !== idx));
  const handleField = (idx, field, value) => {
    const next = projects.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
    update(next);
  };

  const addMediaUrl = (idx, kind) => {
    const url = prompt(kind === 'photos' ? 'URL de imagen (png/jpg/webp)' : 'URL de video (mp4/webm/ogg)');
    if (!url) return;
    const next = projects.map((p, i) => (
      i === idx ? { ...p, [kind]: [...(p[kind] || []), url] } : p
    ));
    update(next);
  };

  const removeMediaAt = (idx, kind, mediaIndex) => {
    const next = projects.map((p, i) => (
      i === idx ? { ...p, [kind]: p[kind].filter((_, j) => j !== mediaIndex) } : p
    ));
    update(next);
  };

  return (
    <div className="space-y-4">
      {projects.map((p, idx) => (
        <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título del proyecto</label>
              <input
                type="text"
                value={p.title}
                onChange={(e) => handleField(idx, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Laboratorio Digital"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <input
                type="text"
                value={p.description}
                onChange={(e) => handleField(idx, 'description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Resumen breve del proyecto"
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
              <input type="text" value={p.country || ''} onChange={(e)=>handleField(idx,'country',e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="País" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad/Municipio</label>
              <input type="text" value={p.city || ''} onChange={(e)=>handleField(idx,'city',e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ciudad" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input type="text" value={p.address || ''} onChange={(e)=>handleField(idx,'address',e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Dirección" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded border">
              <span className="block text-sm font-medium text-gray-700 mb-2">Beneficiarios Directos</span>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" min="0" placeholder="Hombres" value={p.beneficiaries?.direct?.men || ''} onChange={(e)=>{
                  const val = e.target.value; const next = { ...p.beneficiaries, direct: { ...(p.beneficiaries?.direct||{}), men: val } }; handleField(idx,'beneficiaries',next);
                }} className="px-3 py-2 border rounded" />
                <input type="number" min="0" placeholder="Mujeres" value={p.beneficiaries?.direct?.women || ''} onChange={(e)=>{
                  const val = e.target.value; const next = { ...p.beneficiaries, direct: { ...(p.beneficiaries?.direct||{}), women: val } }; handleField(idx,'beneficiaries',next);
                }} className="px-3 py-2 border rounded" />
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded border">
              <span className="block text-sm font-medium text-gray-700 mb-2">Beneficiarios Indirectos</span>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" min="0" placeholder="Hombres" value={p.beneficiaries?.indirect?.men || ''} onChange={(e)=>{
                  const val = e.target.value; const next = { ...p.beneficiaries, indirect: { ...(p.beneficiaries?.indirect||{}), men: val } }; handleField(idx,'beneficiaries',next);
                }} className="px-3 py-2 border rounded" />
                <input type="number" min="0" placeholder="Mujeres" value={p.beneficiaries?.indirect?.women || ''} onChange={(e)=>{
                  const val = e.target.value; const next = { ...p.beneficiaries, indirect: { ...(p.beneficiaries?.indirect||{}), women: val } }; handleField(idx,'beneficiaries',next);
                }} className="px-3 py-2 border rounded" />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Fotos (URLs)</label>
                <button type="button" onClick={() => addMediaUrl(idx, 'photos')} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Añadir foto</button>
              </div>
              <div className="space-y-2">
                {(p.photos || []).map((url, mIdx) => (
                  <div key={mIdx} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={url} alt="foto" className="w-10 h-10 object-cover rounded" onError={(e)=>{e.currentTarget.style.display='none'}} />
                      <span className="truncate mr-2 max-w-[220px]">{url}</span>
                    </div>
                    <button type="button" onClick={() => removeMediaAt(idx, 'photos', mIdx)} className="px-2 py-0.5 bg-red-50 text-red-600 rounded hover:bg-red-100">Quitar</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Videos (URLs)</label>
                <button type="button" onClick={() => addMediaUrl(idx, 'videos')} className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Añadir video</button>
              </div>
              <div className="space-y-2">
                {(p.videos || []).map((url, mIdx) => (
                  <div key={mIdx} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <video className="w-14 h-10 rounded" src={url} onError={(e)=>{e.currentTarget.style.display='none'}} />
                      <span className="truncate mr-2 max-w-[220px]">{url}</span>
                    </div>
                    <button type="button" onClick={() => removeMediaAt(idx, 'videos', mIdx)} className="px-2 py-0.5 bg-red-50 text-red-600 rounded hover:bg-red-100">Quitar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => removeProject(idx)}
              className="px-3 py-1 text-sm rounded bg-red-50 text-red-600 hover:bg-red-100"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Añadir proyecto
        </button>
      </div>
    </div>
  );
};

export default ProjectListEditor;

