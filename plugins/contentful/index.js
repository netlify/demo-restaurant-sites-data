const fs = require('fs');
const chalk = require('chalk');
const { ENETUNREACH } = require('constants');

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_API_TOKEN,
});

var dataDir;


// Construct the data object for the menu
const fetchMenu = async () => {
  const entries = await client.getEntries({
    content_type: 'menuItem',
    include: 1
  });

  let menu = [];
  for (item in entries.items) {
    let thisItem = entries.items[item];
    let photo = {};
    if(thisItem.fields.photo && thisItem.fields.photo[0].fields ) {
      photo = {
        "imageUrl": thisItem.fields.photo[0].fields.imageUrl,
        "caption": thisItem.fields.photo[0].fields.caption,
        "attribution": {
          "text": thisItem.fields.photo[0].fields.attributionText,
          "url": thisItem.fields.photo[0].fields.attributionUrl
        }
      };
    }

    menu.push({
      "title": thisItem.fields.title,
      "description": thisItem.fields.description,
      "price": thisItem.fields.price,
      "currency": thisItem.fields.currency,
      "category": thisItem.fields.category, 
      "dietary": {
        "vegan": thisItem.fields.vegan,
        "vegetarian": thisItem.fields.vegetarian,
        "glutenFree": thisItem.fields.glutenFree
      },
      "photo": photo
    });
  };
  return menu;
};


// Construct the data object for the site pages
const fetchPages = async () => {
  const entries = await client.getEntries({
    content_type: 'page'
  });

  let pages = {};
  for (item in entries.items) {
    let thisItem = entries.items[item];
    pages[thisItem.fields.title.toLowerCase()] = {
      "title": thisItem.fields.title,
      "description": thisItem.fields.description,
      "body": thisItem.fields.body
    };
  };
  return pages;
};


// Construct the data object for the testimonials
const fetchTestimonials = async () => {
  const entries = await client.getEntries({
    content_type: 'testimonial'
  });

  let testimonials = [];
  for (item in entries.items) {
    let thisItem = entries.items[item];
    testimonials.push({
      "displayName": thisItem.fields.displayName,
      "title": thisItem.fields.title,
      "date": thisItem.fields.date,
      "body": thisItem.fields.body
    });
  };
  return testimonials;
};


// Construct the data object for the gallery
const fetchGallery = async () => {
  const entries = await client.getEntries({
    content_type: 'photo'
  });

  let gallery = [];
  for (item in entries.items) {
    let thisItem = entries.items[item];
    gallery.push({
      "caption": thisItem.fields.caption,
      "imageUrl": thisItem.fields.imageUrl,
      "attribution": {
        "text": thisItem.fields.attributionText,
        "url": thisItem.fields.attributionUrl
      }
    });
  };
  return gallery;
};


// Construct the data object for the restaurant info
const fetchInfo = async () => {
  const entries = await client.getEntries({
    content_type: 'info',
    include: 1
  });
  const data = entries.items[0].fields;  
  
  let social = [];
  data.social.forEach(channel => {
    social.push(
      channel.fields
    );
  });

  return {
    "name": data.name,
    "strapline": data.strapline,
    "contact": {
      "streetAddress": data.address,
      "coords": data.location,
      "email": data.email,
      "phone": data.telephone
    },
    "hours": data.openingHours,
    "social": social

  };
};


// save the data to the specified file
const saveData = async (data, file) => {
  const path = `${dataDir}/${file}`;
  await fs.writeFileSync(path, JSON.stringify(data));
  console.log('Data fetched from', chalk.blue('Contentful'), 'and stashed', chalk.green(`=> ${path}`));
}


module.exports = {

  async onPreBuild({ inputs, utils }) {
    
    // ensure we have the specified directory for our data
    dataDir = inputs.dataDir;
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    try {
      const menu = await fetchMenu();
      await saveData(menu, 'menu.json');
      const pages = await fetchPages();
      await saveData(pages, 'pages.json');
      const testimonials = await fetchTestimonials();
      await saveData(testimonials, 'testimonials.json');
      const gallery = await fetchGallery();
      await saveData(gallery, 'gallery.json');
      const info = await fetchInfo();
      await saveData(info, 'info.json');
    }
    catch(err) {
      utils.build.failBuild(`Error fetching data: ${err}`);
    }
  }

};