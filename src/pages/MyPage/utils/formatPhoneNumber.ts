export default function formatPhoneNumber(phoneNumber: string) {
  const matchedPhoneNumber = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
  return matchedPhoneNumber
    ? `${matchedPhoneNumber[1]}-${matchedPhoneNumber[2]}-${matchedPhoneNumber[3]}`
    : phoneNumber;
}
