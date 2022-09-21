import { useContext } from "react";

import AppContext from "../store/app-context";

import strings from "../static/strings";

function HomePages() {
    const appCtx = useContext(AppContext);

    return <section>
            <h1>{strings.pageTitles.home[appCtx.language]}</h1>
        </section>
};

export default HomePages;