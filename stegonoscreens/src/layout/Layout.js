// Container for the application's pages.
import Navigation from "./Navigation";

import classes from "./style/Layout.module.css";

function Layout(props) {
  // Contains a nav bar at the top.
  return (
    <section>
      <Navigation />
      <main className={classes.appContent}>{props.children}</main>
    </section>
  );
}

export default Layout;
