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
	it("show cart drawer and closes it correctly, making sure the link is valid", () => {
		cy.visit("/default");

		cy.get('[data-testid="cart"]').should('not.exist');
		cy.get('[data-testid="product"] button').first().click();
		cy.get('[data-testid="show-cart"]').click();
		cy.get('[data-testid="cart"]').should('be.visible');
		cy.get('[data-testid="complete-order"]').should('have.attr', 'href').and('contain', 'wa.me');
		cy.get('[aria-label="Close"]').click();
		cy.get('[data-testid="cart"]').should('not.exist');
	});

});
