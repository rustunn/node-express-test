export default function (timestamp, lang = 'en-US', userOptions = {}) {
  const date = new Date(timestamp);
  const options = {
    localeMatcher: 'best fit',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...userOptions,
  };
  return date.toLocaleDateString(lang, options);
}
