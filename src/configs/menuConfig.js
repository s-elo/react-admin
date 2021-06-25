const menuList = [
  {
    title: "Home",
    key: "/home",
    icon: "HomeOutlined",
  },
  {
    title: "Product",
    key: "/products",
    icon: "AppstoreOutlined",
    children: [
      {
        title: "Category",
        key: "/category",
        icon: "ContainerOutlined",
      },
      {
        title: "Product",
        key: "/product",
        icon: "AppstoreOutlined",
      },
    ],
  },
];

export default menuList;
