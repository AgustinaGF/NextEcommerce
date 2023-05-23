describe("Products", () => {
	it("should show all products", () => {
		cy.visit("/");
		cy.get('[data-test-id="product"]').should("have.length", 12);
	});
	it("displays a message when there are no products", () => {
		cy.visit("/");
		cy.get('[data-test-id="product"]').should("have.length", 0);
	});
});
