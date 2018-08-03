import { BooksModule } from './books.module';

describe('BooksModule', () => {
  let booksModule: BooksModule;

  beforeEach(() => {
    booksModule = new BooksModule();
  });

  it('should create an instance', () => {
    expect(booksModule).toBeTruthy();
  });
});
