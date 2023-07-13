// Fixtures used in the faqsForms unit tests.

// Resulting forms for voting use cases.
// The user votes a thumbs up or undos a thumbs down.
const thumbsUpUnratedForm = { id: "1", vote: "1" };
// The user votes a thumbs down or undos a thumbs up.
const thumbsDownUnratedForm = { id: "1", vote: "-1" };
// The user votes a thumbs up from a thumbs down.
const thumbsUpDownratedForm = { id: "1", vote: "2" };
// The user votes a thumbs down from a thumbs up.
const thumbsDownUpratedForm = { id: "1", vote: "-2" };

// Mock function to pass as a callback to the form creation function.
const mockUserRatingSetter = {
 setUserRating: jest.fn(),
};

module.exports = {
 thumbsUpUnratedForm: thumbsUpUnratedForm,
 thumbsDownUnratedForm: thumbsDownUnratedForm,
 thumbsUpDownratedForm: thumbsUpDownratedForm,
 thumbsDownUpratedForm: thumbsDownUpratedForm,
 mockUserRatingSetter: mockUserRatingSetter,
};
