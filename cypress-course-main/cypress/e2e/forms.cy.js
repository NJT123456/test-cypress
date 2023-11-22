describe("forms tests", () => {
  beforeEach(()=>{
    cy.visit('/forms')
  })

  it('Test subscribe form', ()=>{
    cy.contains(/testing forms/i)
    cy.xpath('/html/body/main/div[2]').find('input').as('subscribe-input')
    cy.get('@subscribe-input').type('jin@example.com')
    cy.contains(/Successfully subbed: jin@example.com!/i).should('not.exist')
    cy.xpath('/html/body/main/button').click()
    cy.contains(/Successfully subbed: jin@example.com!/i).should('exist')
    cy.wait(3000)
    cy.contains(/Successfully subbed: jin@example.com!/i).should('not.exist')

    cy.get('@subscribe-input').type('jin@example.io')
    cy.contains(/invalid email: jin@example.io!/i).should('not.exist')
    cy.xpath('/html/body/main/button').click()
    cy.contains(/invalid email: jin@example.io!/i).should('exist')
    cy.wait(3000)
    cy.contains(/invalid email: jin@example.io!/i).should('not.exist')

    cy.contains(/fail!/i).should('not.exist')
    cy.xpath('/html/body/main/button').click()
    cy.contains(/fail!/i).should('exist')
    cy.wait(3000)
    cy.contains(/fail!/i).should('not.exist')
  })
});
