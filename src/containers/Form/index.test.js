import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // Modif !! code origin : await screen.findByText("Envoyer");
      // Ajout de waitFor afin de pouvoir tester la fonction asynchrome
      // Problème trouver par lecture logique du code
      await waitFor(() => screen.findByText("Envoyer"), {timeout:2000});
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
