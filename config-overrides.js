const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // using less(the default file of the antd)
    style: true,
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A", // you use Ant Design to change theme color.
    },
  })
);
