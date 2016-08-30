import org.w3c.dom.Document
import org.w3c.dom.Element
import org.w3c.dom.HTMLElement
import org.w3c.dom.Window

@native fun Window.requestAnimationFrame(callback: () -> Unit): Unit = noImpl
@native val Document.body: HTMLElement get() = noImpl
@native var Element.className: String get() = noImpl; set(v) = noImpl

@native interface KeyboardEvent
{
    @native val keyCode: Int
}

@native interface MouseEvent
{
    @native val clientX: Number
    @native val clientY: Number

    @native val screenX: Number
    @native val screenY: Number

    @native val which: Int
}

@native var Window.onkeydown: (KeyboardEvent) -> Unit
    get() = noImpl
    set(value) = noImpl

@native var Window.onkeyup: (KeyboardEvent) -> Unit
    get() = noImpl
    set(value) = noImpl

@native var Window.onkeypress: (KeyboardEvent) -> Unit
    get() = noImpl
    set(value) = noImpl

@native fun alert(message: Any): Unit = noImpl

object KeyCodes
{
    val Space = 32
    val Shift = 16
    val Backspace = 8
    val Enter = 13
    val Escape = 27

    val Left = 37
    val Up = 38
    val Right = 39
    val Down = 40

    val W = 87
    val A = 65
    val S = 83
    val D = 68
    val P = 80
    val R = 82
    val U = 85
}

val ClosedRange<Double>.length: Double
    get() = this.endInclusive - this.start

class Event
{
    private var handlers: List<() -> Unit> = listOf()
    fun raise()
    {
        for (handler in handlers)
        {
            handler()
        }
    }

    operator fun plusAssign(handler: () -> Unit)
    {
        handlers += handler
    }
}