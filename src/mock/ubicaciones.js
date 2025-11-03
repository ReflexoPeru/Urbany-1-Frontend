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
    { id: 27, departamentoId: 13, nombre: "Julcán" },
    // Huánuco
    { id: 28, departamentoId: 10, nombre: "Huánuco" },
    { id: 29, departamentoId: 10, nombre: "Ambo" },
    { id: 30, departamentoId: 10, nombre: "Huamalíes" },
    { id: 31, departamentoId: 10, nombre: "Dos de Mayo" },
    { id: 32, departamentoId: 10, nombre: "Leoncio Prado" },
    // Lambayeque
    { id: 33, departamentoId: 14, nombre: "Chiclayo" },
    { id: 34, departamentoId: 14, nombre: "Lambayeque" },
    { id: 35, departamentoId: 14, nombre: "Ferreñafe" },
    // Amazonas
    { id: 36, departamentoId: 1, nombre: "Chachapoyas" },
    { id: 37, departamentoId: 1, nombre: "Bagua" },
    { id: 38, departamentoId: 1, nombre: "Luya" },
    // Áncash
    { id: 39, departamentoId: 2, nombre: "Huaraz" },
    { id: 40, departamentoId: 2, nombre: "Huaralíes" },
    { id: 41, departamentoId: 2, nombre: "Carhuaz" },
    // Ica
    { id: 42, departamentoId: 11, nombre: "Ica" },
    { id: 43, departamentoId: 11, nombre: "Chincha" },
    { id: 44, departamentoId: 11, nombre: "Nazca" }
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
    { id: 35, provinciaId: 24, nombre: "Huanchaco" },
    // Huánuco - Huánuco
    { id: 36, provinciaId: 28, nombre: "Huánuco" },
    { id: 37, provinciaId: 28, nombre: "Amarilis" },
    { id: 38, provinciaId: 28, nombre: "Chinchao" },
    { id: 39, provinciaId: 28, nombre: "Churubamba" },
    { id: 40, provinciaId: 28, nombre: "Santa María del Valle" },
    // Huánuco - Ambo
    { id: 41, provinciaId: 29, nombre: "Ambo" },
    { id: 42, provinciaId: 29, nombre: "Cayna" },
    { id: 43, provinciaId: 29, nombre: "Colpas" },
    // Huánuco - Huamalíes
    { id: 44, provinciaId: 30, nombre: "Llata" },
    { id: 45, provinciaId: 30, nombre: "Arancay" },
    { id: 46, provinciaId: 30, nombre: "Chavín de Pariarca" },
    // Huánuco - Dos de Mayo
    { id: 47, provinciaId: 31, nombre: "La Unión" },
    { id: 48, provinciaId: 31, nombre: "Chuquis" },
    { id: 49, provinciaId: 31, nombre: "Marías" },
    // Huánuco - Leoncio Prado
    { id: 50, provinciaId: 32, nombre: "Rupa-Rupa" },
    { id: 51, provinciaId: 32, nombre: "Daniel Alomía Robles" },
    { id: 52, provinciaId: 32, nombre: "Hermilio Valdizán" },
    // Lambayeque - Chiclayo
    { id: 53, provinciaId: 33, nombre: "Chiclayo" },
    { id: 54, provinciaId: 33, nombre: "La Victoria" },
    { id: 55, provinciaId: 33, nombre: "José Leonardo Ortiz" },
    { id: 56, provinciaId: 33, nombre: "Pimentel" },
    // Lambayeque - Lambayeque
    { id: 57, provinciaId: 34, nombre: "Lambayeque" },
    { id: 58, provinciaId: 34, nombre: "San José" },
    { id: 59, provinciaId: 34, nombre: "Illimo" },
    // Amazonas - Chachapoyas
    { id: 60, provinciaId: 36, nombre: "Chachapoyas" },
    { id: 61, provinciaId: 36, nombre: "Asunción" },
    { id: 62, provinciaId: 36, nombre: "Balsas" },
    // Áncash - Huaraz
    { id: 63, provinciaId: 39, nombre: "Huaraz" },
    { id: 64, provinciaId: 39, nombre: "Cochabamba" },
    { id: 65, provinciaId: 39, nombre: "Colcabamba" },
    // Ica - Ica
    { id: 66, provinciaId: 42, nombre: "Ica" },
    { id: 67, provinciaId: 42, nombre: "La Tinguiña" },
    { id: 68, provinciaId: 42, nombre: "Los Aquijes" },
    // Ica - Chincha
    { id: 69, provinciaId: 43, nombre: "Chincha Alta" },
    { id: 70, provinciaId: 43, nombre: "Chincha Baja" },
    { id: 71, provinciaId: 43, nombre: "El Carmen" }
];