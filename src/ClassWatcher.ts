export default class ClassWatcher {
    private target: Element
    private classToWatch: string
    private onAdded: () => void
    private onRemoved: () => void

    private observer: MutationObserver
    private lastHasClass: boolean

    public constructor(target: Element, classToWatch: string, onAdded: () => void, onRemoved: () => void, start = true) {
        this.target = target
        this.classToWatch = classToWatch
        this.onAdded = onAdded
        this.onRemoved = onRemoved

        this.observer = new MutationObserver(this.onMutated)
        this.lastHasClass = this.hasClass()

        if (start) {
            this.start()
        }
    }

    public start() {
        this.observer.observe(this.target, { attributes: true })
    }

    public stop() {
        this.observer.disconnect()
    }

    private hasClass() {
        return this.target.classList.contains(this.classToWatch)
    }

    private onMutated = (mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const currentHasClass = this.hasClass()
                if (this.lastHasClass !== currentHasClass) {
                    this.lastHasClass = currentHasClass
                    if (currentHasClass) {
                        this.onAdded()
                    }
                    else {
                        this.onRemoved()
                    }
                }

                break
            }
        }
    }
}
