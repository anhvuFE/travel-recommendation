# TravelWander — Travel Recommendation Website

A simple travel recommendation site built with HTML, CSS and vanilla JavaScript.
Type a keyword (**beach**, **temple** or **country**) in the navigation search
bar and the site recommends destinations with images.

## Pages

- **Home** (`index.html`) — intro + search
- **About Us** (`about.html`) — company info and team guidance
- **Contact Us** (`contact.html`) — contact details and an email form

## Features

- Navigation bar with 6 elements: Home, About Us, Contact Us, a search input,
  a **Search** button and a **Clear** button.
- Keyword search (case-insensitive, handles singular/plural) backed by
  `travel_recommendation_api.json`.
- Recommends at least two beaches, temples and countries, each with an image.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push this folder to a public GitHub repository.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`, then **Save**.
3. The site goes live at `https://<username>.github.io/<repo>/`.
