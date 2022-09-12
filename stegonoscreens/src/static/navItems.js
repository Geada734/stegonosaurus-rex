import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";

const navItems = [
    {
        "name": {
            "en": "Home"
        },
        "path": "/",
        "element": <HomePage />,
        "key": "home" 
    },
    {
        "name": {
            "en": "About"
        },
        "path": "/about",
        "element": <AboutPage />,
        "key": "about" 
    },
    {
        "name": {
            "en": "FAQ"
        },
        "path": "/faq",
        "element": <FAQPage />,
        "key": "faq" 
    }

];

export default navItems;