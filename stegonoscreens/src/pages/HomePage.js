import { useContext } from "react";

import AppContext from "../store/app-context";

import strings from "../static/strings";

function HomePages() {
    const appCtx = useContext(AppContext);

    return <div>{strings.pageTitles.home[appCtx.language]}</div>
};

export default HomePages;