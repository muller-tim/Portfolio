async function loadPage(path) {
    const content = document.getElementById("content");
    const page = path === "/Portfolio" || path === "/" ? "/pages/home.html" : path;
    
    try {
        const response = await fetch(`/Portfolio${page}`);
        if(!response.ok) throw new Error(`${page} not found`);

        const html = await response.text();
        content.innerHTML = html;

        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            console.log(el)
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo(0,0);
            }
        }
        
    } catch (err) {
        content.innerHTML = `<p>Error while loading content: ${err.text} </p>`
    }
}

function navigate(event) {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");

    if (href.startsWith("#")) return;
    if (!link.hasAttribute("data-link")) return;
    if (href.startsWith("http")) return;

    event.preventDefault();

    window.history.pushState({}, "", href);
    loadPage(href);
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", navigate);

    loadPage(window.location.pathname);

    window.addEventListener("popstate", () => {
        loadPage(window.location.pathname);
    });
});

