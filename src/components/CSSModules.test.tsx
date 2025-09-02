describe('Component CSS Modules', () => {
  test('MatterhornPopup CSS module is accessible', () => {
    const styles = require('./MatterhornPopup.module.css');
    
    expect(styles).toBeDefined();
    expect(styles.matterhornPopup).toBeDefined();
    expect(styles.video).toBeDefined();
  });

  test('PortalPopup CSS module is accessible', () => {
    const styles = require('./PortalPopup.module.css');
    
    expect(styles).toBeDefined();
    expect(styles.portalPopupOverlay).toBeDefined();
  });

  test('Homepage CSS module is accessible', () => {
    const styles = require('./Homepage.module.css');
    
    expect(styles).toBeDefined();
    expect(styles.homepage).toBeDefined();
  });

  test('HotelsPage CSS module is accessible', () => {
    const styles = require('./HotelsPage.module.css');
    
    expect(styles).toBeDefined();
    expect(styles.hotelsPage).toBeDefined();
  });

  test('ResultsPage CSS module is accessible', () => {
    const styles = require('./ResultsPage.module.css');
    
    expect(styles).toBeDefined();
    expect(styles.resultsPage).toBeDefined();
  });
});