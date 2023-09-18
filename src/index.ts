import ClassWatcher from "./ClassWatcher"

const player = document.querySelector('#dv-web-player')
if (player === null) {
    throw 'Null reference: player'
}

const watcher = new ClassWatcher(player, 'dv-player-fullscreen', () => {
    const es = document.querySelectorAll('div:has(img[style*="display"])')
    const fes = Array.from(es).filter(e => getComputedStyle(e).position === 'absolute')
    const te = fes[fes.length - 1] as HTMLElement

    if (te) {
        te.hidden = true
    }
    else {
        throw 'Null reference: te'
    }

    watcher.stop()
}, () => {
})
