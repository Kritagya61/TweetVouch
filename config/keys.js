const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "Twy1vHuAqFEedvOT603Lb6zoe",
  TWITTER_CONSUMER_SECRET: "w1JSQxso97e9BJJwgsy6uv7583R9ikAmmJpHUCye8PhIVIDL2r",
  TWITTER_ACCESS_TOKEN: "1043950506412916736-j078a3yYX11T4dykwBYxfgemtysmRP",
  TWITTER_TOKEN_SECRET: "qifhgNN7q1anAtKUMQXrGsxTllfXCj1Z7WxhwqS2Wanpg",
};

const MONGODB = {
  MONGODB_URI:
    "mongodb+srv://Kritagya:9459@cluster0.ptpsy.mongodb.net/<dbname>?retryWrites=true&w=majority",
};

const SESSION = {
  COOKIE_KEY: "thisappisawesome",
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;
