import * as render from "./gitlab-script";

const domains = window.localStorage["qoollab_domains_arr"];
if (domains && JSON.parse(domains).indexOf(document.domain) >= 0) {
    render.startRendering();
}
