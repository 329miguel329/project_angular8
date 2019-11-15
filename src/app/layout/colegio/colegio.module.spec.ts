import { ColegioModule } from './colegio.module';

describe('ColegioModule', () => {
  let colegioModule: ColegioModule;

  beforeEach(() => {
    colegioModule = new ColegioModule();
  });

  it('should create an instance', () => {
    expect(colegioModule).toBeTruthy();
  });
});
