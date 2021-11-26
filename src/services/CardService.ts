import axios, { AxiosInstance } from "axios";
import { ICard } from "@/constants/interfaces";

class DeckApiService {
  private http: AxiosInstance;

  constructor() {
    const baseURL = process.env.VUE_APP_API_URL;
    this.http = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  public async addDeck(cards: ICard[]) {
    const cardsString: string = this.getCardsString(cards);
    return this.http.get("/deck/new/", { params: { cards: cardsString } });
  }

  public async addCardsToPile(deckId: string, cards: ICard[], pileName = "hand") {
    const cardsString: string = this.getCardsString(cards);
    return this.http.get(`/deck/${deckId}/pile/${pileName}/add/`, {
      params: { cards: cardsString },
    });
  }

  public async drawCardsFromDeck(deckId: string, cardsCount: number) {
    return this.http.get(`/deck/${deckId}/draw?count=${cardsCount}`);
  }

  public async getCardsFromPile(deckId: string, pileName: string) {
    return this.http.get(`/deck/${deckId}/pile/${pileName}/list/`);
  }

  // eslint-disable-next-line class-methods-use-this
  private getCardsString(cards: ICard[]): string {
    return cards.map((card: ICard) => card.key).join(",");
  }
}

export default new DeckApiService();
