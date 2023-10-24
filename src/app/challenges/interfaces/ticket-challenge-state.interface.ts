export interface ITicketChallengeState {
  id: string;
  challenge: Challenge;
  done: boolean;
  claimedByUser: ClaimedBy;
}

export interface Challenge {
  title: string;
}

interface ClaimedBy {
  name: string;
  id: string;
  lastname: string;
}
