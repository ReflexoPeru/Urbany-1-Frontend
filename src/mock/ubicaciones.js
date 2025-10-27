export const mockDepartamentos = [
    { id: 1, nombre: "Lima" },
    { id: 2, nombre: "Arequipa" },
    { id: 3, nombre: "Cusco" },
    { id: 4, nombre: "Piura" },
    { id: 5, nombre: "La Libertad" }
];

export const mockProvincias = [
    { id: 1, departamentoId: 1, nombre: "Lima" },
    { id: 2, departamentoId: 1, nombre: "Huaura" },
    { id: 3, departamentoId: 1, nombre: "Cañete" },
    { id: 4, departamentoId: 2, nombre: "Arequipa" },
    { id: 5, departamentoId: 2, nombre: "Caylloma" }
];

export const mockDistritos = [
    { id: 1, provinciaId: 1, nombre: "Miraflores" },
    { id: 2, provinciaId: 1, nombre: "San Isidro" },
    { id: 3, provinciaId: 1, nombre: "Barranco" },
    { id: 4, provinciaId: 2, nombre: "Huacho" },
    { id: 5, provinciaId: 2, nombre: "Hualmay" }
];