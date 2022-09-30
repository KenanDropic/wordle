interface StatsData {
  streak: number;
  guessedInAttempt: number;
  isWon: boolean;
}
interface KeyValues {
  value: string;
  bigKey?: boolean;
  shouldDisable?: boolean;
}
interface LetterProps {
  letterPosition: number;
  attemptValue: number;
}

type updateFN = (data: StatsData) => Promise<void>;
type clickFN = () => void;
type NavClickFN = (
  event: React.MouseEvent<HTMLElement | HTMLOrSVGElement>,
  destination: string
) => void;

export type {
  StatsData,
  KeyValues,
  updateFN,
  clickFN,
  NavClickFN,
  LetterProps,
};
