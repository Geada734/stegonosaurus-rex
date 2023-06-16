// Form creators for the REST API called on the FAQs page.

// Creates form for the voting action on a FAQ.
export function createVoteForm(id, value, rating, setUserRating) {
  /*
   * id: FAQ id.
   * value: vote value.
   * rating: current rating.
   * setUserRating: callback to set the rating on the frontEnd.
   */
  let vote = 0;

  // If the user clicked to vote.
  if (value !== rating) {
    if (rating === 0) {
      vote = value;
    } else {
      vote = value * 2;
    }
    setUserRating(value);
  }
  // If the user clicked to undo a vote.
  else {
    setUserRating(0);
    vote = value * -1;
  }

  const formData = new FormData();

  formData.append("id", id);
  formData.append("vote", vote);

  return formData;
}
