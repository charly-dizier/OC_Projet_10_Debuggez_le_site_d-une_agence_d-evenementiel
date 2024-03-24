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
      // Problème trouver par lecture logique du code  
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
        // Modif !! suppression d'une div inutile

        // Modif !! code origin: <div key={event.title}
        // Changement de key afin d'optenir une key unique
        // Problème trouver grace a lecture de console inspecteur de code dans navigateur
        <div key={event.date}>
        <div
        className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          {/* Modif !! code origin: <img src={event.cover} alt="forum" />
          Changement d'alt pour la data description   
          Probblème trouver par lecture logique du code (mémoir, a confirme test de base) */}
            <img src={event.cover} alt={event.description} />
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
                // Change de key afin d'obtenir une key égale a l'image actuellement afficher
                // Problème trouver en grace a lecture de console inspecteur de code dans navigateur
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  /* Modi !! code origin checked={idx === radioIdx}
                  Problème trouver par lecture logique du code
                  Changement de idx par index afin d'indiquer quelle est l'image active */
                  checked={index === radioIdx}

                  // Ajout de readOnly sur les boutons radio du slider 
                  // afin qu'il ne soit qu'un indicateur visuel et non utilisable par les visiteur
                  // Problème trouver grace console de navigateur
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
