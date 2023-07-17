import mock from "../../products/mocks/default.json"

describe("Products", () => {
	it("should show all products", () => {
		cy.visit("/default");
		cy.get('[data-testid="product"]').should("have.length", mock.length);
	});
	it("displays a message when there are no products", () => {
		cy.visit("/empty");
		cy.get('[data-testid="product"]').should("have.length", 0);
		
	});
});
