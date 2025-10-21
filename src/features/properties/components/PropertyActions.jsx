import React from 'react';
import {
  MagnifyingGlass,
  MapPin,
  Funnel,
  SlidersHorizontal,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import styles from '../pages/PropertiesPage.module.css';

const PropertyActions = () => {
  return (
    <>
      <div className={styles.iconosAcciones}>        
        <MagnifyingGlass size={32} />
        <MapPin size={32} />
        <Funnel size={32} />
        <SlidersHorizontal size={32} />
      </div>
      <div className={styles.optionpages}>
        <CaretLeft size={32}/>
        <div><span>1</span> 2 3 ... 10</div>
        <CaretRight size={32}/>
      </div>
    </>
  );
};

export default PropertyActions;
