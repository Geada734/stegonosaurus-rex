// Container for the application's pages.
import classes from "./style/Layout.module.css";

import Navigation from "./Navigation";

function Layout(props) {
  // Contains a nave bar at the top.
  return (
    <section>
      <Navigation />
      <main className={classes.appContent}>{props.children}</main>
    </section>
  );
}

export default Layout;
