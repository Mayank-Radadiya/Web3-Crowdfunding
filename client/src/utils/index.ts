export const daysLeft = (deadline: number) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return days;
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (
  url: string,
  callback: (arg0: boolean) => void
): void => {
  const img = new Image();
  img.src = url;
  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};


