import { createClient } from "@supabase/supabase-js";

// Runtime-configurable Supabase client with localStorage overrides
let currentClient = null;
let currentConfig = null;

const readEnvConfig = () => ({
  url: process.env.REACT_APP_SUPABASE_URL || "",
  key: process.env.REACT_APP_SUPABASE_ANON_KEY || "",
  schema: process.env.REACT_APP_SUPABASE_SCHEMA || "public",
  table: process.env.REACT_APP_SUPABASE_TABLE_ORGS || "organizations",
});

const readLocalConfig = () => {
  try {
    const url = localStorage.getItem("SUPA_URL") || "";
    const key = localStorage.getItem("SUPA_KEY") || "";
    const schema = localStorage.getItem("SUPA_SCHEMA") || "";
    const table = localStorage.getItem("SUPA_TABLE") || "";
    return { url, key, schema, table };
  } catch (_) {
    return { url: "", key: "", schema: "", table: "" };
  }
};

const mergeConfig = (envCfg, localCfg) => ({
  url: localCfg.url || envCfg.url,
  key: localCfg.key || envCfg.key,
  schema: localCfg.schema || envCfg.schema,
  table: localCfg.table || envCfg.table,
});

const getEffectiveConfig = () => {
  const envCfg = readEnvConfig();
  const localCfg = readLocalConfig();
  return mergeConfig(envCfg, localCfg);
};

const ensureClient = () => {
  const cfg = getEffectiveConfig();
  const signature = `${cfg.url}|${cfg.key}`;
  if (!currentClient || !currentConfig || `${currentConfig.url}|${currentConfig.key}` !== signature) {
    currentClient = createClient(cfg.url, cfg.key);
    currentConfig = cfg;
  }
  return { client: currentClient, cfg };
};

export const setSupabaseConfig = ({ url, key, schema, table }) => {
  try {
    if (typeof url === "string") localStorage.setItem("SUPA_URL", url);
    if (typeof key === "string") localStorage.setItem("SUPA_KEY", key);
    if (typeof schema === "string") localStorage.setItem("SUPA_SCHEMA", schema);
    if (typeof table === "string") localStorage.setItem("SUPA_TABLE", table);
  } catch (_) {}
  currentClient = null; // force re-create
};

const getOrganizationsTable = () => getEffectiveConfig().table;
const getSchema = () => getEffectiveConfig().schema;

export const getSupabaseMeta = () => {
  let host = "";
  try {
    host = new URL(getEffectiveConfig().url).host;
  } catch (_) {
    host = "";
  }
  const cfg = getEffectiveConfig();
  return {
    host,
    table: cfg.table,
    urlConfigured: !!cfg.url,
    keyConfigured: !!cfg.key,
  };
};

export const testSupabaseConnection = async () => {
  try {
    const tableName = getOrganizationsTable();
    const schema = getSchema();
    const { client } = ensureClient();
    const { count, error } = await client
      .schema(schema)
      .from(tableName)
      .select("id", { count: "estimated", head: true });
    if (error) return { ok: false, error };
    return { ok: true, count: typeof count === "number" ? count : null };
  } catch (error) {
    return { ok: false, error };
  }
};

export const cargarOrganizaciones = async () => {
  try {
    const tableName = getOrganizationsTable();
    const schema = getSchema();
    const { client } = ensureClient();
    const { data, error } = await client
      .schema(schema)
      .from(tableName)
      .select(
        "id, name, country, city, address, lat, lng, ods, targetPopulation, socialObject, contact, projects"
      );
    if (error) {
      console.error("Error cargando organizaciones:", error);
      return [];
    }
    const normalized = (data || []).map((orgRaw) => {
      const org = { ...orgRaw };
      // Columnas alternativas comunes
      if (org.latitude != null && org.lat == null) org.lat = org.latitude;
      if (org.longitude != null && org.lng == null) org.lng = org.longitude;
      if (org.target_population && !org.targetPopulation) org.targetPopulation = org.target_population;
      if (org.ods_string && !org.ods) org.ods = String(org.ods_string).split(/[,;\s]+/).filter(Boolean).map((v) => Number(v));
      if (org.ods_list && !org.ods) org.ods = org.ods_list;

      const odsRaw = Array.isArray(org.ods) ? org.ods : [];
      const ods = odsRaw.map((v) => (typeof v === "number" ? String(v) : String(v || "").trim())).filter(Boolean);

      const targetPopulation = Array.isArray(org.targetPopulation)
        ? org.targetPopulation.map((v) => String(v || "").trim()).filter(Boolean)
        : [];

      const lat = typeof org.lat === "string" || typeof org.lat === "number" ? Number(org.lat) : null;
      const lng = typeof org.lng === "string" || typeof org.lng === "number" ? Number(org.lng) : null;

      return {
        id: org.id,
        name: org.name || "Sin nombre",
        country: org.country || "",
        city: org.city || "",
        address: org.address || "",
        lat: Number.isFinite(lat) ? lat : 0,
        lng: Number.isFinite(lng) ? lng : 0,
        ods,
        targetPopulation,
        socialObject: org.socialObject || "",
        contact: org.contact || { email: "", phone: "", website: "" },
        projects: Array.isArray(org.projects) ? org.projects : [],
      };
    });
    return normalized;
  } catch (error) {
    console.error("Error inesperado:", error);
    return [];
  }
};

export const crearOrganizacion = async (organizacion) => {
  try {
    const tableName = getOrganizationsTable();
    const schema = getSchema();
    const { client } = ensureClient();
    const { data, error } = await client
      .schema(schema)
      .from(tableName)
      .insert([organizacion])
      .select();
    if (error) {
      console.error("Error creando organización:", error);
      return null;
    }
    return data?.[0] || null;
  } catch (error) {
    console.error("Error inesperado:", error);
    return null;
  }
};

export const actualizarOrganizacion = async (id, actualizaciones) => {
  try {
    const tableName = getOrganizationsTable();
    const schema = getSchema();
    const { client } = ensureClient();
    const { data, error } = await client
      .schema(schema)
      .from(tableName)
      .update(actualizaciones)
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error actualizando organización:", error);
      return null;
    }
    return data?.[0] || null;
  } catch (error) {
    console.error("Error inesperado:", error);
    return null;
  }
};

export const eliminarOrganizacion = async (id) => {
  try {
    const tableName = getOrganizationsTable();
    const schema = getSchema();
    const { client } = ensureClient();
    const { error } = await client.schema(schema).from(tableName).delete().eq("id", id);
    if (error) {
      console.error("Error eliminando organización:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error inesperado:", error);
    return false;
  }
};


