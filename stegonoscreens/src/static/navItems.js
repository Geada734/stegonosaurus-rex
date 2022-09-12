import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";

const navItems = [
    {
        "name": "Home",
        "path": "/",
        "element": <HomePage />,
        "key": "home" 
    },
    {
        "name": "About",
        "path": "/about",
        "element": <AboutPage />,
        "key": "about" 
    },
    {
        "name": "FAQ",
        "path": "/faq",
        "element": <FAQPage />,
        "key": "faq" 
    }

];

export default navItems;