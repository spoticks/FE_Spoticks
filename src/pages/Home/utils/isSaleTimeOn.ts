export default function isSaleTimeOn(timeOnSale: string, timeOffSale: string) {
  const now = new Date();
  const onSaleDate = new Date(timeOnSale);
  const offSaleDate = new Date(timeOffSale);
  return onSaleDate <= now && now <= offSaleDate;
}
