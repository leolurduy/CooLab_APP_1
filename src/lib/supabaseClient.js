import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const cargarOrganizaciones = async () => {
  try {
    const { data, error } = await supabase.from("organizations").select("*");
    if (error) {
      console.error("Error cargando organizaciones:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Error inesperado:", error);
    return [];
  }
};

export const crearOrganizacion = async (organizacion) => {
  try {
    const { data, error } = await supabase
      .from("organizations")
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
    const { data, error } = await supabase
      .from("organizations")
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
    const { error } = await supabase.from("organizations").delete().eq("id", id);
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


