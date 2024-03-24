// Modif !! Ajout de waitFor pour test asyncrome "message envoyé"
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // Modif !! code origin : await screen.findByText("Message envoyé !");
      // On attend que le message envoyé apparaisse
      // Probleme trouver grace au test unitaire
      // Ajout de waitFor dans l'import @testing-library/react
      await waitFor(() => screen.findByText("Message envoyé !"), {timeout:2000});
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // Ajout d'un test qui s'assure que le tableau events (qui contient les images des évènements)
    // Soit suppérieur à zéro.
    // data-testid="card-image-testid" est présent dans le composant EventCard
    render(<Home />);
    const events = screen.getAllByTestId("card-image-testid")
    expect(events.length).toBeGreaterThan(0);
  })

  it("a list a people is displayed", () => {
    // Ajout d'un test qui s'assure que le tableau peopleCard (qui contient tous membres de l'équipe) 
    // soit suppérieur à zéro
    // data-testid="people-card-testid" est présent dans le composant PeopleCard
    render (<Home />);
    const peopleCard = screen.getAllByTestId("people-card-testid");
    expect(peopleCard.length).toBeGreaterThan(0);

    // Ajout de test qui s'assure de la présence de deux éléments, nom et fonction, d'un des membres de l'équipe
    screen.getByText("Samira");
    screen.getByText("CEO");
  })

  it("a footer is displayed", () => {
    // Ajout d'un test qui s'assure de la présence du footer dans la page principal
    render(<Home />);
    const footer = screen.getByTestId("footer-testid");
    expect(footer).toBeInTheDocument();

    // Ajout de test qui s'assure de la présence de deux élément du footer
    screen.getByText("Contactez-nous")
    screen.getByText("contact@724events.com")
  })
});
