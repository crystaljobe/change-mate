
export default function SetBodyColor({color}) {
    document.documentElement.style.setProperty('--bodyColor', color)
}