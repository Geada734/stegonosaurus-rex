import classes from "./style/Layout.module.css";

import Navigation from "./Navigation";

function Layout(props) {
  return (
    <section>
      <Navigation />
      <main className={classes.appContent}>{props.children}</main>
    </section>
  );
}

export default Layout;
