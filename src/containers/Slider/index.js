import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // Modif !! code origin: setIndex(index < byDateDesc.length ? index + 1 : 0), 5000
      // On s'assure que l'index +1 est bien inférieur à la totalité des données du tableau. 
      // le ? s'assure que byDataDesc n'est pas null ou undefined, 
      // sinon l'ensemble renveras undefined sans généré d'erreur. 
      // Problème trouver par lecture logique du code et console navigateur 
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Modif !! Nomage de la balise vide et déplacement de la Key afin qu'elle englobe la totalité de l'élément.
        // Problème trouve grace a lecture de console navigateur
        <div key={event.title}>
          <div 
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Modif !! code origin: key={`${event.id}`}
                  // Change de key, id n'existe pas dans notre data et "_" représente nos élement de la liste
                  // Problème trouver en grace a lecture des erreurs console 
                  key={_.title}
                  type="radio"
                  name="radio-button"
                  // Modif !! code origin checked={idx === radioIdx}
                  // Changement de idx par index afin d'indiquer quelle est l'image active
                  // Problème trouver par lecture logique du code
                  checked={index === radioIdx}
                  // Ajout de readOnly sur les boutons radio du slider 
                  // afin qu'il ne soit qu'un indicateur visuel et non utilisable par les visiteur.
                  // Problème trouver grace a lecture d'erreur console
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
