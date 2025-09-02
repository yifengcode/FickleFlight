import React from 'react';
import { render } from '@testing-library/react';

// Import component types to test they are properly defined
import { HomepageType } from '../components/Homepage';
import { HotelsPageType } from '../components/HotelsPage';  
import { ResultsPageType } from '../components/ResultsPage';
import { MatterhornPopupType } from '../components/MatterhornPopup';

describe('Component Types', () => {
  it('should have proper TypeScript type definitions', () => {
    // Test that types are properly exported and have required structure
    const homepageProps: HomepageType = { className: 'test' };
    const hotelsPageProps: HotelsPageType = { className: 'test' };
    const resultsPageProps: ResultsPageType = { className: 'test', search: 'test' };
    const matterhornPopupProps: MatterhornPopupType = { className: 'test', onClose: jest.fn() };

    expect(homepageProps.className).toBe('test');
    expect(hotelsPageProps.className).toBe('test');
    expect(resultsPageProps.className).toBe('test');
    expect(resultsPageProps.search).toBe('test');
    expect(matterhornPopupProps.className).toBe('test');
    expect(typeof matterhornPopupProps.onClose).toBe('function');
  });

  it('should accept optional className prop', () => {
    const propsWithoutClassName: HomepageType = {};
    const propsWithClassName: HomepageType = { className: 'custom-class' };

    expect(propsWithoutClassName.className).toBeUndefined();
    expect(propsWithClassName.className).toBe('custom-class');
  });

  it('should have proper optional props for MatterhornPopup', () => {
    const minimalProps: MatterhornPopupType = {};
    const fullProps: MatterhornPopupType = { 
      className: 'popup-class', 
      onClose: () => console.log('closed') 
    };

    expect(minimalProps.className).toBeUndefined();
    expect(minimalProps.onClose).toBeUndefined();
    expect(fullProps.className).toBe('popup-class');
    expect(typeof fullProps.onClose).toBe('function');
  });
});