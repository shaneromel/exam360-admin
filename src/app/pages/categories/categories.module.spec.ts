import { CategoriesModule } from './categories.module';

describe('CategoriesModule', () => {
  let categoriesModule: CategoriesModule;

  beforeEach(() => {
    categoriesModule = new CategoriesModule();
  });

  it('should create an instance', () => {
    expect(categoriesModule).toBeTruthy();
  });
});
