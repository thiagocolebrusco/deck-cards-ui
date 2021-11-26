# Deck Cards UI

Deck Cards UI is a project that consumes <a href="http://deckofcardsapi.com/" target="_blank">Decks of Cards API</a>

## Installation Guide

Clone the project and run this commands in your terminal

```sh
git clone https://github.com/thiagocolebrusco/deck-cards-ui.git
cd deck-cards-ui
yarn
yarn serve
```

It requires Node previously installed.
By default it runs on port `8080`, so access it through http://localhost:8080.

## Routes

| Route     | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| /deck/new | First page that let's you configure a deck by adding up to 10 cards and a rotation card.               |
| /deck/:id | This page displays all the cards from a deck and let you sort them by input mode or rotation card mode |
| /\*       | Page not found                                                                                         |
