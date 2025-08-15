// Media service placeholder for future MongoDB integration
// In the future, replace implementations to use MongoDB Atlas GridFS or a media collection

const API_BASE = process.env.REACT_APP_MEDIA_API_BASE || ""; // futuro endpoint

export const initMediaBackend = async (_config = {}) => {
  // Placeholder: no-op for now
  return { ok: true };
};

// Accepts either a File (from input type=file) or a URL string
export const uploadMedia = async (mediaInput, metadata = {}) => {
  // Placeholder implementation: if it's a URL string, return it directly
  if (typeof mediaInput === "string") {
    return {
      ok: true,
      media: {
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        url: mediaInput,
        type: metadata.type || getMediaTypeFromUrl(mediaInput),
        metadata,
      },
    };
  }
  // If a File is provided, you can later implement an upload to your API that stores in MongoDB
  return { ok: false, error: "File uploads not implemented yet. Provide URL for now." };
};

export const deleteMedia = async (_mediaId) => {
  // Placeholder: assume deleted
  return { ok: true };
};

export const listMedia = async (_orgId, _projectId) => {
  // Placeholder: return empty list
  return { ok: true, items: [] };
};

export const isImageUrl = (url) => {
  try { return /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(new URL(url).pathname); } catch { return false; }
};

export const isVideoUrl = (url) => {
  try { return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(new URL(url).pathname); } catch { return false; }
};

export const getMediaTypeFromUrl = (url) => {
  try {
    if (isImageUrl(url)) return "image";
    if (isVideoUrl(url)) return "video";
    return "unknown";
  } catch {
    return "unknown";
  }
};

export const validateMediaUrl = (url) => {
  if (!url || typeof url !== "string") return { ok: false, error: "URL vacía" };
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return { ok: false, error: "URL debe ser http/https" };
  } catch {
    return { ok: false, error: "URL inválida" };
  }
  const type = getMediaTypeFromUrl(url);
  if (type === "unknown") return { ok: false, error: "Formato no soportado" };
  return { ok: true, type };
};

// Futuros endpoints REST (desacoplados)
export const getUploadUrl = async (_orgId, _projectId, _contentType) => {
  if (!API_BASE) return { ok: false, error: "MEDIA_API_BASE no configurado" };
  // GET ${API_BASE}/media/upload-url?orgId=...&projectId=...&contentType=...
  return { ok: false, error: "No implementado (futuro MongoDB/GridFS)" };
};

export const postUpload = async (_uploadUrl, _file) => {
  return { ok: false, error: "No implementado (futuro)" };
};


