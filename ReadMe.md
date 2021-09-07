# Restaurant sites data

This repo discusses and collects data sources for a set of example sites.

In order to maximise the opportunity for re-use, each data source will present its data to the build in an agreed JSON structure. In this way, any SSG or framework will be able to present the content from any data source we add in future as long as it conforms to this spec.

## Content source build plugins

- Contentful (coming soon)
- Sanity (coming later)
- Trello (coming later)
- More sources (or should I say "sauces"?! Anyone? Hello? No?) TBD

## Site implementations

The following example sites which use these data sources are available.  Each site is intended to be functionally identical but implemented with a variety of frameworks and data sources.

- Nuxt and Contentful: repo, demo (coming soon)
- Nuxt and Trello repo, demo (coming soon)
- Many more (coming later)

## Data API and schema

Each data abstraction to a content source will be provided by a Netlify Build Plugin. When the build runs, the plugin will request the data from the content source and save it to the build cache ready for the SSG to use, according to the structure described below.

### Menu

A set of menu items with descriptions and metadata

Resource location: `/data/menu.json`

```json
{
  "items": [
    {
      "title": "Teetering Taco Tower",
      "description": "A massive and frankly distressingly large tower of tacos with every filling you can imagine, and far more tacos than you need",
      "price": INTEGER,
      "currency": "$",
      "active": BOOLEAN,
      "category": STRING, // for grouping by "dinner", "breakfast", "sides", "drinks" etc
      "vegan": BOOLEAN,
      "vegetarian": BOOLEAN,
      "glutenFree": BOOLEAN,
      "photo:": {
        "imageUrl": STRING,
        "attribution": {
          "text": STRING,
          "url": STRING
        }
      }
    },
    ...
  ]
}
```


### Restaurant info

General information about the restaurant

Resource location: `/data/info.json`

```json
{
  "name": "The DX Deli and Grill",
  "strapline": "Too much of a good thing",
  "contact": {
    "streetAddress": STRING,
    "coords": {
      "lat": STRING,
      "long": STRING
    },
    "email": STRING,
    "social": [
      {
        "name": STRING, // For display
        "url": STRING
      },
      ...
    ],
    "phone": STRING
  },
  "hours": {
    "Monday": {
      "open": TIME,
      "close": TIME,
    },
    "Tuesday": {
      "open": TIME,
      "close": TIME,
    },
    ...
  }
   
}
```


### Testimonials

Testimonial content collected from happy patrons.

Resource location: `/data/testimonials.json`

```json
{
  "items": [
    {
      "displayName": "Hungry Horace",
      "date": TIMESTAMP,
      "title": "Testimonial title",
      "body": "Testimonial text which may contain markdown"
    },
    ...
  ]
}
```


### Gallery

A set of image assets for display in a gallery page or section

Resource location: `/data/gallery.json`

```json
{
  "items": [
    {
      "caption": "A tasty thing that you can eat here",
      "imageUrl": STRING,
      "attribution": {
        "text": STRING,
        "url": STRING
      }
    },
    ...
  ]
}
```


### Page content

The pages data provides simple descriptive copy for display on any of the given pages.

Resource location: `/data/pages.json`

```json
{
  "home": {
    "title": STRING,
    "description": STRING,
    "body": STRING, // markdown supported
    "heroImage": {
      "imageUrl": STRING,
      "attribution": {
        "text": STRING,
        "url": STRING
      }
    }
  },
  "menu": {
    ...
  },
  ...
}
```

## Mocked resources

For development purposes, this repo is also deployed as a site in order to provide reference data sources as described above.

- `/data/menu.json` (coming soon)
- `/data/info.json` (coming soon)
- `/data/testimonials.json` (coming soon)
- `/data/gallery.json` (coming soon)
- `/data/pages.json` (coming soon)
