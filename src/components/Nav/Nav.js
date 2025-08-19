import React from "react";

const Nav = ({
  currentPage,
  setCurrentPage,
  t,
  language,
  setLanguage,
  supabaseStatus,
  onRefresh
}) => (
  <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
      <div className="flex justify-between h-20">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="font-bold text-4xl">CooLab</span>
          </div>
          <button
            onClick={onRefresh}
            title="Estado de datos (click para refrescar)"
            className={`ml-4 px-2 py-1 rounded text-[11px] font-semibold border transition-colors ${
              supabaseStatus?.ok === true
                ? "bg-green-600 text-white border-green-500 hover:bg-green-700"
                : supabaseStatus?.ok === false
                ? "bg-red-600 text-white border-red-500 hover:bg-red-700"
                : "bg-gray-500 text-white border-gray-400 hover:bg-gray-600"
            }`}
          >
            {supabaseStatus?.ok ? "OK_data" : "NO-OK_data"}
          </button>
        </div>
        <div className="flex items-center space-x-5">
          <button
            onClick={() => setCurrentPage("home")}
            className={`ml-6 px-4 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap ${currentPage === "home" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
          >
            {t.home}
          </button>
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`px-4 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap ${currentPage === "dashboard" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
          >
            Perfil
          </button>
          <button
            onClick={() => setCurrentPage("manuals")}
            className={`px-4 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap ${currentPage === "manuals" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
          >
            {t.manuals}
          </button>
          <button
            onClick={() => setCurrentPage("services")}
            className={`px-4 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap ${currentPage === "services" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
          >
            {t.services}
          </button>
          <button
            onClick={() => setCurrentPage("community")}
            className={`px-4 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap ${currentPage === "community" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
          >
            {t.community}
          </button>
          <button
            onClick={() => setCurrentPage("contact")}
            className={`px-4 py-3 rounded-md text-base font-medium transition-colors whitespace-nowrap ${currentPage === "contact" ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"}`}
          >
            {t.contact}
          </button>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-white border-opacity-30 rounded-md px-4 py-2 text-base focus:outline-none"
            >
              <option value="es">🇪🇸 {t.select_language}</option>
              <option value="en">🇬🇧 English</option>
              <option value="pt">🇵🇹 Português</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="ko">🇰🇷 한국어</option>
              <option value="zh">🇨🇳 中文</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;

