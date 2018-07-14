export default function (defaultSize) {
  if (!window) return defaultSize || false;

  const width = window.innerWidth;
  if (width < 768) return 'xs';
  else if (width >= 768 && width < 992) return 'sm';
  else if (width >= 992 && width < 1200) return 'md';
  else if (width >= 1200 && width < 1920) return 'lg';
  return 'xl';
}
