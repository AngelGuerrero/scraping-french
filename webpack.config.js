export default {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel?presets[]=es2015&presets[]=react"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url?limit=8192&name=img/[name].[ext]"
      }
    ]
  }
};
