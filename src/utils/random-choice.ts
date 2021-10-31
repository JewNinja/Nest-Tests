export function chooseRandomElementsFromList (list: Array<unknown>, amount: number) {
  const res = Array(amount).fill(void 0).map(() => {
    const randomNumber = Math.floor(Math.random() * amount);
    return list.splice(randomNumber, 1)[0];
  })
  return res;
}