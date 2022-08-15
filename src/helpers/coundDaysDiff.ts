const countDaysDiff = (date: Date) => {
  const dayMs = 24 * 60 * 60 * 1000;
  const creationDate = new Date(date).getTime();
  const today = new Date().getTime();
  const diff = Math.round(Math.abs((creationDate - today) / dayMs ));
  return diff;
}

export default countDaysDiff;