export function measurePerformance(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    performance.mark(`${componentName}-start`);
    
    return () => {
      performance.mark(`${componentName}-end`);
      performance.measure(
        `${componentName} render time`,
        `${componentName}-start`,
        `${componentName}-end`
      );
    };
  }
  return () => {};
}