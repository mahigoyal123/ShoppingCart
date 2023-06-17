export const priceInRange = (rangeArray, price) => {
  let val = false;
  rangeArray.map(item => {
    if(price >= item[0] && price <= item[1])
    {
        val = true;
        return;
    }
  })
  return val;
}