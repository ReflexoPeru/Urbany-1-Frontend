export const mockDepartamentos = [
    { id: 1, nombre: "Amazonas" },
    { id: 2, nombre: "Áncash" },
    { id: 3, nombre: "Apurímac" },
    { id: 4, nombre: "Arequipa" },
    { id: 5, nombre: "Ayacucho" },
    { id: 6, nombre: "Cajamarca" },
    { id: 7, nombre: "Callao" },
    { id: 8, nombre: "Cusco" },
    { id: 9, nombre: "Huancavelica" },
    { id: 10, nombre: "Huánuco" },
    { id: 11, nombre: "Ica" },
    { id: 12, nombre: "Junín" },
    { id: 13, nombre: "La Libertad" },
    { id: 14, nombre: "Lambayeque" },
    { id: 15, nombre: "Lima" },
    { id: 16, nombre: "Loreto" },
    { id: 17, nombre: "Madre de Dios" },
    { id: 18, nombre: "Moquegua" },
    { id: 19, nombre: "Pasco" },
    { id: 20, nombre: "Piura" },
    { id: 21, nombre: "Puno" },
    { id: 22, nombre: "San Martín" },
    { id: 23, nombre: "Tacna" },
    { id: 24, nombre: "Tumbes" },
    { id: 25, nombre: "Ucayali" }
];

export const mockProvincias = [
    // Lima
    { id: 1, departamentoId: 15, nombre: "Lima" },
    { id: 2, departamentoId: 15, nombre: "Cañete" },
    { id: 3, departamentoId: 15, nombre: "Huaura" },
    { id: 4, departamentoId: 15, nombre: "Cajatambo" },
    { id: 5, departamentoId: 15, nombre: "Yauyos" },
    { id: 6, departamentoId: 15, nombre: "Huaral" },
    { id: 7, departamentoId: 15, nombre: "Huarochirí" },
    // Arequipa
    { id: 8, departamentoId: 4, nombre: "Arequipa" },
    { id: 9, departamentoId: 4, nombre: "Caylloma" },
    { id: 10, departamentoId: 4, nombre: "Camaná" },
    { id: 11, departamentoId: 4, nombre: "Castilla" },
    { id: 12, departamentoId: 4, nombre: "Condesuyos" },
    { id: 13, departamentoId: 4, nombre: "Islay" },
    // Cusco
    { id: 14, departamentoId: 8, nombre: "Cusco" },
    { id: 15, departamentoId: 8, nombre: "Anta" },
    { id: 16, departamentoId: 8, nombre: "Calca" },
    { id: 17, departamentoId: 8, nombre: "Canchis" },
    { id: 18, departamentoId: 8, nombre: "Urubamba" },
    // Piura
    { id: 19, departamentoId: 20, nombre: "Piura" },
    { id: 20, departamentoId: 20, nombre: "Paita" },
    { id: 21, departamentoId: 20, nombre: "Sullana" },
    { id: 22, departamentoId: 20, nombre: "Talara" },
    { id: 23, departamentoId: 20, nombre: "Sechura" },
    // La Libertad
    { id: 24, departamentoId: 13, nombre: "Trujillo" },
    { id: 25, departamentoId: 13, nombre: "Pacasmayo" },
    { id: 26, departamentoId: 13, nombre: "Chepén" },
    { id: 27, departamentoId: 13, nombre: "Julcán" }
];

export const mockDistritos = [
    // Lima - Lima
    { id: 1, provinciaId: 1, nombre: "Miraflores" },
    { id: 2, provinciaId: 1, nombre: "San Isidro" },
    { id: 3, provinciaId: 1, nombre: "Barranco" },
    { id: 4, provinciaId: 1, nombre: "Surco" },
    { id: 5, provinciaId: 1, nombre: "La Molina" },
    { id: 6, provinciaId: 1, nombre: "Jesús María" },
    { id: 7, provinciaId: 1, nombre: "Lince" },
    { id: 8, provinciaId: 1, nombre: "Magdalena del Mar" },
    { id: 9, provinciaId: 1, nombre: "Chorrillos" },
    { id: 10, provinciaId: 1, nombre: "Pueblo Libre" },
    // Lima - Huaura
    { id: 11, provinciaId: 3, nombre: "Huacho" },
    { id: 12, provinciaId: 3, nombre: "Hualmay" },
    { id: 13, provinciaId: 3, nombre: "Santa María" },
    { id: 14, provinciaId: 3, nombre: "Carquín" },
    // Lima - Cañete
    { id: 15, provinciaId: 2, nombre: "San Vicente de Cañete" },
    { id: 16, provinciaId: 2, nombre: "Imperial" },
    { id: 17, provinciaId: 2, nombre: "Lunahuaná" },
    // Arequipa - Arequipa
    { id: 18, provinciaId: 8, nombre: "Arequipa" },
    { id: 19, provinciaId: 8, nombre: "Cayma" },
    { id: 20, provinciaId: 8, nombre: "Yanahuara" },
    { id: 21, provinciaId: 8, nombre: "Cerro Colorado" },
    { id: 22, provinciaId: 8, nombre: "Sachaca" },
    // Cusco - Cusco
    { id: 23, provinciaId: 14, nombre: "Cusco" },
    { id: 24, provinciaId: 14, nombre: "Wanchaq" },
    { id: 25, provinciaId: 14, nombre: "Santiago" },
    { id: 26, provinciaId: 14, nombre: "San Jerónimo" },
    // Cusco - Urubamba
    { id: 27, provinciaId: 18, nombre: "Urubamba" },
    { id: 28, provinciaId: 18, nombre: "Ollantaytambo" },
    // Piura - Piura
    { id: 29, provinciaId: 19, nombre: "Piura" },
    { id: 30, provinciaId: 19, nombre: "Castilla" },
    { id: 31, provinciaId: 19, nombre: "Veintiséis de Octubre" },
    // La Libertad - Trujillo
    { id: 32, provinciaId: 24, nombre: "Trujillo" },
    { id: 33, provinciaId: 24, nombre: "La Esperanza" },
    { id: 34, provinciaId: 24, nombre: "El Porvenir" },
    { id: 35, provinciaId: 24, nombre: "Huanchaco" }
];