# Restaurant sites data

This repo holds and documents data source plugins for a set of example sites.

In order to maximise the opportunity for re-use, each data source will present its data to the build in an agreed JSON structure. In this way, any SSG or framework will be able to present the content from any data source we add in future as long as it conforms to this spec.


## Table of contents

- [Content source plugins](#plugins)
- [Demo site implementations](#demos)
- [Using a plugin in your site](#usage)
- [Data API and schema](#schema)
- [Building additional content source plugins](#development)

---

## Content source plugins 
<a name="plugins"></a>

Find each of these in this repo:

- [Contentful](/plugins/contentful)
- [Sanity](/plugins/sanity) (WiP)
- Airtable (coming later)
- More sources (or should I say "sauces"?! Anyone? Hello? No?) TBD

## Demo site implementations
<a name="demos"></a>

The following example sites which use these data sources are available.  Each site is intended to be functionally identical but implemented with a variety of frameworks and data sources.


|   | Contentful | Sanity | Airtable |
|---|------------|--------|--------- |
| **Nuxt** | [repo](https://github.com/netlify/demo-restaurant-nuxt-contentful), [demo](https://demo-restaurant-contentful-nuxt.netlify.app/) | repo, demo  | repo, demo  |
| **Next** | repo, demo  | repo, demo  | repo, demo  |
| **11ty** | repo, demo  | repo, demo  | repo, demo  |
| **Astro** | repo, demo  | repo, demo  | repo, demo  |


## Using these plugins in your site
<a name="usage"></a>

These plugins are collected and packaged as an NPM package for convenience. Install and save to your site's config with:

```
npm install -s @netlify/demo-restaurant-sites-data`
```

Then specify in your site's `netlify.toml` file which data source plugin you wish to use:

```toml

[[plugins]]
  # package = "./node_modules/@netlify/demo-restaurant-sites-data/plugins/{PLUGIN_DIRECTORY}"
  package = "./node_modules/@netlify/demo-restaurant-sites-data/plugins/contentful"

  [plugins.inputs]
    # Directory for the generated JSON data files to reside in
    dataDir = "data"

```



## Data API and schema
<a name="schema"></a>

Each Build Plugin provides a data abstraction to a different content source. When the build runs, the specified plugin will request the data from the content source and save it to the build cache ready for the SSG to use, according to the structure described below.

### Menu

A set of menu items with descriptions and metadata

Resource location: `/data/menu.json`

```json
[
  {
    "title": "Teetering Taco Tower",
    "description": "A massive and frankly distressingly large tower of tacos with every filling you can imagine, and far more tacos than you need",
    "price": INTEGER,
    "currency": "$",
    "active": BOOLEAN,
    "category": [
      STRING,
      ...
    ], // for grouping by "dinner", "breakfast", "sides", "drinks" etc
    "dietary": {
      "vegan": BOOLEAN,
      "vegetarian": BOOLEAN,
      "glutenFree": BOOLEAN
    },
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

```


### Restaurant info

General information about the restaurant

Resource location: `/data/info.json`

```json
{
  "name": "The DX Deli and Grill",
  "strapline": "Too much of a good thing",
  "contact": {
    "streetAddress": [
      STRING,
      STRING,
      ...
    ],
    "coords": {
      "lat": STRING,
      "long": STRING
    },
    "email": STRING,
    "social": [
      {
        "channel": STRING,
        "displayName": STRING,
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
[
  {
    "displayName": "Hungry Horace",
    "date": TIMESTAMP,
    "title": "Testimonial title",
    "body": "Testimonial text which may contain markdown"
  },
  ...
]

```


### Gallery

A set of image assets for display in a gallery page or section

Resource location: `/data/gallery.json`

```json
[
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


## Building additional content source plugins
<a name="development"></a>

> TODO

 - Add plugin code in a new directory in `/plugins`
 - During development you can access your local dev version of the plugin in your test site by setting it's location to be file based in your `package.json`
 ```json
 "demo-restaurant-sites-data": "file:../demo-restaurant-sites-data",
 ```
 - Ensure that it's output confirms to the [schema](#schema) above
 - Update the npm package
