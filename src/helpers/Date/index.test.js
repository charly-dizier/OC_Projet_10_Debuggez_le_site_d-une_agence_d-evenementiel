import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            // Ajout d'un test qui s'assure de la bonne corélation des dates lorsque getMonth est utilisé
            const date = getMonth(new Date('2022-01-01'))
            expect(date).toEqual("janvier")
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            // Ajout d'un test qui s'assure de la bonne corélation des dates lorsque getMonth est utilisé
            const date = getMonth(new Date('2022-07-08'))
            expect(date).toEqual("juillet")
        });
    });
})

