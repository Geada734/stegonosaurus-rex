// Fixtures to be used in the unit tests for the Navigation component.
import strings from "../../../static/strings";

// Mock application context.
const mockContext = {
 language: "en",
 changeLanguage: jest.fn(),
};

// App logo alt text.
const logoAltText = "Logo";

// Navigation links to the different pages in the application.
const navLinks = strings.navItems.map((navItem) => {
 return navItem.name.en;
});

module.exports = {
 mockContext: mockContext,
 logoAltText: logoAltText,
 navLinks: navLinks,
};
