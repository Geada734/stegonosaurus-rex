import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import FAQPage from "../pages/FAQPage";

const strings = { 
    "navItems": [
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
    ],

    "about": {
        "header": {
            "en": "About Stegonosaurus"
        },
        "text":{
            "en": <section>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing 
                    elit mi mus, torquent sagittis condimentum in sociosqu 
                    id luctus. Nam pellentesque mi vehicula id magna vulputate nisl 
                    tempus ad, dui nisi molestie parturient tortor turpis vel blandit, 
                    inceptos natoque interdum at congue nibh rhoncus litora. 
                    Elementum maecenas rhoncus id nunc curae molestie gravida, 
                    sagittis eu ridiculus congue dis hac, posuere aliquet leo nisl 
                    himenaeos dui.
                </p> 
                <p>
                    Convallis condimentum eu tincidunt 
                    penatibus mollis, litora est pellentesque scelerisque, 
                    vestibulum ridiculus lectus non. Erat aenean ornare eu accumsan 
                    montes ridiculus dapibus sapien euismod, vitae laoreet litora netus 
                    torquent parturient magnis. Cubilia eleifend nunc sagittis 
                    dapibus ullamcorper ultrices quis, augue aptent torquent lacinia 
                    commodo sed sollicitudin hendrerit, et nostra sodales condimentum 
                    curabitur dictum. Bibendum mi sagittis accumsan himenaeos quisque 
                    curabitur, nec in porttitor ligula nostra dapibus, maecenas quis 
                    at tempor congue.
                </p>
            </section>
        }
    },
    "faqs": [
        {
            "question": {
                "en": "why dis?"
            },
            "answer": {
                "en": "cuz dis."
            }
        },
        {
            "question": {
                "en": "how dis?"
            },
            "answer": {
                "en": "like dis."
            }
        },
        {
            "question": {
                "en": "lorem ipsum?"
            },
            "answer": {
                "en": "litora est pellentesque scelerisque, " +
                "vestibulum ridiculus lectus non. Erat aenean " + 
                "ornare eu accumsan montes ridiculus dapibus " + 
                "sapien euismod, vitae laoreet litora netus "  +
                "torquent parturient magnis"
            }
        }
    ]
};

export default strings;