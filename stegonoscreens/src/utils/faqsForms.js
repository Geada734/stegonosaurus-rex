export function createVoteForm(id, value, rating, setUserRating) {
  let vote = 0;

  if (value !== rating) {
    if (rating === 0) {
      vote = value;
    } else {
      vote = value * 2;
    }
    setUserRating(value);
  } else {
    setUserRating(0);
    vote = value * -1;
  }

  const formData = new FormData();

  formData.append("id", id);
  formData.append("vote", vote);

  return formData;
}
