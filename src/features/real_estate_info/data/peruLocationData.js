// Mock de datos geográficos de Perú
// Estructura: Departamento -> Provincias -> Distritos

export const peruGeographicData = {
    lima: {
        name: 'Lima',
        provinces: {
            lima: {
                name: 'Lima',
                districts: [
                    'Miraflores',
                    'San Isidro',
                    'Barranco',
                    'Surco',
                    'La Molina',
                    'San Borja',
                    'Jesús María',
                    'Magdalena',
                    'Pueblo Libre',
                    'Breña',
                    'Lince',
                    'San Miguel',
                    'Callao',
                    'Ventanilla',
                    'Comas',
                    'Independencia',
                    'San Juan de Lurigancho',
                    'Ate',
                    'Santa Anita',
                    'El Agustino',
                    'Rímac',
                    'San Juan de Miraflores',
                    'Villa María del Triunfo',
                    'Villa El Salvador',
                    'Chorrillos',
                    'Pachacámac',
                    'Lurín',
                    'Punta Hermosa',
                    'Punta Negra',
                    'San Bartolo',
                    'Pucusana',
                    'Santa María del Mar',
                    'Cerro Azul',
                    'Mala',
                    'Chilca',
                    'Coayllo',
                    'Imperial',
                    'Nuevo Imperial',
                    'Pacarán',
                    'Quince Mil',
                    'San Antonio',
                    'San Luis',
                    'San Vicente de Cañete',
                    'Santa Cruz de Flores',
                    'Zúñiga'
                ]
            }
        }
    },
    arequipa: {
        name: 'Arequipa',
        provinces: {
            arequipa: {
                name: 'Arequipa',
                districts: [
                    'Arequipa',
                    'Alto Selva Alegre',
                    'Cayma',
                    'Cerro Colorado',
                    'Characato',
                    'Chiguata',
                    'Jacobo Hunter',
                    'La Joya',
                    'Mariano Melgar',
                    'Miraflores',
                    'Mollebaya',
                    'Paucarpata',
                    'Pocsi',
                    'Polobaya',
                    'Quequeña',
                    'Sabandia',
                    'Sachaca',
                    'San Juan de Siguas',
                    'San Juan de Tarucani',
                    'Santa Isabel de Siguas',
                    'Santa Rita de Siguas',
                    'Socabaya',
                    'Tiabaya',
                    'Uchumayo',
                    'Vitor',
                    'Yanahuara',
                    'Yarabamba',
                    'Yura'
                ]
            },
            caylloma: {
                name: 'Caylloma',
                districts: [
                    'Chivay',
                    'Achoma',
                    'Cabanaconde',
                    'Callalli',
                    'Caylloma',
                    'Coporaque',
                    'Huambo',
                    'Huanca',
                    'Ichupampa',
                    'Lari',
                    'Lluta',
                    'Maca',
                    'Madrigal',
                    'Majes',
                    'San Antonio de Chuca',
                    'Sibayo',
                    'Tapay',
                    'Tisco',
                    'Tuti',
                    'Yanque'
                ]
            }
        }
    },
    cusco: {
        name: 'Cusco',
        provinces: {
            cusco: {
                name: 'Cusco',
                districts: [
                    'Cusco',
                    'Ccorca',
                    'Poroy',
                    'San Jerónimo',
                    'San Sebastian',
                    'Santiago',
                    'Saylla',
                    'Wanchaq'
                ]
            },
            urubamba: {
                name: 'Urubamba',
                districts: [
                    'Urubamba',
                    'Chinchero',
                    'Huayllabamba',
                    'Machupicchu',
                    'Maras',
                    'Ollantaytambo',
                    'Yucay'
                ]
            }
        }
    },
    piura: {
        name: 'Piura',
        provinces: {
            piura: {
                name: 'Piura',
                districts: [
                    'Piura',
                    'Castilla',
                    'Catacaos',
                    'Cura Mori',
                    'El Tallán',
                    'La Arena',
                    'La Unión',
                    'Las Lomas',
                    'Tambo Grande',
                    'Veintiseis de Octubre'
                ]
            },
            sullana: {
                name: 'Sullana',
                districts: [
                    'Sullana',
                    'Bellavista',
                    'Ignacio Escudero',
                    'Lancones',
                    'Marcavelica',
                    'Miguel Checa',
                    'Querecotillo',
                    'Salitral'
                ]
            }
        }
    },
    trujillo: {
        name: 'La Libertad',
        provinces: {
            trujillo: {
                name: 'Trujillo',
                districts: [
                    'Trujillo',
                    'El Porvenir',
                    'Florencia de Mora',
                    'Huanchaco',
                    'La Esperanza',
                    'Laredo',
                    'Moche',
                    'Poroto',
                    'Salaverry',
                    'Simbal',
                    'Victor Larco Herrera'
                ]
            },
            chiclayo: {
                name: 'Chiclayo',
                districts: [
                    'Chiclayo',
                    'Cayalti',
                    'Chongoyape',
                    'Eten',
                    'Eten Puerto',
                    'José Leonardo Ortiz',
                    'La Victoria',
                    'Lagunas',
                    'Monsefú',
                    'Nueva Arica',
                    'Oyotún',
                    'Picsi',
                    'Pimentel',
                    'Reque',
                    'Santa Rosa',
                    'Saña',
                    'Cayalti',
                    'Chongoyape',
                    'Eten',
                    'Eten Puerto',
                    'José Leonardo Ortiz',
                    'La Victoria',
                    'Lagunas',
                    'Monsefú',
                    'Nueva Arica',
                    'Oyotún',
                    'Picsi',
                    'Pimentel',
                    'Reque',
                    'Santa Rosa',
                    'Saña'
                ]
            }
        }
    }
};

// Función para obtener departamentos
export const getDepartments = () => {
    return Object.keys(peruGeographicData).map(key => ({
        value: key,
        label: peruGeographicData[key].name
    }));
};

// Función para obtener provincias por departamento
export const getProvincesByDepartment = (departmentKey) => {
    if (!departmentKey || !peruGeographicData[departmentKey]) {
        return [];
    }

    return Object.keys(peruGeographicData[departmentKey].provinces).map(key => ({
        value: key,
        label: peruGeographicData[departmentKey].provinces[key].name
    }));
};

// Función para obtener distritos por provincia
export const getDistrictsByProvince = (departmentKey, provinceKey) => {
    if (!departmentKey || !provinceKey || !peruGeographicData[departmentKey]?.provinces[provinceKey]) {
        return [];
    }

    return peruGeographicData[departmentKey].provinces[provinceKey].districts.map(district => ({
        value: district.toLowerCase().replace(/\s+/g, '_'),
        label: district
    }));
};

// Datos iniciales de ejemplo
export const initialLocationData = {
    department: 'lima',
    province: 'lima',
    district: 'miraflores'
};

