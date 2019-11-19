import { EstudianteModule } from './estudiante.module';

describe('EstudianteModule', () => {
    let estudianteModule: EstudianteModule;

    beforeEach(() => {
        estudianteModule = new EstudianteModule();
    });

    it('should create an instance', () => {
        expect(estudianteModule).toBeTruthy();
    });
});
