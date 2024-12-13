describe('ToDo List Application', () => {

  beforeEach(() => {

    cy.visit('http://3.149.236.164:3000'); 
  });

  // Crear tareas
  it('Crear una tarea', () => {
    cy.get('input[placeholder="¿Qué hay que hacer?"]').type('Realizar plan de pruebas{enter}');
  });

  it('Crear una tarea con caracteres especiales', () => {
    cy.get('input[placeholder="¿Qué hay que hacer?"]').type('"Tareita! # 1 😊"{enter}');
  });

  it('Crear una tarea con una descripción larga', () => {
    cy.get('input[placeholder="¿Qué hay que hacer?"]').type('prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba{enter}');
  });

  it('Crear varias tareas rapidamente', () => {
    for (let i = 1; i <= 20; i++) {
      cy.get('input[placeholder="¿Qué hay que hacer?"]').type(`Tarea ${i}{enter}`);
    }
  });

  // Editar tarea
  it('Editar una tarea', () => {

    cy.get('input[placeholder="¿Qué hay que hacer?"]').type('Tarea para editar{enter}');
    
    cy.get('label').contains('Tarea para editar').dblclick();
    
    cy.get('.edit').first().clear().type('Tarea editada{enter}');

    cy.get('.edit').first().should('have.value', 'Tarea editada');
  });

  // Marcar tarea como completada
    it('Marcar una tarea como completada', () => {

      cy.get('input[placeholder="¿Qué hay que hacer?"]').type('Tarea para completar{enter}');
      
      cy.get('input.toggle').first().check();
  
      cy.get('li').first().should('have.class', 'completed');
  
      cy.get('input.toggle').first().should('be.checked');
    });

    it('Crear varias tareas y marcar todo como completado', () => {
      for (let i = 1; i <= 5; i++) {
        cy.get('input[placeholder="¿Qué hay que hacer?"]').type(`Tarea ${i}{enter}`);
      }
  
      cy.get('input.toggle-all') 
        .should('be.visible')
        .click({ force: true });
    });
    
    it('Marcar una como completada y limpiar las tareas completadas', () => {
      for (let i = 1; i <= 4; i++) {
        cy.get('input[placeholder="¿Qué hay que hacer?"]').type(`Tarea ${i}{enter}`);
      }
  
      cy.get('li').first() 
        .find('input.toggle')
        .check();
  

      cy.get('button.clear-completed') 
        .should('be.visible')
        .click();
    });
  
  //Modo Oscuro
    it('Activar el modo oscuro', () => {

      cy.get('#dark-mode-toggle')
        .should('be.visible')     
        .click(); 
    });

});
