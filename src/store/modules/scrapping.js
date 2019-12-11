import cheerio from "cheerio";

const state = {
  //
  // Endpoints
  endpoints: {
    wordreference: "https://www.wordreference.com/fres/"
  },
  //
  // Web Scrapping
  htmlResponse: "",
  results: []
};

const actions = {
  async scrapp(context, html) {
    if (html === null)
      return {
        error: {
          message: "Html parameter was null"
        }
      };

    const $ = await cheerio.load(html);

    //
    // Scrapping table definitions
    const table = $("table.WRD")[0];
    const information = $(table)
      .find("tbody tr td.FrWrd")
      .find("em.tooltip span")
      .text()
      .split(":");

    //
    // Sentences
    // To French
    const sentences = $(table).find("tr.even");
    const sentence_french = $(sentences)
      .find("td.FrEx")
      .text()
      .split(".")[0];
    // To Español
    const sentence_spanol = $(sentences)
      .find("td.ToEx")
      .text()
      .split(".")[0];
    //
    // Categories
    const category = information[0];
    const category_def = information[1];

    return {
      category,
      category_def,
      sentences: [sentence_french, sentence_spanol]
    };

    //
    // Creates category if not exist
    // this.createCategoryIfNotExist(category);
  }
};

export default {
  state,
  actions
};
