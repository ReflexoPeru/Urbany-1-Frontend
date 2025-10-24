import React from 'react';
import globeImagen from '../../../assets/Globo-terraqueo.webp';
import './appraisals.css';

const Tasaciones = () => {
    return (
        <div className='pagina-tasaciones'>
            <div className='tarjeta tarjeta-estadisticas'>             
                <header className='tarjeta-cabecera'>
                    <h1>Tasaciones</h1>
                    <button className='btn btn-primario'>Añadir Nueva Tasación</button>
                </header>
                <div className='estadisticas'>
                    <h2 className='estadisticas-titulo'>Estadísticas</h2>
                </div>               
                <div className='cabecera-navegacion'>
                    <nav>
                        <a href="#" className='consulta'>Nueva Consulta</a>
                        <a href="#" className='programada'>Visita Programada</a>
                        <a href="#" className='tasacion'>En Tasación</a>
                    </nav>                   
                    <div className='icono-configuracion'>
                    </div>
                </div>
                <div className='cajas-numeros-contenedor'>
                    <div className='caja-numero'>
                        <span className='numero-contador'>0</span>
                    </div>
                    <div className='caja-numero'>
                        <span className='numero-contador'>0</span>
                    </div>
                    <div className='caja-numero'>
                        <span className='numero-contador'>0</span>
                    </div>
                </div>
            </div>
            <div className="tarjeta tarjeta-consultas">
                <div className="contenedor-busqueda">
                    <input 
                        type="text" 
                        className="campo-busqueda"
                        placeholder="Buscar por nombre, email, teléfono y propiedad..." 
                    />
                </div>
                
                <div className="contenedor-filtros">
                    <button className="btn-filtro">Agente</button>
                    <button className="btn-filtro">Tasaciones abiertas</button>
                    <button className="btn-filtro">Etiquetas</button>
                    <button className="btn-filtro btn-agregar">+</button>
                    <button className="btn-filtro">Todos</button>
                </div>
                
                <div className="tabla-cabecera">
                    <input type="checkbox" />
                    <span className="item-cabecera">NOMBRE</span>
                    <span className="item-cabecera">CONTACTO</span>
                    <span className="item-cabecera">PROPIEDAD</span>
                    <span className="item-cabecera">FECHA</span>
                </div>
                
                <div className="estado-vacio">
                    <h2>¡Fantástico! No hay consultas pendientes.</h2>
                    <p>Puedes continuar con tus tareas del día.</p>
                    <img src={globeImagen} alt="Globo terráqueo" className='imagen-estado-vacio' />
                </div>
            </div>
        </div>
    );
};

export default Tasaciones;