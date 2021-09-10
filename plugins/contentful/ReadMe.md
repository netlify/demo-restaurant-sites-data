 # Contentful data plugin

 A Netlify build plugin to fetch content from a Contentful space and save it as JSON files in the ready for an SSG to use to generate an example restaurant site.


 ## Usage for Development and Deployment

This plugin is to be used as a local plugin and not added to the official Netlify Plugin register. Installing this package for use in your site via NPM will make all of the data fetching plugins available:

```
npm install -s @netlify/demo-restaurant-sites-data`
```

Then to use this plugin, which fetches data from Contentful, specify in your site's `netlify.toml`:

```toml

[[plugins]]
  package = "./node_modules/@netlify/demo-restaurant-sites-data/plugins/contentful"

  [plugins.inputs]
    # Directory for the generated JSON data files to reside in
    dataDir = "data"

```

If you've configured your SSG to use a specific folder to use for data, replace the value of the `dataDir` option with the name of the folder you're using. If it does not yet exist, this directory will be created automatically so the JSON file can be copied inside it.


### add the Contentful creds to your project as environment variable

You can use the Netlify CLI for this

```

# Create or link your project with Netlify
netlify create
# or
netlify link

# Add the Contentful Space ID
netlify env:set CONTENTFUL_SPACE_ID XXX

# Add the Contentful Content Delivery API access token
netlify env:set CONTENTFUL_CONTENT_API_TOKEN XXX

# Run Netlify Build to prime your build cache with the data 
# This will use your centrally managed env vars
netlify build

# You now have data to build against
netlify dev
```

