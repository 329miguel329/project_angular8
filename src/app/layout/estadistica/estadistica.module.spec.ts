import { EstadisticaModule } from './estadistica.module';

describe('EstadisticaModule', () => {
    let estadisticaModule: EstadisticaModule;

    beforeEach(() => {
        estadisticaModule = new EstadisticaModule();
    });

    it('should create an instance', () => {
        expect(estadisticaModule).toBeTruthy();
    });
});
