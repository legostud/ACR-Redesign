export const formatPhoneNumber = (text: string): string => {
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return '';
};

export const formatAddress = (
  address1: string,
  address2: string,
  city: string,
  state: string,
  zipcode: string,
  isLink?: boolean
) => {
  if (!address1 && !city && !state && !zipcode) return '';
  if (isLink) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(`${address1} ${address2} ${city}, ${state} ${zipcode}`)}`;
  }
  return `${address1} ${address2 ? '\n' : ''} ${address2} \n ${city}, ${state} ${zipcode}`;
};
