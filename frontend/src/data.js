import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";
import {publicRequest} from "./requestMethods"

export const sliderItems = [
  {
    id: 1,
    img: "https://i.ibb.co/TYHc9dv/FLATS-3D.png",
    title: "LEKKI PHASE1",
    desc: "OWN ONE OF THE MANY PROPERTIES IN OUR LEKKI ESTATE",
    bg: "#f5fafd",
  },
  {
    id: 2,
    img: "https://i.ibb.co/0nQJv76/Whats-App-Image-2023-09-04-at-06-30-01.jpg",
    title: "LAGOS ISLAND",
    desc: "OWN ONE OF THE MANY PROPERTIES IN OUR IKOYI ESTATE",
    bg: "#fcf1ed",
  },
  {
    id: 3,
    img: "https://i.ibb.co/z68mXzk/Whats-App-Image-2023-09-04-at-06-30-03.jpg",
    title: "ABUJA GWAGWALADA",
    desc: "OWN ONE OF THE MANY PROPERTIES IN OUR ABUJA ESTATE",
    bg: "#fbf0f4",
  },
];

export const categories = [
  {
    id: 1,
    img: "https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fstatic-christiesrealestate-cms-production.gtsstatic.net%2Fresources%2Fv_4_19_0_380%2Fsiteresources%2Fmy%20folder%2Fresponsive%2Flifestyles%2Fbeach%2Fcarousel%2Fvilla%20baan%20sang.jpg&option=N&permitphotoenlargement=false&w=1200&fallbackimageurl=https%3A%2F%2Fstatic-christiesrealestate-cms-production.gtsstatic.net%2Fresources%2Fv_4_19_0_380%2Flayouts%2Fcommon%2Fimages%2Fno-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "BEACH FRONT",
    cat: "beach",
  },
  {
    id: 2,
    img: "https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F236i215%2Fpzdcph02xhscm9ee1d9wa5e7t4i215&option=N&h=472&permitphotoenlargement=false?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "ISLAND PROPERTIES",
    cat: "island",
  },
  {
    id: 3,
    img: "https://dq1niho2427i9.cloudfront.net/efd9259e-53f3-4398-a671-0327d1374d03/1845203668.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    title: "VILLAGE PROPERTIES",
    cat: "village",
  },
];

export const popularProducts = [
  {
    id: 1,
    img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  },
  {
    id: 2,
    img: "https://everpress.imgix.net/img/campaign/original/61a48fbbda8e82.44331969.png?w=700&h=700&auto=format&bg=fffde7&fit=fill",
  },
  {
    id: 3,
    img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
  },
  {
    id: 4,
    img: "https://www.burdastyle.com/media/catalog/product/cache/5dce411aab5e9e93103a1808ddd11c54/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
  },
  {
    id: 5,
    img: "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
  },
  {
    id: 6,
    img: "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
  },
  {
    id: 7,
    img: "https://benscore.com/media/catalog/product/2/2/2217_arrow_jacket_forest.png",
  },
  {
    id: 8,
    img: "https://woollen-wear.in/cdn-cgi/imagedelivery/ZMUrshz-omHo_iJ4haWPew/women-jackets/below-zero-degree/em25982/em25982-black-f-220x280.JPG/public",
  },
];

export const features = [
  {
    Icon: LockOutlinedIcon,
    details:
      "Surveillance cameras (cctv), designated security, gated estate with admin building",
  },
  {
    Icon: FenceOutlinedIcon,
    details:
      "Dedicated play area and gym lekki conservation center located 15-mins drive from site",
  },
  {
    Icon: LightbulbOutlinedIcon,
    details:
      "Constant water supply 24/7 constant electricity water treatment, drainage",
  },
  {
    Icon: WaterOutlinedIcon,
    details:
      "Property is bounded by the lagoon, buyers can primarily access the water body via boat",
  },
];

export const prices = [
  10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000,
];
export const numbers = [1, 2, 3, 4, 5, 6, 7, 9, 10];



export const getLocations = async () => {
  try {
    const res = await publicRequest.get("/products/get-locations");
     return res.data
  } catch (error) {
    throw error; 
  }
};

export const getPropertyType = async () => {
  try {
    const res = await publicRequest.get("/products/get-property-type");
     return res.data
  } catch (error) {
    throw error; 
  }
};
