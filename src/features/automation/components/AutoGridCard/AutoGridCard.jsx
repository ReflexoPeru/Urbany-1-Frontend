import React from "react";
import AutoCard from "../AutoCard";
import styles from "./AutoGridCard.module.css";
import new_property from "../../../../assets/autocard/new_property.svg";
import deal_won from "../../../../assets/autocard/deal_won.svg";
import deal_lost from "../../../../assets/autocard/deal_lost.svg";
import new_meli_lead from "../../../../assets/autocard/new_meli_lead.svg";
import next_funnel_stage from "../../../../assets/autocard/next_funnel_stage.svg";
import new_lead from "../../../../assets/autocard/new_lead.svg";

const AutoGridCard = () => {
  const automations = [
    {
      index: 1,
      time: "45 MIN.",
      image: new_property,
      nombre: "Nueva Propiedad",
      text: "Cada vez que se añade una propiedad, enviar un email a interesados",
    },
    {
      index: 2,
      time: "15 MIN.",
      image: deal_won,
      nombre: "Negocio Ganado",
      text: "Cada vez que se gana un negocio, enviar un email",
    },
    {
      index: 3,
      time: "15 MIN.",
      image: deal_lost,
      nombre: "Negocio Perdido",
      text: "Cada vez que se pierde un negocio, enviar un email",
    },
    {
      index: 4,
      time: "15 MIN.",
      image: new_meli_lead,
      nombre: "Nuevo Negocio en Mercado Libre",
      text: "Cada vez que se añade un nuevo negocio de MercadoLibre, se responderá automáticamente",
    },
    {
      index: 5,
      time: "5 MIN.",
      image: next_funnel_stage,
      nombre: "Negocio enviado a Email o WhatsApp",
      text: "Cada vez que se se envíe un email o un WhatsApp, si el negocio se encuentra en la primera etapa del embudo se avanzará a la segunda",
    },
    {
      index: 6,
      time: "25 MIN.",
      image: new_lead,
      nombre: "Nuevo Negocio Añadido",
      text: "Cada vez que se añade un nuevo negocio, enviar un email",
    },
  ];

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {automations.map((auto, index) => (
          <AutoCard
            key={index}
            time={auto.time}
            image={auto.image}
            nombre={auto.name}
            text={auto.text}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoGridCard;
