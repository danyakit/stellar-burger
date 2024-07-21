// типизируем кастомные команды
declare namespace Cypress {
  interface Chainable {
    makeBurger122: () => void; // создаем бургер из булки ID=1 и инградиентов двух с ID=2
    closeModal: () => void; // закрываем модальное окно
    openIngredient1Modal: () => void; // открываем инградиент ID=1 в модальном окне
  }
}

const modalSelector = '[data-cy=modalUI]';

describe('проверяем доступность приложения', function() {

  // перед каждым тестом
  beforeEach( function() {
    cy.setCookie('accessToken','12345')
    cy.intercept('GET','api/ingredients', { fixture : 'ingredients.json'})
    cy.intercept('GET','api/auth/user', { fixture : 'getuser.json'})
    cy.visit(''); 
    // определяем алиасы
    cy.get('[data-cy=ingredient-1]').contains('Добавить').as('ingredient1AddBtn');
    cy.get('[data-cy=ingredient-2]').contains('Добавить').as('ingredient2AddBtn');
    cy.get('[data-cy=ingredient-1] > a').as('ingredient1URL');
    // добавляем кастомные команды Cypress
    Cypress.Commands.add('makeBurger122', () => {
      cy.get('@ingredient1AddBtn').click();
      cy.get('@ingredient2AddBtn').click();
      cy.get('@ingredient2AddBtn').click();
    });
    Cypress.Commands.add('closeModal', () => {
      cy.get('[data-cy=modal-close-button]').click();
    });
    Cypress.Commands.add('openIngredient1Modal', () => {
      cy.get('@ingredient1URL').click();
    });
  });

  afterEach( function() {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('добавление ингредиента из списка в конструктор', function() {
      cy.makeBurger122();
      // есть булка и сверху и снизу
      cy.get('[data-cy=constructor-bun-top]').contains('Булка N1').should('exist');
      cy.get('[data-cy=constructor-bun-bottom]').contains('Булка N1').should('exist');
      // что есть оба добавленных инградиента
      cy.get('[data-cy=constructor-ingredients] > li').then((lis) => {
        expect(lis, '2 items').to.have.length(2);
        expect(lis.eq(0), 'first item').to.contain('Биокотлета из марсианской Магнолии');
        expect(lis.eq(1), 'second item').to.contain('Биокотлета из марсианской Магнолии');
      });
  });

  it('работа модальных окон', function() {
    cy.get(modalSelector).should('not.exist');
    cy.openIngredient1Modal();
    cy.get(modalSelector).should('exist'); // модальное окно появилось
    cy.get('[data-cy=ingredient-name]').should('have.text','Булка N1'); // открылось то что нужно
    cy.closeModal();
    cy.get(modalSelector).should('not.exist'); // модальное окно закрылось по крестику
    cy.openIngredient1Modal(); // опять открываем модальное окно
    cy.get(modalSelector).should('exist');
    cy.get('[data-cy=modal-overlay]').click({force: true}); // принудительно кликаем, несмотря на ругань о перекрытии
    cy.get(modalSelector).should('not.exist'); // модальное окно закрылось поклику на оверлей
  });  

  it('функционал создания заказа', function() {
      cy.makeBurger122();
      cy.get('[data-cy=order-register-button]').contains('Оформить заказ').click();
      cy.intercept('POST','api/orders', { fixture : 'afterorder.json'}); // перехватываем запрос
      cy.get(modalSelector).should('exist'); // модальное окно появилось
      cy.get('[data-cy=order-number]').should('have.text', '42216'); // и содержит № заказа
      cy.closeModal();
      cy.get(modalSelector).should('not.exist'); // проверяем что модальное окно закрылось
      // проверяем, что пуст конструктор
      cy.get('[data-cy=choose-bun-top]').should('have.text', 'Выберите булки');
      cy.get('[data-cy=choose-bun-bottom]').should('have.text', 'Выберите булки');
      cy.get('[data-cy=choose-ingredients]').should('have.text', 'Выберите начинку');
    });

});

