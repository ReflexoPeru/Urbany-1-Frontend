import React, { useState } from 'react';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Card from '../../components/ui/Card/Card';
import Select from '../../components/ui/Select/Select';
import DatePicker from '../../components/ui/DatePicker/DatePicker';
import Badge from '../../components/ui/Badge/Badge';
import Tag from '../../components/ui/Tag/Tag';
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';
import './ComponentShowcase.module.css';

const ComponentShowcase = () => {
  const [selectValue, setSelectValue] = useState('');
  const [dateValue, setDateValue] = useState(null);
  const [tags, setTags] = useState(['React', 'JavaScript', 'CSS']);
  const [loading, setLoading] = useState(false);

  const selectOptions = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' },
    { value: 'option5', label: 'Opción 5' }
  ];

  const handleTagRemove = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagAdd = () => {
    const newTag = `Tag ${tags.length + 1}`;
    setTags([...tags, newTag]);
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="component-showcase">
      <div className="showcase-header">
        <h1>🎨 Component Showcase</h1>
        <p>Explora todos los componentes disponibles en el sistema de diseño de Urbany</p>
      </div>

      <div className="showcase-content">
        {/* Button Components */}
        <section className="component-section">
          <h2>Botones</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Variantes</h3>
              <div className="demo-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>
            
            <div className="component-demo">
              <h3>Tamaños</h3>
              <div className="demo-row">
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>

            <div className="component-demo">
              <h3>Estados</h3>
              <div className="demo-row">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>

            <div className="component-demo">
              <h3>Con Iconos</h3>
              <div className="demo-row">
                <Button icon="plus">Agregar</Button>
                <Button icon="edit" variant="secondary">Editar</Button>
                <Button icon="trash" variant="danger">Eliminar</Button>
                <Button icon="download" variant="success">Descargar</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Components */}
        <section className="component-section">
          <h2>Campos de Entrada</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Tipos de Input</h3>
              <div className="demo-column">
                <Input 
                  type="text" 
                  label="Texto" 
                  placeholder="Ingresa texto aquí"
                />
                <Input 
                  type="email" 
                  label="Email" 
                  placeholder="ejemplo@email.com"
                />
                <Input 
                  type="password" 
                  label="Contraseña" 
                  placeholder="••••••••"
                />
                <Input 
                  type="number" 
                  label="Número" 
                  placeholder="123"
                />
              </div>
            </div>

            <div className="component-demo">
              <h3>Estados</h3>
              <div className="demo-column">
                <Input 
                  label="Normal" 
                  placeholder="Estado normal"
                />
                <Input 
                  label="Error" 
                  placeholder="Campo con error"
                  error="Este campo es requerido"
                />
                <Input 
                  label="Requerido" 
                  placeholder="Campo obligatorio"
                  required
                />
                <Input 
                  label="Deshabilitado" 
                  placeholder="Campo deshabilitado"
                  disabled
                />
              </div>
            </div>

            <div className="component-demo">
              <h3>Con Iconos</h3>
              <div className="demo-column">
                <Input 
                  label="Búsqueda" 
                  placeholder="Buscar..."
                  icon="search"
                />
                <Input 
                  label="Usuario" 
                  placeholder="Nombre de usuario"
                  icon="user"
                />
                <Input 
                  label="Teléfono" 
                  placeholder="Número de teléfono"
                  icon="phone"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Select Components */}
        <section className="component-section">
          <h2>Selectores</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Select Básico</h3>
              <div className="demo-column">
                <Select
                  label="Seleccionar opción"
                  placeholder="Elige una opción..."
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                />
                <Select
                  label="Select con búsqueda"
                  placeholder="Buscar y seleccionar..."
                  options={selectOptions}
                  searchable
                />
                <Select
                  label="Select con limpieza"
                  placeholder="Selecciona..."
                  options={selectOptions}
                  clearable
                />
              </div>
            </div>

            <div className="component-demo">
              <h3>Estados</h3>
              <div className="demo-column">
                <Select
                  label="Normal"
                  placeholder="Estado normal"
                  options={selectOptions}
                />
                <Select
                  label="Error"
                  placeholder="Campo con error"
                  options={selectOptions}
                  error="Este campo es requerido"
                />
                <Select
                  label="Deshabilitado"
                  placeholder="Campo deshabilitado"
                  options={selectOptions}
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* DatePicker Components */}
        <section className="component-section">
          <h2>Selector de Fechas</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>DatePicker Básico</h3>
              <div className="demo-column">
                <DatePicker
                  label="Fecha de nacimiento"
                  placeholder="Selecciona una fecha"
                  value={dateValue}
                  onChange={setDateValue}
                />
                <DatePicker
                  label="Fecha con límites"
                  placeholder="Fecha con restricciones"
                  minDate={new Date('2020-01-01')}
                  maxDate={new Date('2030-12-31')}
                />
                <DatePicker
                  label="Fecha requerida"
                  placeholder="Campo obligatorio"
                  required
                />
              </div>
            </div>

            <div className="component-demo">
              <h3>Estados</h3>
              <div className="demo-column">
                <DatePicker
                  label="Normal"
                  placeholder="Estado normal"
                />
                <DatePicker
                  label="Error"
                  placeholder="Campo con error"
                  error="Fecha inválida"
                />
                <DatePicker
                  label="Deshabilitado"
                  placeholder="Campo deshabilitado"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>

        {/* Badge Components */}
        <section className="component-section">
          <h2>Badges</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Variantes</h3>
              <div className="demo-row">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            <div className="component-demo">
              <h3>Tamaños</h3>
              <div className="demo-row">
                <Badge size="small">Small</Badge>
                <Badge size="medium">Medium</Badge>
                <Badge size="large">Large</Badge>
              </div>
            </div>

            <div className="component-demo">
              <h3>Con Iconos</h3>
              <div className="demo-row">
                <Badge variant="success" icon="check">Completado</Badge>
                <Badge variant="warning" icon="alert-circle">Advertencia</Badge>
                <Badge variant="info" icon="info-circle">Información</Badge>
              </div>
            </div>

            <div className="component-demo">
              <h3>Cerrables</h3>
              <div className="demo-row">
                <Badge variant="primary" closable onClose={() => alert('Badge cerrado')}>
                  Cerrable
                </Badge>
                <Badge variant="success" closable onClose={() => alert('Badge cerrado')}>
                  Éxito
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Tag Components */}
        <section className="component-section">
          <h2>Tags</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Variantes</h3>
              <div className="demo-row">
                <Tag variant="default">Default</Tag>
                <Tag variant="primary">Primary</Tag>
                <Tag variant="secondary">Secondary</Tag>
                <Tag variant="success">Success</Tag>
                <Tag variant="warning">Warning</Tag>
                <Tag variant="danger">Danger</Tag>
                <Tag variant="info">Info</Tag>
                <Tag variant="outline">Outline</Tag>
              </div>
            </div>

            <div className="component-demo">
              <h3>Tamaños</h3>
              <div className="demo-row">
                <Tag size="small">Small</Tag>
                <Tag size="medium">Medium</Tag>
                <Tag size="large">Large</Tag>
              </div>
            </div>

            <div className="component-demo">
              <h3>Interactivos</h3>
              <div className="demo-row">
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    variant="primary"
                    closable
                    onClose={() => handleTagRemove(index)}
                  >
                    {tag}
                  </Tag>
                ))}
                <Tag.Add onClick={handleTagAdd} />
              </div>
            </div>

            <div className="component-demo">
              <h3>Clickables</h3>
              <div className="demo-row">
                <Tag variant="primary" onClick={() => alert('Tag clickeado')}>
                  Clickable
                </Tag>
                <Tag variant="success" onClick={() => alert('Tag clickeado')}>
                  Éxito
                </Tag>
              </div>
            </div>
          </div>
        </section>

        {/* LoadingSpinner Components */}
        <section className="component-section">
          <h2>Indicadores de Carga</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Tamaños</h3>
              <div className="demo-row">
                <LoadingSpinner size="small" />
                <LoadingSpinner size="medium" />
                <LoadingSpinner size="large" />
                <LoadingSpinner size="xlarge" />
              </div>
            </div>

            <div className="component-demo">
              <h3>Variantes</h3>
              <div className="demo-row">
                <LoadingSpinner variant="primary" />
                <LoadingSpinner variant="secondary" />
                <LoadingSpinner variant="danger" />
                <LoadingSpinner variant="success" />
                <LoadingSpinner variant="warning" />
                <LoadingSpinner variant="info" />
              </div>
            </div>

            <div className="component-demo">
              <h3>Con Texto</h3>
              <div className="demo-column">
                <LoadingSpinner size="medium" text="Cargando datos..." />
                <LoadingSpinner size="large" text="Procesando información..." />
              </div>
            </div>

            <div className="component-demo">
              <h3>Botón con Loading</h3>
              <div className="demo-row">
                <LoadingSpinner.Button
                  loading={loading}
                  onClick={handleLoadingDemo}
                  variant="primary"
                >
                  {loading ? 'Cargando...' : 'Iniciar Carga'}
                </LoadingSpinner.Button>
                <LoadingSpinner.Button
                  loading={loading}
                  onClick={handleLoadingDemo}
                  variant="secondary"
                >
                  {loading ? 'Procesando...' : 'Procesar'}
                </LoadingSpinner.Button>
              </div>
            </div>
          </div>
        </section>

        {/* Card Components */}
        <section className="component-section">
          <h2>Tarjetas</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Tarjeta Completa</h3>
              <Card>
                <Card.Header>
                  <h3>Título de la Tarjeta</h3>
                </Card.Header>
                <Card.Body>
                  <p>Este es el contenido principal de la tarjeta. Puede contener cualquier elemento.</p>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary" size="small">Acción</Button>
                </Card.Footer>
              </Card>
            </div>

            <div className="component-demo">
              <h3>Variantes</h3>
              <div className="demo-column">
                <Card variant="default">
                  <Card.Body>
                    <h4>Tarjeta Default</h4>
                    <p>Contenido de la tarjeta.</p>
                  </Card.Body>
                </Card>
                <Card variant="elevated">
                  <Card.Body>
                    <h4>Tarjeta Elevated</h4>
                    <p>Con sombra más pronunciada.</p>
                  </Card.Body>
                </Card>
                <Card variant="outlined">
                  <Card.Body>
                    <h4>Tarjeta Outlined</h4>
                    <p>Con borde destacado.</p>
                  </Card.Body>
                </Card>
                <Card variant="flat">
                  <Card.Body>
                    <h4>Tarjeta Flat</h4>
                    <p>Sin sombra, fondo gris.</p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Components */}
        <section className="component-section">
          <h2>Componentes de Layout</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Información</h3>
              <p>Los componentes de layout como Header, Sidebar y Footer están disponibles pero requieren el contexto completo de la aplicación para mostrarse correctamente.</p>
            </div>
          </div>
        </section>

        {/* Charts Components */}
        <section className="component-section">
          <h2>Gráficos</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Información</h3>
              <p>Los componentes de gráficos (BarChart, LineChart, PieChart, Map) están disponibles en la carpeta charts/ y requieren datos específicos para renderizarse.</p>
            </div>
          </div>
        </section>

        {/* Common Components */}
        <section className="component-section">
          <h2>Componentes Comunes</h2>
          <div className="component-grid">
            <div className="component-demo">
              <h3>Información</h3>
              <p>Componentes como DataTable, Pagination, Select y StatusIndicator están disponibles en la carpeta common/.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentShowcase;