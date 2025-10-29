import React from 'react';
import styles from './PropertiesTable.module.css';

const PropertiesTable = () => {
  const properties = [
    {
      id: 1,
      direccion: {
        main: "Neuquen 1800",
        secondary: "Capital Federal | Caballito"
      },
      comision: "30%",
      tipo: "Departamento",
      operacion: "Alquiler",
      precio: "AR$ 460.000",
      detalles: "2 dormitorios", // AGREGADO: Detalles para alinear con los demás
      inmobiliaria: "Inmobiliaria ABC"
    },
    {
      id: 2,
      direccion: {
        main: "Rio de Janeiro 577",
        secondary: "Capital Federal | Caballito"
      },
      comision: "30%",
      tipo: "Departamento",
      operacion: "Venta",
      precio: "USD 200.000",
      detalles: "2 dormitorios",
      inmobiliaria: "Inmobiliaria XYZ"
    },
    {
      id: 3,
      direccion: {
        main: "Rio de Janeiro 577",
        secondary: "Capital Federal | Caballito"
      },
      comision: "30%",
      tipo: "Departamento",
      operacion: "Venta",
      precio: "USD 140.000",
      detalles: "1 dormitorio",
      inmobiliaria: "Inmobiliaria LMN"
    },
    {
      id: 4,
      direccion: {
        main: "Directorio 1600",
        secondary: "Capital Federal | Caballito"
      },
      comision: "30%",
      tipo: "Departamento",
      operacion: "Venta",
      precio: "USD 208.000",
      detalles: "2 dormitorios",
      inmobiliaria: "Inmobiliaria PQR"
    }
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.propertiesTable}>
        <thead>
          <tr>
            <th className={styles.checkboxCell}>
              <input
                type="checkbox"
                className={styles.headerCheckbox}
              />
            </th>
            <th>Foto</th>
            <th>Dirección</th>
            <th>Comisión</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Inmobiliaria</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                />
              </td>
              <td>
                <div className={styles.photoPlaceholder}>
                  <span>Foto</span>
                </div>
              </td>
              <td className={styles.address}>
                <span className={styles.addressMain}>{property.direccion.main}</span>
                <span className={styles.addressSecondary}>{property.direccion.secondary}</span>
              </td>
              <td>
                <span className={styles.commission}>{property.comision}</span>
              </td>
              <td>
                <div className={styles.propertyType}>{property.tipo}</div>
                <div className={styles.operationType}>{property.operacion}</div>
              </td>
              <td className={styles.priceSection}>
                <div className={styles.price}>{property.precio}</div>
                {property.detalles && (
                  <span className={styles.priceDetails}>{property.detalles}</span>
                )}
              </td>
              <td className={styles.inmobiliaria}>{property.inmobiliaria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesTable;