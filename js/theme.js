const scheme = localStorage.getItem("scheme"),
    theme_toggler = document.getElementById("theme-toggler");

let isDark = scheme;


function toggleTheme() {
    (isDark = !isDark) ? setColorScheme('dark'): setColorScheme('light');
}

function enableDarkTheme() {
    document.body.classList.add("dark-view"), theme_toggler.innerHTML = "<i class='fa-light fa-moon'></i>";
}

function disableDarkTheme() {
    document.body.classList.remove("dark-view"), theme_toggler.innerHTML = "<i class='fa-light fa-sun'></i>";
}

function setColorScheme(scheme) {
    switch (scheme) {
        case 'dark':
            console.log('dark');
            localStorage.setItem("scheme", scheme);
            var element = document.getElementById('uniswap');
            if (element !== null) {
                element.src = "https://app.uniswap.org/#/swap?inputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&outputCurrency=0x469a1e910faa202470238ea9d614ae16c3e8b0ee&theme=dark";
            }
            enableDarkTheme();
            break;
        case 'light':
            console.log('light');
            localStorage.setItem("scheme", scheme);
            var element = document.getElementById('uniswap');
            if (element !== null) {
                element.src = "https://app.uniswap.org/#/swap?inputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&outputCurrency=0x469a1e910faa202470238ea9d614ae16c3e8b0ee&theme=light";
            }
            disableDarkTheme();
            break;
        default:
            localStorage.setItem("scheme", getPreferredColorScheme());
            break;
    }
}

function getPreferredColorScheme() {
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    }
    return 'light';
}

function updateColorScheme() {
    setColorScheme(getPreferredColorScheme());
}
if (window.matchMedia) {
    var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', updateColorScheme);
}
if (scheme === null) {
    updateColorScheme()
} else {
    setColorScheme(scheme);
}