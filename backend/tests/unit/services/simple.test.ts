// Test simple pour vérifier les imports
describe('Service Imports Test', () => {
  it('should be able to import AuthService with ES6 import', async () => {
    // Test d'import ES6
    const { AuthService } = await import('../../../src/services/authService');
    expect(AuthService).toBeDefined();
    expect(typeof AuthService.register).toBe('function');
  });

  it('should be able to import ProjectService with ES6 import', async () => {
    // Test d'import ES6
    const { ProjectService } = await import('../../../src/services/projectService');
    expect(ProjectService).toBeDefined();
    expect(typeof ProjectService.getProjects).toBe('function');
  });

  it('should have AuthService methods available', async () => {
    const { AuthService } = await import('../../../src/services/authService');
    expect(AuthService.register).toBeDefined();
    expect(AuthService.login).toBeDefined();
    expect(AuthService.verifyToken).toBeDefined();
  });

  it('should have ProjectService methods available', async () => {
    const { ProjectService } = await import('../../../src/services/projectService');
    expect(ProjectService.getProjects).toBeDefined();
    expect(ProjectService.getProjectById).toBeDefined();
    expect(ProjectService.createProject).toBeDefined();
  });
});
